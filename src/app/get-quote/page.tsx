import { Droplets, Gauge, Layers, Store, Building2, BadgePercent, Award, MapPin, LifeBuoy, Truck } from "lucide-react";
import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";
import { statText } from "@/lib/site-config";
import { AD_LANDING_PATH } from "@/lib/nav";

/**
 * The ONE Google Ads landing page.
 *
 * The account used to run six campaigns, each pointed at its own page
 * (/jain-systems, /ksb-pumps, /heavy-pipes, /farm-shop, /commercial-irrigation,
 * /apmip-subsidy). It now runs a single ad covering everything, and this is
 * where that ad lands: one page that names every product line, with Call /
 * WhatsApp / the callback form above the fold, and a card per line that links
 * on to the detailed page.
 *
 * Those six pages are kept — they are written, they rank, and the footer links
 * them — but they are SEO pages now, not ad destinations. In Google Ads they
 * make good sitelinks on this ad.
 *
 * noindex: this page deliberately repeats content the six pages cover in depth.
 * Letting Google index it as well would split ranking between near-duplicates.
 * Google Ads does not need a landing page to be indexable. `follow` is kept so
 * the links on it still count.
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: "Irrigation, Pumps & Pipes in Eluru — Get a Quote",
    description:
      "Jain drip & sprinkler systems, KSB pumps, HDPE/PVC pipes, farm supplies, commercial irrigation and APMIP subsidy help — one team in Eluru. Call, WhatsApp or request a callback.",
    path: AD_LANDING_PATH,
  }),
  robots: { index: false, follow: true },
};

const TRUST_POINTS = [
  "Authorised Jain Irrigation, KSB and Netafim dealer — genuine stock, full warranty",
  "Free site survey before any commitment",
  "APMIP subsidy eligible — up to 90% off micro-irrigation systems",
  `${statText("customers")} customers served across AP & Telangana`,
];

// One card per product line, each linking to the page that covers it in depth.
const LINES = [
  {
    icon: Droplets,
    name: "Jain Drip & Sprinkler Systems",
    desc: "Survey, design, supply and installation of drip, micro-sprinkler and rain-gun systems for every crop and acreage.",
    href: "/jain-systems",
  },
  {
    icon: Gauge,
    name: "KSB Pumps & Motors",
    desc: "Submersible, monoblock, openwell and solar pumps — sized to your borewell depth and yield, installed and serviced.",
    href: "/ksb-pumps",
  },
  {
    icon: Layers,
    name: "HDPE, PVC & Casing Pipes",
    desc: "ISI-marked pipes and fittings in every size and pressure class — retail walk-in or contractor bulk pricing.",
    href: "/heavy-pipes",
  },
  {
    icon: Store,
    name: "Farm Shop & Accessories",
    desc: "Mulching film, drip tape, sprinkler heads, valves, fertigation units and spares — in stock at our Eluru store.",
    href: "/farm-shop",
  },
  {
    icon: Building2,
    name: "Commercial & Landscape Irrigation",
    desc: "Turnkey systems for corporate campuses, nurseries, factories and resorts — design to handover.",
    href: "/commercial-irrigation",
  },
  {
    icon: BadgePercent,
    name: "APMIP Subsidy Assistance",
    desc: "Eligible farmers pay as little as 10%. We file the application, handle inspection and install the approved system.",
    href: "/apmip-subsidy",
  },
];

const WHY = [
  { icon: Award, title: "Authorised & Genuine", desc: "Official dealer for Jain Irrigation, KSB and Netafim. Manufacturer warranty on every product — no duplicates." },
  { icon: MapPin, title: "Free Site Survey", desc: "We visit your land, check your water source and recommend the right system before you commit to anything." },
  { icon: LifeBuoy, title: "One Team, End to End", desc: "Survey → design → supply → installation → after-sales. No middlemen, no subcontractors." },
  { icon: Truck, title: "Local Stock, Fast Supply", desc: "Pipes, pumps and accessories ready at our Eluru store — same-day dispatch on most orders." },
];

export default function GetQuotePage() {
  return (
    <div className="theme-warm">
      <LandingPageTemplate
        badge="Authorised Jain · KSB · Netafim Dealer · Eluru, AP"
        title="Irrigation, Pumps & Pipes — One Team, Survey to Installation"
        description="Drip and sprinkler systems, KSB pumps, HDPE and PVC pipes, farm supplies and APMIP subsidy help — for farms, nurseries and commercial sites across Andhra Pradesh and Telangana."
        trustPoints={TRUST_POINTS}
        products={LINES}
        whyReasons={WHY}
        formTitle="Get a Free Quote"
        formDesc="Tell us what you need — we'll call you back with the right product and price."
        productsEyebrow="Everything we do"
        productsTitle="Every product line, one supplier"
        productsLead="Tap any line for the full range, brands and pricing details."
        whyEyebrow="Why Waterbase"
        whyTitle="One local partner for the whole job"
        whyLead="From the first site visit to after-sales support — handled by the same team."
        ctaSubtitle="Ready to start?"
        ctaTitle="Call now or send a WhatsApp — we reply fast"
        ctaDesc="Free site survey and quote. Open Monday to Saturday, 10 AM – 7 PM, Kandrikagudem, Eluru."
      />
    </div>
  );
}
