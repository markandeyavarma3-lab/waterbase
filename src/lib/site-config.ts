
const FOUNDED = 2000;
const currentYear = new Date().getFullYear();
const yearsOfExp = currentYear - FOUNDED;

export const siteConfig = {
  name: "Waterbase Technologies",
  legalName: "Waterbase Technologies",
  businessType: "Proprietorship",
  since: FOUNDED,
  experienceYears: `${yearsOfExp}+`,

  /* Hand-written marketing line, edited by the owner — deliberately NOT derived.
     "25+" is a floor, not a count: the business dates from `since` (2000), so the
     claim stays true every year. The one rule, pinned by site-config.test.ts:
     it must never claim MORE years than `since` supports. */
  heroBadge: "25+ Years of Trusted Experience",

  /* MUST match the host Vercel actually serves. Vercel's primary domain is
     www — the bare apex 308-redirects to it. This used to say the apex, so every
     page's canonical, all 18 sitemap URLs, robots.txt's sitemap line and the
     JSON-LD url pointed at a redirect: Google was told "the real page is over
     there", went there, and was redirected back. With no stable URL to index,
     a search for the business name found Justdial and Bizcommunity and not the
     site. If the primary domain is ever switched to the apex in Vercel, change
     this in the same deploy. Pinned by site-config.test.ts. */
  domain: "www.waterbasetechnologies.com",
  url: "https://www.waterbasetechnologies.com",
  tagline: "Engineered irrigation for commercial sites and large farms",
  description:
    "Waterbase Technologies designs, supplies and installs complete irrigation systems for commercial landscapes, estates and large farms across South India. Authorised dealer of Jain Irrigation, KSB and Netafim — survey, design, project execution and APMIP subsidy assistance from one accountable team in Eluru.",

  email: "waterbasetechnologies@gmail.com",

  countryCode: "91",
  areasServed: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"],
  brandPartners: ["Jain Irrigation Systems", "KSB Pumps & Motors", "Netafim FlexNet"],

  // Public lines — Call Now uses callNowNumber; WhatsApp uses whatsappNumber.
  callNowNumber: "9440018418",
  whatsappNumber: "7793938418",

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

  // WhatsApp only — do not use for tel: Call Now links.
  // (whatsappNumber is defined above next to callNowNumber.)

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

  // Google reviews / Business Profile share link
  googleReviewsUrl: "https://share.google/gZn0nWF44xQMTwbdT",

  // Google Business listings (same campus — Maps URL is fine for all three).
  googleListings: [
    {
      id: "office",
      name: "Office",
      blurb: "Project desk, design and authorised brand counter — Eluru.",
      url: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",
    },
    {
      id: "shop",
      name: "Shop / Sales",
      blurb: "Walk-in counter for pipes, fittings, pumps and field supplies.",
      url: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",
    },
    {
      id: "godown",
      name: "Godown",
      blurb: "Warehouse stock for project supply and bulk dispatch.",
      url: "https://maps.app.goo.gl/U1Cnqi5dvsMfKQmY9",
    },
  ],

  // Google Ads conversion account. Read by both the tag in layout.tsx and the
  // conversion events in lib/analytics.ts, so it is defined once here.
  googleAdsId: "AW-874230546",

  // Google Tag Manager container — script + noscript in app/layout.tsx
  gtmId: "GTM-NSS2B9BN",
} as const;

export function telLink(number: string) {
  return `tel:+${siteConfig.countryCode}${number}`;
}

/** Call Now buttons — 9440018418 */
export function callNowTelLink() {
  return telLink(siteConfig.callNowNumber);
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