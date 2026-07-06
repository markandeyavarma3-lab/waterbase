"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, CloudRain, Move, Flower2, Package, Workflow, Spline, Filter,
  FlaskConical, Wrench, SlidersHorizontal, Cpu, ArrowDownToLine, Sun,
  PencilRuler, Layers, Sprout,
} from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { cn } from "@/lib/utils";

const TABS = ["All", "Watering Systems", "Pipes & Fittings", "Filtration & Fertigation", "Automation & Projects"] as const;
type Tab = (typeof TABS)[number];

const categories: { icon: typeof Droplets; title: string; desc: string; tab: Exclude<Tab, "All"> }[] = [
  { icon: Droplets, title: "Drip Irrigation", desc: "Inline & online drippers, laterals and emitters — water straight to the root zone.", tab: "Watering Systems" },
  { icon: CloudRain, title: "Sprinklers", desc: "Micro, mini and impact sprinklers for even overhead coverage.", tab: "Watering Systems" },
  { icon: Move, title: "Portable Sprinkler Sets", desc: "Quick-deploy, shiftable sprinkler sets for flexible field watering.", tab: "Watering Systems" },
  { icon: Flower2, title: "Garden, Landscape & Turf Irrigation", desc: "Pop-up and micro systems for lawns, gardens, parks and turf.", tab: "Watering Systems" },
  { icon: Package, title: "Drip Kits", desc: "Ready-to-install kits for small plots, terraces and kitchen gardens.", tab: "Watering Systems" },
  { icon: ArrowDownToLine, title: "Gravity Drip Irrigation Systems", desc: "Low-pressure drip that runs on gravity — no pump required.", tab: "Watering Systems" },
  { icon: Sun, title: "Solar Powered Drip Irrigation", desc: "Solar pump-driven drip for off-grid and remote fields.", tab: "Watering Systems" },
  { icon: Workflow, title: "PVC Piping", desc: "Rigid PVC mains and sub-mains in every size.", tab: "Pipes & Fittings" },
  { icon: Spline, title: "PE Piping & PE Coils", desc: "Flexible HDPE / PE pipes and coils for laterals and mains.", tab: "Pipes & Fittings" },
  { icon: Wrench, title: "Fittings", desc: "Connectors, take-offs, grommets, joiners and end caps.", tab: "Pipes & Fittings" },
  { icon: SlidersHorizontal, title: "Valves & Accessories", desc: "Air-release, flush, control and solenoid valves plus accessories.", tab: "Pipes & Fittings" },
  { icon: Filter, title: "Filters", desc: "Screen, disc and sand filtration that keeps the system clog-free.", tab: "Filtration & Fertigation" },
  { icon: FlaskConical, title: "Fertilizer Injectors & Dosing Pumps", desc: "Venturi injectors, dosing pumps and tanks for precise fertigation.", tab: "Filtration & Fertigation" },
  { icon: Cpu, title: "Automation Systems", desc: "Controllers, timers and sensor-driven irrigation automation.", tab: "Automation & Projects" },
  { icon: PencilRuler, title: "Design, Engineering & Planning", desc: "Survey, hydraulic design and complete system planning.", tab: "Automation & Projects" },
  { icon: Layers, title: "Integrated Micro Irrigation Projects (Turnkey)", desc: "End-to-end turnkey execution — design, supply, install, commission.", tab: "Automation & Projects" },
  { icon: Sprout, title: "Hi-Tech Planting Material", desc: "Quality saplings and tissue-culture planting material.", tab: "Automation & Projects" },
];

export function ProductCategories() {
  const [tab, setTab] = useState<Tab>("All");
  const shown = tab === "All" ? categories : categories.filter((c) => c.tab === tab);

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          eyebrow="Micro Irrigation"
          title="Our complete product & project range"
          lead="From a single dripper to turnkey micro-irrigation projects — everything we supply, design and install, all under one roof from 20+ trusted brands."
        />

        <Reveal className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === t ? "text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="product-tab-pill"
                  className="absolute inset-0 rounded-full bg-brand-green"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((c) => (
              <motion.div
                key={c.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <InteractiveCard className="h-full p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-brand-green">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
