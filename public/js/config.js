/**
 * Kashmiri Realtor x Vedatam - Global Configuration
 * All contact details, WhatsApp routing, and project credentials are centralized here.
 */
const VEDATAM_CONFIG = {
  broker: {
    name: "KASHMIRI REALTOR",
    tagline: "WHERE HERITAGE MEETS MODERN LUXURY",
    phoneDisplay: "+91 97970 81234",
    phoneCall: "+919797081234",
    // Configurable WhatsApp recipient (Country code without '+' or special characters)
    whatsappNumber: "919797081234",
    email: "advisory@kashmirirealtor.com",
    address: "Gurugram, Haryana, India",
    establishedYear: "2010"
  },
  project: {
    name: "VEDATAM",
    developer: "SPJ Group",
    architect: "ACPL Architects",
    tagline: "Old Gurgaon Ka Naya Mall",
    location: "Sector 14, Gurugram, Haryana",
    hareraNumber: "RC/REP/HARERA/GGM/927/659/2025/30",
    hareraDate: "25.03.2025",
    catchment: "32,00,000+ (3.2 Million)",
    parkingCapacity: "1,100+ Cars",
    parkingLevels: "3 Dedicated Basement Levels",
    basementHeight: "14 Feet Clear Height"
  },
  modal: {
    delayMs: 5000,
    sessionKey: "kr_vedatam_modal_dismissed",
    leadSubmittedKey: "kr_vedatam_lead_captured"
  }
};

window.VEDATAM_CONFIG = VEDATAM_CONFIG;
