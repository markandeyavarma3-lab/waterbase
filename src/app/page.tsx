import { Hero } from "@/components/sections/hero";
import { EndToEnd } from "@/components/sections/end-to-end";
import { Clients } from "@/components/sections/clients";
import { Supply } from "@/components/sections/supply";
import { Apmip } from "@/components/sections/apmip";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <main>
      {/* Intro */}
      <Hero />

      {/* Part 1 — Commercial & large-scale irrigation */}
      <EndToEnd />
      <Clients />

      {/* Part 2 — Products we supply */}
      <Supply />

      {/* Part 3 — APMIP subsidy */}
      <Apmip />

      {/* Contact */}
      <ContactCTA />
    </main>
  );
}
