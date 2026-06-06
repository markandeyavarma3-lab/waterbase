import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";

// Placeholder projects — replace with your real projects + photos later.
const projects = [
  { category: "Farm Project", title: "50-acre banana drip irrigation", location: "West Godavari, AP", area: "50 acres" },
  { category: "APMIP Project", title: "Subsidy-assisted micro irrigation", location: "Eluru District, AP", area: "120 acres" },
  { category: "Corporate", title: "Campus landscape irrigation", location: "Hyderabad, Telangana", area: "8 acres" },
];

export function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Projects</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Work we&apos;re proud of</h2>
            <p className="mt-3 text-muted-foreground">From smallholder farms to large commercial developments across South India.</p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/projects">View all projects <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="h-full">
            <Link href="/projects" className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg hover:shadow-brand-green-darker/5">
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green-dark to-brand-blue-dark transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-green-dark">{p.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-brand-green">{p.title}</h3>
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {p.location}</span>
                  <span className="font-medium text-foreground">{p.area}</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}