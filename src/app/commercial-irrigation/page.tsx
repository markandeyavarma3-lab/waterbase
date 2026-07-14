import type { LucideIcon } from "lucide-react";
import { Building2, Sprout, Factory, Ruler, Zap, Settings2, Award, LifeBuoy, MapPin, ShieldCheck } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/landing-page-template";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Commercial & Industrial Irrigation in AP | Waterbase Technologies",
  description: "Turnkey irrigation for corporate lawns, nurseries, factories, resorts and large agricultural developments. Authorized Jain and Netafim dealer serving Vijayawada, Hyderabad, CRDA and beyond.",
  path: "/commercial-irrigation",
});

const TRUST_POINTS = [
  "100+ corporate and industrial projects completed",
  "Survey, design, supply and full turnkey installation",
  "Projects across Vijayawada, Hyderabad, CRDA and Vizag",
  "Authorized Jain Irrigation and Netafim dealer",
];

const SERVICES = [
  { icon: Building2, name: "Corporate Lawn Irrigation", desc: "Multi-zone pop-up sprinkler and drip systems for office parks, gated communities, hotels and resorts. Timer-ready." },
  { icon: Sprout, name: "Nursery Drip Systems", desc: "Precision drip and mist systems for plant nurseries, poly houses and floriculture — designed for high plant density." },
  { icon: Factory, name: "Industrial Green Belt", desc: "Dust suppression, tree plantation drip and green belt irrigation for factories, SEZs and industrial parks." },
  { icon: Ruler, name: "Landscape Irrigation Design", desc: "Layout design for large-area projects with hydraulic calculations. Coordinated with landscape architects on request." },
  { icon: Zap, name: "Pump & Motor Integration", desc: "KSB pump selection, installation, control panel wiring and pressure testing for pressurized commercial systems." },
  { icon: Settings2, name: "Automation & Controllers", desc: "Timer-based and sensor-driven irrigation controllers for unmanned operation of large multi-zone systems." },
];

const WHY = [
  { icon: Award, title: "100+ Projects Delivered", desc: "Proven track record across corporate campuses, nurseries, resorts and large farms across AP and Telangana." },
  { icon: LifeBuoy, title: "End-to-End Execution", desc: "Survey → design → supply → installation → testing and handover. One team handles the complete scope." },
  { icon: MapPin, title: "Wide Service Reach", desc: "Based in Eluru with projects across Vijayawada, Hyderabad, CRDA, Kadiyam and Vizag corridors." },
  { icon: ShieldCheck, title: "Authorized Brands", desc: "Authorized dealer of Jain Irrigation, Netafim FlexNet and KSB — genuine products with manufacturer warranty." },
];

export default function CommercialIrrigationPage() {
  return (
    <LandingPageTemplate
      badge="Commercial Irrigation · AP & Telangana"
      title="Irrigation for Corporate Lawns, Nurseries & Industrial Sites"
      description="We design, supply and install irrigation systems for corporate campuses, nurseries, factories, resorts and large agricultural developments. Authorized Jain Irrigation and Netafim dealer with 100+ commercial projects delivered."
      trustPoints={TRUST_POINTS}
      products={SERVICES}
      whyReasons={WHY}
      formTitle="Request a Project Discussion"
      formDesc="Share your requirement and we'll get back with a site visit and preliminary plan."
      productsEyebrow="What we do"
      productsTitle="Complete Commercial Irrigation Solutions"
      productsLead="From landscape design to pump integration — everything handled in-house for corporate clients, institutions and large developers."
      whyEyebrow="Why choose us"
      whyTitle="The commercial irrigation partner you can rely on"
      whyLead="We've delivered 100+ corporate and industrial projects — on time, within scope, with full after-sales support."
      ctaSubtitle="Start your project"
      ctaTitle="Let's discuss your commercial irrigation project"
      ctaDesc="Call us directly or send a WhatsApp — we'll arrange a site visit and proposal within 48 hours."
    />
  );
}
