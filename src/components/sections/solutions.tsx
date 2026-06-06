import { Package, Ruler, Wrench, Workflow, Building2, Sprout, BadgePercent } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const solutions = [
  { icon: Package, title: "Product Supply", desc: "Drip, sprinkler, pipes, pumps, filters & automation from 20+ leading brands." },
  { icon: Ruler, title: "Survey & Design", desc: "Field survey, hydraulic planning and complete irrigation system design." },
  { icon: Wrench, title: "Installation Services", desc: "Professional installation by trained field teams and technicians." },
  { icon: Workflow, title: "Project Execution", desc: "End-to-end execution of farm and commercial irrigation projects." },
  { icon: Building2, title: "Corporate & Landscape", desc: "Landscape and campus irrigation for industries, resorts and corporates." },
  { icon: Sprout, title: "Nursery Irrigation", desc: "Specialised micro-irrigation systems for nurseries and plantations." },
  { icon: BadgePercent, title: "APMIP Subsidy Assistance", desc: "End-to-end help with APMIP subsidy irrigation work in West Godavari." },
];

export function Solutions() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">What we do</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Complete solutions, not just products</h2>
        <p className="mt-3 text-muted-foreground">From the first survey to the final installation and subsidy paperwork — we handle every part of your irrigation project.</p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, i) => (
          <Reveal key={s.title} delay={i * 70} className="h-full">
            <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg hover:shadow-brand-green-darker/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-brand-green">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}