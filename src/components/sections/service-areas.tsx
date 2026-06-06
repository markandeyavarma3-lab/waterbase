import { MapPin } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

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
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {regions.map((r, i) => (
          <Reveal key={r.title} delay={i * 80} className="h-full">
            <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lg hover:shadow-brand-green-darker/5">
              <h3 className="font-display text-lg font-bold text-brand-green">{r.title}</h3>
              <ul className="mt-4 space-y-2">
                {r.areas.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-brand-green" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}