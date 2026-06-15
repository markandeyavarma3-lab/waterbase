"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";

// Drop logos at these paths in /public (PNG works best). Until then, the name shows as text.
const clients = [
  { name: "Nuziveedu Seeds", logo: "/clients/nuziveedu-seeds.png" },
  { name: "Alakananda Riverfront", logo: "/clients/alakananda-riverfront.png" },
  { name: "Sri Sarvaraya Sugars", logo: "/clients/sri-sarvaraya-sugars.png" },
  { name: "Devi Seafoods", logo: "/clients/devi-seafoods.png" },
  { name: "Patanjali", logo: "/clients/patanjali.png" },
];

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="group flex h-24 items-center justify-center rounded-2xl border border-border bg-card px-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift">
      {errored ? (
        <span className="text-center font-display text-sm font-semibold text-foreground/70">{name}</span>
      ) : (
        <div className="relative h-12 w-full">
          <Image src={logo} alt={name} fill sizes="200px" unoptimized className="object-contain" onError={() => setErrored(true)} />
        </div>
      )}
    </div>
  );
}

export function Clients() {
  return (
    <Section tone="default">
      <Container>
        <SectionHeading align="center" eyebrow="Our work" title="Companies we've delivered for" lead="We've handled irrigation and water-management projects for these organisations — completed on time, backed by years of after-sales support, and not a single complaint to date." />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <ClientLogo name={c.name} logo={c.logo} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}