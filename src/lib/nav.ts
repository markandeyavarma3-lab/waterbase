// `tone` gives each nav link its own fixed pill colour — a simple even
// rotation through the site's four section hues (blue/green/soil/sun),
// same colours used site-wide, so the nav bar itself never reads as one flat
// row of text.
export const NAV_LINKS = [
  { label: "Home", href: "/", tone: "blue" },
  { label: "Products", href: "/products", tone: "green" },
  { label: "Services", href: "/services", tone: "soil" },
  { label: "Crops", href: "/crops", tone: "sun" },
  { label: "About", href: "/about", tone: "blue" },
  { label: "Contact", href: "/contact", tone: "green" },
] as const;

export const SOLUTION_LINKS = [
  { label: "APMIP Subsidy", href: "/apmip-subsidy" },
  { label: "Jain Irrigation", href: "/jain-systems" },
  { label: "KSB Pumps", href: "/ksb-pumps" },
  { label: "HDPE Pipes", href: "/heavy-pipes" },
  { label: "Farm Shop", href: "/farm-shop" },
  { label: "Commercial Irrigation", href: "/commercial-irrigation" },
];
