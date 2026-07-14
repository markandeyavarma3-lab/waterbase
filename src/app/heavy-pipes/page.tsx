import type { LucideIcon } from "lucide-react";
import { Layers, Package, Package2, Wrench, Link2, Settings2, Award, BadgePercent, Truck } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "HDPE & PVC Pipes Bulk Supply in Eluru | Waterbase Technologies",
  description: "Authorized pipe dealer in Eluru. HDPE mainline, PVC column pipes, borewell casing, GI pipes and fittings — retail and bulk pricing for farms, borewells and industries across AP.",
  path: "/heavy-pipes",
});

const TRUST_POINTS = [
  "ISI-marked genuine pipes — no duplicates or reprocessed material",
  "All sizes, pressure ratings and lengths in stock",
  "Bulk pricing for contractors and large orders",
  "Supply across AP, Telangana and nearby states",
];

const PRODUCTS = [
  { icon: Layers, name: "HDPE Pipes & Coils", desc: "Agriculture-grade and mainline HDPE in all diameters. UV-stabilized, pressure-rated, suitable for drip and field mains." },
  { icon: Package, name: "PVC Column Pipes", desc: "For borewell suction, delivery and domestic water lines. Available in multiple pressure classes and lengths." },
  { icon: Package2, name: "Borewell Casing Pipes", desc: "Slotted and plain casing in all wall thicknesses for shallow and deep borewells across all soil types." },
  { icon: Wrench, name: "GI & MS Pipes", desc: "For pump delivery lines, overhead tank systems and industrial water distribution. All sizes available." },
  { icon: Link2, name: "Pipe Fittings & Joints", desc: "Elbows, tees, reducers, couplings and bushings in PVC, HDPE and GI — all thread types and diameters." },
  { icon: Settings2, name: "Drip & Sprinkler Accessories", desc: "End caps, stakes, connectors, punch tools, inline valves and repair sleeves for drip and sprinkler systems." },
];

const WHY = [
  { icon: Award, title: "Authorized & Genuine", desc: "ISI-marked, verified-quality pipes from recognized manufacturers. No reprocessed or duplicate material." },
  { icon: Package, title: "All Sizes in Stock", desc: "Wide range of diameters, pressure ratings and lengths available for immediate pickup or dispatch." },
  { icon: BadgePercent, title: "Bulk & Retail", desc: "Contractor pricing for large orders; single-piece available for farm repairs and small requirements." },
  { icon: Truck, title: "Local & Fast", desc: "Based in Eluru — quick supply with local delivery for urgent farm, borewell and construction needs." },
];

export default function HeavyPipesPage() {
  return (
    <LandingPageTemplate
      badge="Authorized Pipe Dealer · Eluru, AP"
      title="HDPE, PVC & Casing Pipes — Bulk Supply in Eluru"
      description="We supply HDPE mainline, PVC column pipes, borewell casing, GI pipes and all fittings for farms, borewells, industries and construction — retail walk-in and contractor bulk pricing."
      trustPoints={TRUST_POINTS}
      products={PRODUCTS}
      whyReasons={WHY}
      formTitle="Get a Quote"
      formDesc="Tell us what you need and we'll give you the best price — retail or bulk."
      productsEyebrow="What we supply"
      productsTitle="Pipes & Fittings for Every Application"
      productsLead="From farm mainlines to borewell casings — all types, all sizes, genuine brands, ready to dispatch from Eluru."
      whyEyebrow="Why choose us"
      whyTitle="Your reliable pipe supplier in Eluru"
      whyLead="Genuine materials, competitive pricing and fast local availability — for farms, contractors and industries."
      ctaSubtitle="Ready to order?"
      ctaTitle="Call us for pricing and availability"
      ctaDesc="Walk in to our Eluru store or call now — bulk orders can be arranged for same-day dispatch."
    />
  );
}
