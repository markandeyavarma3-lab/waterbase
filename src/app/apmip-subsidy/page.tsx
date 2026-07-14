import type { LucideIcon } from "lucide-react";
import { Search, FileText, MapPin, FileCheck, Hammer, BadgePercent, Award, ShieldCheck, Zap } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "APMIP Subsidy on Drip Irrigation — 90% Off | Waterbase Technologies",
  description: "Certified APMIP vendor in West Godavari. Eligible AP farmers pay only 10% — we handle the full application, survey assistance and installation of your subsidized drip or sprinkler system.",
  path: "/apmip-subsidy",
});

const TRUST_POINTS = [
  "Certified APMIP vendor — approved for subsidy installation",
  "Full application and paperwork handled for you",
  "Covers drip, sprinkler and micro-irrigation systems",
  "15,000+ farmers served including APMIP subsidy projects",
];

const STEPS = [
  { icon: Search, name: "Eligibility Check", desc: "We verify your land records, crop type and eligible area against the current APMIP scheme norms — free of charge." },
  { icon: FileText, name: "Application Filing", desc: "We prepare all required documents and submit your application to the district horticulture department on your behalf." },
  { icon: MapPin, name: "Field Verification", desc: "A government survey team visits your field to confirm the eligible area. We assist you during this visit." },
  { icon: FileCheck, name: "Sanction Order", desc: "On approval, the department issues a sanction order specifying the approved system type and subsidy amount." },
  { icon: Hammer, name: "System Installation", desc: "We supply and install the approved drip or sprinkler system after sanction — using certified Jain Irrigation materials." },
  { icon: BadgePercent, name: "Subsidy Release", desc: "After government inspection and final approval, the subsidy is credited. You pay only 10% of the total system cost." },
];

const WHY = [
  { icon: Award, title: "Certified APMIP Vendor", desc: "Officially approved by the AP government to supply and install systems under the APMIP micro-irrigation scheme." },
  { icon: FileText, title: "Paperwork Handled", desc: "We manage the full application process — documents, submissions and follow-ups — so you focus on farming." },
  { icon: ShieldCheck, title: "Genuine Jain Systems", desc: "All installed systems use certified Jain Irrigation components as required under the APMIP scheme specifications." },
  { icon: Zap, title: "Fast & Transparent", desc: "No hidden fees. We guide you through every stage and keep you updated until your subsidy is released." },
];

export default function ApmipSubsidyPage() {
  return (
    <LandingPageTemplate
      badge="APMIP Certified Vendor · West Godavari, AP"
      title="90% Government Subsidy on Drip Irrigation — Apply Now"
      description="Under the APMIP scheme, eligible farmers in Andhra Pradesh pay only 10% of the drip or sprinkler system cost. We're a certified vendor and handle everything — from application to installation."
      trustPoints={TRUST_POINTS}
      products={STEPS}
      whyReasons={WHY}
      formTitle="Check Your Eligibility"
      formDesc="Leave your details and we'll call you back to check if your land qualifies for the subsidy."
      productsEyebrow="How it works"
      productsTitle="From application to installation — we handle it"
      productsLead="Six straightforward steps. You provide the land and crop details; we do the rest."
      whyEyebrow="Why choose us"
      whyTitle="The trusted APMIP partner in West Godavari"
      whyLead="We've helped thousands of farmers access the government subsidy — with zero paperwork hassle."
      ctaSubtitle="Don't miss the subsidy"
      ctaTitle="Find out if your land qualifies — call us now"
      ctaDesc="Eligibility check is free. We'll confirm within minutes and guide you through the next steps."
    />
  );
}
