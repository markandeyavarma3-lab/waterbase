"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

const regions = [
  { title: "Product Supply", areas: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha", "Pan India (large orders)"] },
  { title: "Design & Installation", areas: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"] },
  { title: "APMIP Assistance", areas: ["West Godavari District", "Andhra Pradesh"] },
];

export function ServiceAreas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Service areas</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Where we work</h2>
      </Reveal>
      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {regions.map((r) => (
          <StaggerItem key={r.title}>
            <InteractiveCard glow={false} className="rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-brand-green">{r.title}</h3>
              <ul className="mt-4 space-y-2">
                {r.areas.map((a, i) => (
                  <motion.li
                    key={a}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                      <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-brand-green/60" aria-hidden="true" />
                      <MapPin className="relative h-4 w-4 text-brand-green" />
                    </span>
                    {a}
                  </motion.li>
                ))}
              </ul>
            </InteractiveCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}