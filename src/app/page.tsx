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

export default function Home() {
  return (
    <main>
      {/* Intro */}
      <Hero />

      {/* Part 1 — Commercial & large-scale irrigation */}
      <EndToEnd />
      <Crops />
      <Clients />

      {/* Part 2 — Products we supply */}
      <Supply />
      <BrandsMarquee />

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
    </main>
  );
}
