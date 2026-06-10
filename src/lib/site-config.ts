export const siteConfig = {
  name: "Waterbase Technologies",
  legalName: "Waterbase Technologies",
  businessType: "Proprietorship",
  established: 2014,
  since: 2011,
  experienceYears: "15+",
  domain: "waterbasetechnologies.com",
  url: "https://waterbasetechnologies.com",
  tagline: "Complete Irrigation & Agricultural Water Management Solutions",
  description:
    "Waterbase Technologies is a complete irrigation and agricultural water management solutions provider — product supply, survey & design, installation, project execution, corporate & nursery landscaping irrigation, and APMIP subsidy assistance. Authorized dealer of Jain Irrigation, KSB and Netafim, serving farmers, nurseries, industries and large agricultural projects across South India.",

  email: "waterbasetechnologies@gmail.com",

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

  /* Confirmed real figures — single source for every stat band */
  stats: [
    { value: 15000, suffix: "+", label: "Customers served" },
    { value: 50000, suffix: "+", label: "Acres irrigated" },
    { value: 100, suffix: "+", label: "Corporate projects" },
    { value: 20, suffix: "+", label: "Districts served" },
    { value: 4, suffix: "+", label: "States served" },
  ],

  mapsUrl: "https://maps.app.goo.gl/JSFE9Qx9Dq5z1skG9",
} as const;

export function telLink(number: string) {
  return `tel:+91${number}`;
}

export function whatsappLink(
  message?: string,
  number: string = siteConfig.whatsappNumber
) {
  const text = encodeURIComponent(
    message ??
      "Hello Waterbase Technologies, I am interested in your irrigation solutions.\n\nMy requirement is: \n\nPlease contact me."
  );
  return `https://wa.me/91${number}?text=${text}`;
}

export const fullAddress = `${siteConfig.address.buildingName}, ${siteConfig.address.road}, near ${siteConfig.address.landmark}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.pin}`;