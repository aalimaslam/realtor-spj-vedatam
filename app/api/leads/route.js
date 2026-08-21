import { google } from "googleapis";

// Writes each submitted lead as a new row in the configured Google Sheet.
// Credentials come from server-only env vars (see .env.example) — the
// browser only ever talks to this same-origin route, never to Google
// directly, so the service account key is never exposed client-side.

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Google service account credentials are not configured");
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function POST(request) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || "Sheet1";

  if (!spreadsheetId) {
    console.error("GOOGLE_SHEET_ID is not set");
    return Response.json({ ok: false, error: "Not configured" }, { status: 500 });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (data.name || "").toString().trim();
  const phone = (data.phone || "").toString().trim();

  if (!name || !phone) {
    return Response.json({ ok: false, error: "Missing name or phone" }, { status: 400 });
  }

  try {
    const sheets = getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tab}!A:K`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            name,
            phone,
            data.email || "",
            data.interest || "",
            data.budget || "",
            data.formId || "",
            data.pageUrl || "",
            data.utm?.utm_source || "",
            data.utm?.utm_campaign || "",
            data.utm?.utm_medium || "",
          ],
        ],
      },
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Failed to append lead to Google Sheet:", err);
    return Response.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
