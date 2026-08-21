import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "VEDATAM Sector 14 Gurugram | Presented by Kashmiri Realtor",
  description: "Vedatam at Sector 14 Gurugram — 'Old Gurgaon Ka Naya Mall'. Premier commercial destination featuring Kanaka Retail, Raasa Dining, Tarang PVR Multiplex & 3-Level Parking. Presented by Kashmiri Realtor.",
  keywords: "Vedatam Gurugram, Vedatam Sector 14, Old Gurgaon Ka Naya Mall, Kashmiri Realtor, Kashmiri Realtor Gurugram, SPJ Vedatam, Commercial Property Sector 14, PVR Mall Gurgaon",
  authors: [{ name: "Kashmiri Realtor" }],
  openGraph: {
    type: "website",
    title: "VEDATAM | Sector 14 Gurugram — Presented by Kashmiri Realtor",
    description: "Discover Old Gurgaon's newest commercial landmark. Luxury retail, fine dining terraces, and PVR multiplex in Sector 14. HARERA Reg: RC/REP/HARERA/GGM/927/659/2025/30.",
    images: ["/images/vedatam/hero/vedatam_twilight_hero.webp"],
  },
};

const TAILWIND_CONFIG = "{\r\n      theme: {\r\n        extend: {\r\n          colors: {\r\n            brandNavy: '#130F25',\r\n            brandNavyDark: '#0B0817',\r\n            brandNavySurface: '#1C1733',\r\n            brandGold: '#EBC75D',\r\n            brandGoldDark: '#BF8210',\r\n            brandIvory: '#EEEEEE',\r\n            brandMuted: '#9E99B3',\r\n          },\r\n          fontFamily: {\r\n            brand: ['Montserrat', 'sans-serif'],\r\n            editorial: ['Cormorant Garamond', 'serif'],\r\n          },\r\n          letterSpacing: {\r\n            'brand-heading': '0.155em',\r\n            'brand-tag': '0.457em',\r\n          }\r\n        }\r\n      }\r\n    }";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind CSS via CDN — kept identical to the original static site so the
            design stays byte-for-byte the same (all utility classes below were
            authored against this exact runtime config). */}
        <script src="https://cdn.tailwindcss.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = ${TAILWIND_CONFIG};`,
          }}
        />
      </head>
      <body className="bg-[#130F25] text-[#EEEEEE] font-brand antialiased selection:bg-[#EBC75D] selection:text-[#130F25] overflow-x-clip">
        {children}

        {/* Core Application Scripts — unchanged from the static site, only the
            loading strategy differs (afterInteractive instead of a classic
            end-of-body <script> tag). */}
        <Script src="/js/config.js" strategy="afterInteractive" />
        <Script src="/js/modal.js" strategy="afterInteractive" />
        <Script src="/js/forms.js" strategy="afterInteractive" />
        <Script src="/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
