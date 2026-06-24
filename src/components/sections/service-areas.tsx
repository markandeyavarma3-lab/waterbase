import { MapPin } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Eyebrow } from "@/components/site/section";

const regions = [
  { title: "Product Supply", areas: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha", "Pan India (large orders)"] },
  { title: "Design & Installation", areas: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha"] },
  { title: "APMIP Assistance", areas: ["West Godavari District", "Andhra Pradesh"] },
];

export function ServiceAreas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <Eyebrow>Service areas</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Where we work</h2>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {regions.map((r, i) => (
          <Reveal key={r.title} delay={i * 80} className="h-full">
            <div className="sheen group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
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