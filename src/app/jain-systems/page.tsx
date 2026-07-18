import { Droplets, Gauge, Wind, CloudRain, Layers, Filter, Award, MapPin, LifeBuoy, BadgePercent } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Jain Drip Irrigation in Eluru | Waterbase Technologies",
  description: "Authorized Jain Irrigation dealer in Eluru — survey, design, supply and installation of drip and sprinkler systems for farms and nurseries.",
  path: "/jain-systems",
});

const TRUST_POINTS = [
  "Authorized Jain dealer — genuine products & warranty",
  "Free site survey before any commitment",
  "APMIP subsidy eligible — up to 90% off system cost",
  "15,000+ farmers served across AP & Telangana",
];

const PRODUCTS = [
  { icon: Droplets, name: "Drip Laterals & Emitters", desc: "Precision drip delivers water directly to roots — cuts water usage by 50–70% versus flood irrigation." },
  { icon: Gauge, name: "Pressure-Compensating (PC) Drip", desc: "Consistent flow regardless of slope or pressure variation. Ideal for uneven terrain and long field rows." },
  { icon: Wind, name: "Micro-Sprinklers", desc: "Fine, even coverage for orchards, groundnut, nurseries and under-canopy watering. Low-pressure operation." },
  { icon: CloudRain, name: "Rain Guns & Field Sprinklers", desc: "Large-area coverage for paddy, sugarcane and open fields. Multiple nozzle sizes available." },
  { icon: Layers, name: "HDPE Mainline & Sub-main Pipes", desc: "Jain-quality HDPE mains, sub-mains and fittings rated for long-term field use in all soil types." },
  { icon: Filter, name: "Disc, Sand & Screen Filters", desc: "Prevent emitter clogging and protect your entire system. Filter type recommended based on your water source." },
];

const WHY = [
  { icon: Award, title: "Authorized Jain Dealer", desc: "Official distributor in Eluru — every product is genuine Jain Irrigation with full manufacturer warranty. No duplicates." },
  { icon: MapPin, title: "Free Site Survey", desc: "We visit your field, check your water source and design the right system before you commit to anything." },
  { icon: LifeBuoy, title: "Full Project Execution", desc: "Survey → design → supply → installation → testing. One local team, no middlemen, no subcontractors." },
  { icon: BadgePercent, title: "APMIP Subsidy Help", desc: "Your Jain drip system may qualify for up to 90% government subsidy. We handle the paperwork end to end." },
];

export default function JainSystemsPage() {
  return (
    <div className="theme-warm">
      <LandingPageTemplate
      badge="Jain Authorized Distributor · Eluru, AP"
      title="Jain Drip & Sprinkler Systems — Survey, Supply & Installation"
      description="We're the authorized Jain Irrigation dealer in Eluru. One team handles your site visit, system design, product supply and complete installation — for paddy, banana, sugarcane, nurseries and corporate farms."
      trustPoints={TRUST_POINTS}
      products={PRODUCTS}
      whyReasons={WHY}
      formTitle="Get a Free Site Survey"
      formDesc="We'll visit your field and design the right Jain system — no commitment needed."
      formRequirement="product_supply"
      productsEyebrow="What we supply"
      productsTitle="Complete Jain Irrigation Systems"
      productsLead="Every component sourced directly from Jain Irrigation — genuine quality for paddy, sugarcane, banana, horticulture and corporate projects."
      whyEyebrow="Why choose us"
      whyTitle="One local partner for the complete project"
      whyLead="From the first site visit to the day water flows through your field — we handle everything."
      ctaSubtitle="Ready to install?"
      ctaTitle="Get your Jain drip system up and running"
      ctaDesc="Call us now or send a WhatsApp — we'll schedule your free site survey within 24 hours."
    />
    </div>
  );
}
