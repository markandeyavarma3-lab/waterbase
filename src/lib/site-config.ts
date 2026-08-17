
const currentYear = new Date().getFullYear();
const yearsOfExp = currentYear - 2000;

export const siteConfig = {
  name: "Waterbase Technologies",
  legalName: "Waterbase Technologies",
  businessType: "Proprietorship",
  since: 2000,
  experienceYears: `${yearsOfExp}+`,

  // 👇 Edit this one line anytime to change the hero badge text.
  heroBadge: "Since 2000 · Authorised Jain, KSB & Netafim",

  domain: "waterbasetechnologies.com",
  url: "https://waterbasetechnologies.com",
  tagline: "Engineered irrigation for commercial sites and large farms",
  description:
    "Waterbase Technologies designs, supplies and installs complete irrigation systems for commercial landscapes, estates and large farms across South India. Authorised dealer of Jain Irrigation, KSB and Netafim — survey, design, project execution and APMIP subsidy assistance from one accountable team in Eluru.",

  email: "waterbasetechnologies@gmail.com",

  countryCode: "91",
  areasServed: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"],
  brandPartners: ["Jain Irrigation Systems", "KSB Pumps & Motors", "Netafim FlexNet"],

  // Public: primary + WhatsApp. Secondary is shown on contact as an alternate line.
  phones: {
    sales: {
      label: "Sales & Products",
      primary: "7793938418",
      secondary: "9440018418",
      tertiary: "8332938418",
    },
    apmip: {
      label: "APMIP / Subsidy",
      primary: "8332928418",
      secondary: "9949438418",
    },
    english: {
      label: "English Support",
      primary: "7793938418",
    },
  },

  // Public WhatsApp — also used as the primary contact number for Call Now.
  whatsappNumber: "7793938418",

  address: {
    buildingNo: "1-1159",
    buildingName: "Kandrikagudem-Kadiyala Mansion",
    road: "Eluru Medisettivaripalem Road",
    landmark: "Beside State Bank of India",
    locality: "Kandrikagudem",
    city: "Eluru",
    district: "Eluru",
    state: "Andhra Pradesh",
    pin: "534005",
    country: "India",
  },

  // Per-day hours feed the structured data (SEO). Display uses hoursSummary.
  hours: [
    { day: "Monday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "7:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],

  hoursSummary: {
    days: "Monday – Saturday",
    time: "10:00 AM – 7:00 PM",
    closedDay: "Sunday",
  },

  /* Confirmed by the business. Single source for every stat band on the site —
     the homepage, all six ad landing pages and the about page all read from
     here, so changing a figure here changes it everywhere. */
  stats: [
    { value: 15400, suffix: "+", label: "Customers served" },
    { value: 52800, suffix: "+", label: "Acres irrigated" },
    { value: 128, suffix: "+", label: "Corporate projects" },
    { value: 22, suffix: "+", label: "Districts served" },
    { value: 4, suffix: "+", label: "States served" },
  ],

  mapsUrl: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",

  // Google Business listings. Paste the shop Maps short-link into `url` when you
  // have it — until then both cards open the office listing so reviews still work.
  googleListings: [
    {
      id: "office",
      name: "Eluru office",
      blurb: "Design studio, project desk and authorised brand counter.",
      url: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",
    },
    {
      id: "shop",
      name: "Farm shop",
      blurb: "Walk-in counter for pipes, fittings, pumps and field supplies.",
      url: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",
    },
  ],

  // Google Ads conversion account. Read by both the tag in layout.tsx and the
  // conversion events in lib/analytics.ts, so it is defined once here.
  googleAdsId: "AW-874230546",
} as const;

export function telLink(number: string) {
  return `tel:+${siteConfig.countryCode}${number}`;
}

/** Display as +91 77939 38418 */
export function formatPhone(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length === 10) return `+${siteConfig.countryCode} ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return `+${siteConfig.countryCode} ${digits}`;
}

export function whatsappLink(
  message?: string,
  number: string = siteConfig.whatsappNumber
) {
  const text = encodeURIComponent(
    message ??
      "Hello Waterbase Technologies, I am interested in your irrigation solutions.\n\nMy requirement is: \n\nPlease contact me."
  );
  return `https://wa.me/${siteConfig.countryCode}${number}?text=${text}`;
}

export const fullAddress = `${siteConfig.address.buildingName}, ${siteConfig.address.road}, near ${siteConfig.address.landmark}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.pin}`;