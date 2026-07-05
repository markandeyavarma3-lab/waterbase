import {
  Droplets, CloudRain, Move, Flower2, Package, Workflow, Spline, Filter,
  FlaskConical, Wrench, SlidersHorizontal, Cpu, ArrowDownToLine, Sun,
  PencilRuler, Layers, Sprout,
} from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

const categories = [
  { icon: Droplets, title: "Drip Irrigation", desc: "Inline & online drippers, laterals and emitters — water straight to the root zone." },
  { icon: CloudRain, title: "Sprinklers", desc: "Micro, mini and impact sprinklers for even overhead coverage." },
  { icon: Move, title: "Portable Sprinkler Sets", desc: "Quick-deploy, shiftable sprinkler sets for flexible field watering." },
  { icon: Flower2, title: "Garden, Landscape & Turf Irrigation", desc: "Pop-up and micro systems for lawns, gardens, parks and turf." },
  { icon: Package, title: "Drip Kits", desc: "Ready-to-install kits for small plots, terraces and kitchen gardens." },
  { icon: Workflow, title: "PVC Piping", desc: "Rigid PVC mains and sub-mains in every size." },
  { icon: Spline, title: "PE Piping & PE Coils", desc: "Flexible HDPE / PE pipes and coils for laterals and mains." },
  { icon: Filter, title: "Filters", desc: "Screen, disc and sand filtration that keeps the system clog-free." },
  { icon: FlaskConical, title: "Fertilizer Injectors & Dosing Pumps", desc: "Venturi injectors, dosing pumps and tanks for precise fertigation." },
  { icon: Wrench, title: "Fittings", desc: "Connectors, take-offs, grommets, joiners and end caps." },
  { icon: SlidersHorizontal, title: "Valves & Accessories", desc: "Air-release, flush, control and solenoid valves plus accessories." },
  { icon: Cpu, title: "Automation Systems", desc: "Controllers, timers and sensor-driven irrigation automation." },
  { icon: ArrowDownToLine, title: "Gravity Drip Irrigation Systems", desc: "Low-pressure drip that runs on gravity — no pump required." },
  { icon: Sun, title: "Solar Powered Drip Irrigation", desc: "Solar pump-driven drip for off-grid and remote fields." },
  { icon: PencilRuler, title: "Design, Engineering & Planning", desc: "Survey, hydraulic design and complete system planning." },
  { icon: Layers, title: "Integrated Micro Irrigation Projects (Turnkey)", desc: "End-to-end turnkey execution — design, supply, install, commission." },
  { icon: Sprout, title: "Hi-Tech Planting Material", desc: "Quality saplings and tissue-culture planting material." },
];

export function ProductCategories() {
  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          eyebrow="Micro Irrigation"
          title="Our complete product & project range"
          lead="From a single dripper to turnkey micro-irrigation projects — everything we supply, design and install, all under one roof from 20+ trusted brands."
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((c) => (
            <StaggerItem key={c.title}>
              <InteractiveCard className="p-6">
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
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
