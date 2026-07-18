import { Layers, Droplets, Wind, Settings2, Wrench, FlaskConical, Package, Award, BadgePercent, Clock } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Farm Supplies & Irrigation Accessories in Eluru | Waterbase Technologies",
  description: "Farm shop in Eluru — mulching film, drip tape, sprinkler heads, fittings and irrigation accessories. Retail & wholesale. Open Mon–Sat.",
  path: "/farm-shop",
});

const TRUST_POINTS = [
  "Wide range of farm and irrigation accessories in stock",
  "Genuine brands — no duplicate or low-quality material",
  "Retail walk-in and wholesale bulk pricing",
  "Open Mon – Sat, 10:00 AM – 7:00 PM",
];

const PRODUCTS = [
  { icon: Layers, name: "Mulching Film & Sheets", desc: "Black, silver-black and transparent mulch in all widths. Retains soil moisture, controls weeds and improves yield." },
  { icon: Droplets, name: "Drip Tape / Paper Drip", desc: "Single-season drip tape for vegetables, chillies, tomatoes and row crops. Low-cost, high-efficiency watering." },
  { icon: Wind, name: "Sprinkler Heads & Risers", desc: "Micro-sprinklers, pop-up heads and rain gun nozzles. Replacement parts for all common brands available." },
  { icon: Settings2, name: "Drip Connectors & Accessories", desc: "Takeoffs, stakes, end caps, punch tools, joiners and repair sleeves — everything to maintain your drip system." },
  { icon: Wrench, name: "PVC Fittings & Valves", desc: "Elbows, tees, ball valves, foot valves and gate valves in all sizes. For pumps, pipes and irrigation networks." },
  { icon: FlaskConical, name: "Fertigation & Venturi Units", desc: "Inline venturi injectors and fertilizer tanks for water-soluble fertilizer application through your drip system." },
];

const WHY = [
  { icon: Package, title: "Everything Under One Roof", desc: "Drip accessories, pipes, fittings, mulch, sprinklers and more — find everything your farm needs in one stop." },
  { icon: Award, title: "Genuine Brands Only", desc: "We stock only verified, ISI-marked and brand-certified products. No duplicates, no compromise on quality." },
  { icon: BadgePercent, title: "Retail & Wholesale", desc: "Single pieces for repairs or bulk lots for the season — pricing available for all order sizes." },
  { icon: Clock, title: "Open 6 Days a Week", desc: "Visit us Monday to Saturday, 10 AM to 7 PM. Our team is ready to help you pick the right product." },
];

export default function FarmShopPage() {
  return (
    <div className="theme-warm">
      <LandingPageTemplate
      badge="Farm Supplies · Eluru, AP"
      title="Farm Accessories & Irrigation Supplies — Eluru"
      description="From mulching sheets and drip tape to PVC fittings, sprinkler heads and fertilizer applicators — everything your farm needs, available in our Eluru store. Retail and wholesale."
      trustPoints={TRUST_POINTS}
      products={PRODUCTS}
      whyReasons={WHY}
      formTitle="Ask About Stock & Pricing"
      formDesc="Tell us what you need and we'll confirm availability and best price before your visit."
      formRequirement="product_supply"
      productsEyebrow="What's in our store"
      productsTitle="Irrigation Accessories for Every Farm Need"
      productsLead="Stocked year-round for paddy, banana, vegetable, sugarcane and horticulture farmers across West Godavari."
      whyEyebrow="Why choose us"
      whyTitle="Eluru's trusted farm supply store"
      whyLead="Genuine products, honest pricing and a knowledgeable team — ready to help you pick exactly what your farm needs."
      ctaSubtitle="Visit or call us"
      ctaTitle="Need farm supplies? We're open today"
      ctaDesc="Call ahead to confirm stock or just walk in — Monday to Saturday, 10 AM to 7 PM, Kandrikagudem, Eluru."
    />
    </div>
  );
}
