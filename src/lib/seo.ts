import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// "9:00 AM" -> "09:00", "8:30 PM" -> "20:30" (schema.org wants 24h HH:MM)
function to24h(t: string): string {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return t;
  let h = parseInt(m[1], 10);
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

export function localBusinessJsonLd() {
  const { phones, address } = siteConfig;

  const openingHoursSpecification = siteConfig.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: to24h(h.open as string),
      closes: to24h(h.close as string),
    }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: `+91${phones.sales.primary}`,
    foundingDate: String(siteConfig.established),
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.buildingName}, ${address.road}, near ${address.landmark}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.pin,
      addressCountry: "IN",
    },
    areaServed: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"],
    openingHoursSpecification,
    hasMap: siteConfig.mapsUrl,
    knowsAbout: [
      "Drip Irrigation",
      "Sprinkler Irrigation",
      "Micro Irrigation",
      "APMIP Subsidy",
      "Agricultural Water Management",
      "Jain Irrigation",
      "KSB Pumps",
      "Netafim",
    ],
  };
}

// Per-page metadata: title + description + canonical + Open Graph, in one place.
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
    },
  };
}