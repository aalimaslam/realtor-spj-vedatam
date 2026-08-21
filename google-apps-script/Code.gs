/**
 * Kashmiri Realtor x Vedatam — Lead capture Web App
 *
 * SETUP
 * 1. Create (or open) the Google Sheet where leads should land.
 * 2. Extensions > Apps Script. Delete the boilerplate and paste this file's contents in.
 * 3. (Optional but recommended) Set SHARED_SECRET below to a random string.
 * 4. Deploy > New deployment > type "Web app":
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the resulting Web App URL (ends in /exec).
 * 6. Paste that URL into js/config.js -> integrations.sheetsWebhookUrl
 *    and, if you set one, the same SHARED_SECRET into integrations.sheetsSecret.
 *
 * A "Leads" sheet/tab is created automatically on first submission if it
 * doesn't already exist, with a header row.
 */
const SHEET_NAME = 'Leads';
const SHARED_SECRET = ''; // leave blank to disable the check

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return jsonOutput({ ok: false, error: 'Unauthorized' });
    }

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.interest || '',
      data.budget || '',
      data.formId || '',
      data.pageUrl || '',
      (data.utm && data.utm.utm_source) || '',
      (data.utm && data.utm.utm_campaign) || '',
      (data.utm && data.utm.utm_medium) || ''
    ]);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Interest', 'Budget', 'Form', 'Page URL', 'UTM Source', 'UTM Campaign', 'UTM Medium']);
  }
  return sheet;
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
