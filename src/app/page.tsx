import { Hero } from "@/components/sections/hero";
import { EndToEnd } from "@/components/sections/end-to-end";
import { Crops } from "@/components/sections/crops";
import { Clients } from "@/components/sections/clients";
import { Supply } from "@/components/sections/supply";
import { BrandsMarquee } from "@/components/sections/brands-marquee";
import { WhyWaterbase } from "@/components/sections/why-waterbase";
import { Apmip } from "@/components/sections/apmip";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: "Complete Irrigation & Water Management Solutions",
  description: "Waterbase Technologies is a complete irrigation and agricultural water management solutions provider.",
  path: "/",
});

export default function Home() {
  return (
    <div className="theme-warm">
      {/* Intro */}
      <Hero />

      {/* Part 1 — Commercial & large-scale irrigation */}
      <EndToEnd />
      <Crops limit={12} />
      <Clients />

      {/* Part 2 — Products we supply */}
      <Supply />
      <BrandsMarquee twoRows />

      {/* Part 3 — Why choose us */}
      <WhyWaterbase />

      {/* Part 4 — APMIP subsidy */}
      <Apmip />

      {/* Social proof */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Contact */}
      <ContactCTA />
    </div>
  );
}
