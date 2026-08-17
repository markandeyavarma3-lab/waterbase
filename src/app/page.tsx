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
  title: "Engineered irrigation for commercial sites and large farms",
  description: "Waterbase Technologies designs, supplies and installs irrigation for commercial landscapes, estates and large farms across South India. Authorised Jain, KSB and Netafim dealer, Eluru.",
  path: "/",
});

export default function Home() {
  return (
    <div className="theme-warm">
      {/* Intro */}
      <Hero />

      {/* Part 1 — Commercial & large-scale irrigation */}
      <EndToEnd />
      <Crops limit={14} />
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
