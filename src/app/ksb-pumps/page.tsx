import type { LucideIcon } from "lucide-react";
import { Gauge, Waves, ArrowUpFromLine, Zap, Sun, SlidersHorizontal, Award, MapPin, LifeBuoy, BadgePercent } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "KSB Pumps & Motors Dealer in Eluru | Waterbase Technologies",
  description: "Authorized KSB Pumps & Motors dealer in Eluru. Submersible, monoblock, openwell and solar pumps with genuine warranty, correct sizing and expert installation across West Godavari, AP.",
  path: "/ksb-pumps",
});

const TRUST_POINTS = [
  "Authorized KSB dealer — genuine pumps & motors with warranty",
  "Free pump sizing based on your borewell depth & flow needs",
  "APMIP subsidy eligible on qualifying micro-irrigation projects",
  "15,000+ farmers served across AP & Telangana",
];

const PRODUCTS = [
  { icon: ArrowUpFromLine, name: "Submersible Pumps", desc: "Borewell submersible pumps for farm, domestic and industrial water lift — matched to your depth and yield." },
  { icon: Gauge, name: "Monoblock Pumps", desc: "Compact, efficient monoblock sets for open-source and shallow-lift applications on farms and in homes." },
  { icon: Waves, name: "Openwell Pumps", desc: "Purpose-built for open wells and sumps — reliable lift with low maintenance for daily farm use." },
  { icon: Zap, name: "Pump Motors", desc: "Genuine KSB motors sized to your pump for efficient, long-running performance and lower power bills." },
  { icon: Sun, name: "Solar Pumps", desc: "Solar-powered pump sets for off-grid fields and areas with unreliable electricity supply." },
  { icon: SlidersHorizontal, name: "Starters, Panels & Controllers", desc: "Control panels, starters and protection devices to run your pump safely and extend its working life." },
];

const WHY = [
  { icon: Award, title: "Authorized KSB Dealer", desc: "Official dealer in Eluru — every pump and motor is genuine KSB with full manufacturer warranty. No duplicates." },
  { icon: MapPin, title: "Free Pump Sizing", desc: "We check your borewell depth, water yield and use-case before recommending the right pump — no guesswork." },
  { icon: LifeBuoy, title: "Installation & After-Sales", desc: "Professional installation plus ongoing maintenance and support to keep your pump running for years." },
  { icon: BadgePercent, title: "APMIP Subsidy Help", desc: "Where your project qualifies for government micro-irrigation subsidy, we handle the paperwork end to end." },
];

export default function KsbPumpsPage() {
  return (
    <LandingPageTemplate
      badge="KSB Authorized Dealer · Eluru, AP"
      title="KSB Pumps & Motors — Genuine, Correctly Sized, Installed Right"
      description="We're the authorized KSB Pumps & Motors dealer in Eluru. One team handles pump selection, supply and installation — submersible, monoblock, openwell and solar — for farms, homes and industries."
      trustPoints={TRUST_POINTS}
      products={PRODUCTS}
      whyReasons={WHY}
      formTitle="Get the Right Pump for Your Borewell"
      formDesc="Tell us your requirement and we'll recommend the right KSB pump — no commitment needed."
      productsEyebrow="What we supply"
      productsTitle="Complete KSB Pump Range"
      productsLead="Every pump sourced directly from KSB — genuine quality for borewells, open wells, farms, homes and industrial use."
      whyEyebrow="Why choose us"
      whyTitle="One local partner for the complete project"
      whyLead="From pump selection to the day water flows through your system — we handle everything."
      ctaSubtitle="Ready to install?"
      ctaTitle="Get the right KSB pump for your borewell"
      ctaDesc="Call us now or send a WhatsApp — we'll recommend the right pump and schedule installation."
    />
  );
}
