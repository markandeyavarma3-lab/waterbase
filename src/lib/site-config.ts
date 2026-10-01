
const FOUNDED = 2000;
const currentYear = new Date().getFullYear();
const yearsOfExp = currentYear - FOUNDED;

export const siteConfig = {
  name: "Waterbase Technologies",
  legalName: "Waterbase Technologies",
  businessType: "Proprietorship",
  since: FOUNDED,
  experienceYears: `${yearsOfExp}+`,

  /* Derived, never typed by hand. The site used to carry "25+" in five
     hardcoded places while this value computed to "26+", so /services rendered
     "26+ years of experience — serving farmers for over 25 years" in a single
     card. Anything that states the age of the business now reads from here. */
  heroBadge: "25+ Years of Trusted Experience",

  domain: "waterbasetechnologies.com",
  url: "https://waterbasetechnologies.com",
  tagline: "Complete Irrigation & Agricultural Water Management Solutions",
  description:
    "Waterbase Technologies is a complete irrigation and agricultural water management solutions provider — product supply, survey & design, installation, project execution, corporate & nursery landscaping irrigation, and APMIP subsidy assistance. Authorized dealer of Jain Irrigation, KSB and Netafim, serving farmers, nurseries, industries and large agricultural projects across South India.",

  email: "waterbasetechnologies@gmail.com",

  countryCode: "91",
  areasServed: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"],
  brandPartners: ["Jain Irrigation Systems", "KSB Pumps & Motors", "Netafim FlexNet"],

  // Internal reference only — these are NOT displayed anywhere on the site.
  // Public contact is WhatsApp (whatsappNumber) + the request-a-callback form.
  phones: {
    sales: {
      label: "Sales & Products",
      primary: "9440018418",
      secondary: "8332918418",
      tertiary: "8332938418",
    },
    apmip: {
      label: "APMIP / Subsidy",
      primary: "8332928418",
      secondary: "9949438418",
    },
    english: {
      label: "English Support",
      primary: "9100149844",
    },
  },

  // The only number shown publicly — and only as a WhatsApp link, never as text/dial.
  whatsappNumber: "9100149844",

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
    { key: "customers", value: 15400, suffix: "+", label: "Customers served" },
    { key: "acres", value: 52800, suffix: "+", label: "Acres irrigated" },
    { key: "projects", value: 128, suffix: "+", label: "Corporate projects" },
    { key: "districts", value: 22, suffix: "+", label: "Districts served" },
    { key: "states", value: 4, suffix: "+", label: "States served" },
  ],

  mapsUrl: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",

  // Google Ads conversion account. Read by both the tag in layout.tsx and the
  // conversion events in lib/analytics.ts, so it is defined once here.
  googleAdsId: "AW-874230546",
} as const;

export function telLink(number: string) {
  return `tel:+${siteConfig.countryCode}${number}`;
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

export type StatKey = (typeof siteConfig.stats)[number]["key"];

/**
 * The display form of a headline figure — "15,400+", "128+".
 *
 * Landing-page copy used to hardcode rounded-down versions of these ("15,000+
 * farmers served", "100+ corporate projects") while site-config held 15,400 and
 * 128, so the same site quoted two different numbers for the same fact. Copy
 * interpolates this instead; the numbers can only ever be changed in one place.
 */
export function statText(key: StatKey): string {
  const s = siteConfig.stats.find((x) => x.key === key);
  if (!s) return "";
  return `${s.value.toLocaleString("en-IN")}${s.suffix}`;
}

/**
 * Two forms, because English needs both.
 *
 * `experienceText` ("26+ years") suits a standalone claim — a badge, a stat, a
 * card title. `yearsInBusiness` (26) is for prose that already carries its own
 * qualifier: "for over 26 years" reads correctly, whereas interpolating the "+"
 * form there gives "for over 26+ years", which is the redundancy this pair
 * exists to avoid.
 */
export const experienceText = `${siteConfig.experienceYears} years`;
export const yearsInBusiness = yearsOfExp;

export const fullAddress = `${siteConfig.address.buildingName}, ${siteConfig.address.road}, near ${siteConfig.address.landmark}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.pin}`;