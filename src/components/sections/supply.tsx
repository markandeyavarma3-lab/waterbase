import Link from "next/link";
import { Droplets, CloudRain, Filter, Gauge, Cpu, Workflow, FlaskConical, Wrench, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";

const categories = [
  { icon: Droplets, title: "Drip Irrigation", desc: "Inline & online drippers, laterals, emitters." },
  { icon: CloudRain, title: "Sprinklers & Rainguns", desc: "Micro, mini and rainguns for every spacing." },
  { icon: Filter, title: "Filters", desc: "Screen, disc and sand filtration." },
  { icon: Gauge, title: "Pumps & Motors", desc: "KSB and other leading pump brands." },
  { icon: Cpu, title: "Valves & Automation", desc: "Air, flush, control valves and controllers." },
  { icon: Workflow, title: "PVC & HDPE Pipes", desc: "Mains, sub-mains and matching fittings." },
  { icon: FlaskConical, title: "Fertigation Systems", desc: "Venturi, dosing pumps and tanks." },
  { icon: Wrench, title: "Fittings & Accessories", desc: "Connectors, take-offs, end caps and more." },
];

const reach = ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"];
const brands = ["Jain Irrigation Systems", "KSB Pumps & Motors", "Netafim FlexNet"];

export function Supply() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading eyebrow="What we supply" title="The complete irrigation product range" lead="Every component for drip, sprinkler and water-management systems — genuine products from 20+ leading brands, ready to ship." action={<Button asChild variant="outline"><Link href="/products">Browse all products <ArrowRight /></Link></Button>} />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="h-full">
              <Link href="/products" className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white"><c.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-display text-sm font-semibold transition-colors group-hover:text-brand-green md:text-base">{c.title}</h3>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{c.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-semibold">Supplied across South India</h3>
              <p className="mt-1 text-sm text-muted-foreground">…and pan-India for bulk and project orders.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {reach.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/20 bg-brand-green-soft px-3 py-1.5 text-sm font-medium text-brand-green-dark"><Check className="h-3.5 w-3.5" /> {r}</span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/20 bg-brand-blue-soft px-3 py-1.5 text-sm font-medium text-brand-blue-dark"><Check className="h-3.5 w-3.5" /> Pan-India (bulk orders)</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Authorized dealer &amp; distributor</p>
              <h3 className="mt-2 font-display text-lg font-semibold">Genuine, warranty-backed brands</h3>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {brands.map((b) => (
                  <span key={b} className="rounded-lg border border-border bg-background px-3 py-2 font-display text-sm font-semibold text-foreground/80">{b}</span>
                ))}
                <span className="rounded-lg border border-dashed border-brand-green/40 px-3 py-2 text-sm font-semibold text-brand-green">+20 more</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}