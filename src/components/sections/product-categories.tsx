import Link from "next/link";
import { Droplets, CloudRain, Filter, Gauge, Cpu, Workflow, FlaskConical, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";

const categories = [
  { icon: Droplets, title: "Drip Irrigation Systems" },
  { icon: CloudRain, title: "Sprinklers & Rainguns" },
  { icon: Filter, title: "Filters" },
  { icon: Gauge, title: "Pumps & Motors" },
  { icon: Cpu, title: "Valves & Automation" },
  { icon: Workflow, title: "PVC & HDPE Pipes" },
  { icon: FlaskConical, title: "Fertigation Systems" },
  { icon: Wrench, title: "Fittings & Accessories" },
];

export function ProductCategories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Products</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Everything for modern irrigation</h2>
            <p className="mt-3 text-muted-foreground">A complete range of irrigation and water-management products from 20+ trusted brands.</p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/products">Browse all products <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.title} delay={i * 60} className="h-full">
            <Link href="/products" className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/50 hover:bg-brand-green-soft/50 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-sm font-semibold transition-colors group-hover:text-brand-green md:text-base">{c.title}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}