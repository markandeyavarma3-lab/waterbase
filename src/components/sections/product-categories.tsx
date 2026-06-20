import { Droplets, CloudRain, Filter, Gauge, Cpu, Workflow, FlaskConical, Wrench } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";

const categories = [
  { icon: Droplets, title: "Drip Irrigation Systems", desc: "Precise, water-efficient delivery straight to the root zone.", items: ["Inline drip laterals", "Online drippers & emitters", "Pressure-compensating drippers", "Emitting / drip pipe", "Drip connectors & accessories"] },
  { icon: CloudRain, title: "Sprinklers & Rain Guns", desc: "Even coverage for field crops, lawns and large areas.", items: ["Micro & mini sprinklers", "Impact sprinklers", "Rain guns", "Pop-up sprinklers (landscape)", "Risers & nozzles"] },
  { icon: Filter, title: "Filters", desc: "Clean water in, clogging out — protects the whole system.", items: ["Screen filters", "Disc filters", "Sand / media filters", "Hydrocyclone sand separators"] },
  { icon: Gauge, title: "Pumps & Motors", desc: "Reliable pressure and flow from trusted pump brands.", items: ["Submersible pumps", "Monoblock pumps", "Openwell pumps", "Centrifugal pumps", "KSB & leading brands"] },
  { icon: Cpu, title: "Valves & Automation", desc: "Control, protect and automate your irrigation.", items: ["Air-release & vacuum valves", "Flush & control valves", "Solenoid valves", "Controllers & timers"] },
  { icon: Workflow, title: "PVC & HDPE Pipes", desc: "Mains and sub-mains that carry water across the site.", items: ["PVC pipes", "HDPE pipes", "Mains & sub-mains", "Pipe fittings & joiners"] },
  { icon: FlaskConical, title: "Fertigation Systems", desc: "Deliver nutrients with the water, precisely and evenly.", items: ["Venturi injectors", "Fertilizer tanks", "Dosing pumps", "Fertigation controllers"] },
  { icon: Wrench, title: "Fittings & Accessories", desc: "Everything that ties the system together.", items: ["Connectors & take-offs", "Grommets & start connectors", "End caps & joiners", "Tools & spares"] },
];

export function ProductCategories() {
  return (
    <Section tone="default">
      <Container>
        <SectionHeading eyebrow="Product range" title="Everything for modern irrigation" lead="A complete range of irrigation and water-management products from 20+ trusted brands — supplied across South India and pan-India for bulk orders." />

        {/* Category pill nav */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c.title} className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green-soft px-3 py-1 text-xs font-medium text-brand-green-dark">
              <c.icon className="h-3.5 w-3.5" /> {c.title}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 50} className="h-full">
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.items.map((it) => (
                    <span key={it} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/75 transition-colors group-hover:bg-brand-green-soft group-hover:text-brand-green-dark">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
