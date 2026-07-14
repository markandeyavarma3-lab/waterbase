import { Check } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { cn } from "@/lib/utils";

const SERVICES = ["Product Supply", "Design & Installation", "APMIP Assistance"] as const;

const regions: { name: string; coverage: boolean[]; note?: string }[] = [
  { name: "Andhra Pradesh", coverage: [true, true, true], note: "APMIP: West Godavari district" },
  { name: "Telangana", coverage: [true, true, false] },
  { name: "Karnataka", coverage: [true, true, false] },
  { name: "Odisha", coverage: [true, true, false] },
  { name: "Pan-India", coverage: [true, false, false], note: "Bulk & large orders" },
];

export function ServiceAreas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Service areas</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Where we work</h2>
      </Reveal>

      <Reveal delay={100} className="mt-10 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3.5">Region</th>
              {SERVICES.map((s) => (
                <th key={s} className="px-5 py-3.5 text-center">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {regions.map((r, i) => (
              <tr key={r.name} className={cn(i !== regions.length - 1 && "border-b border-border")}>
                <td className="px-5 py-4">
                  <div className="font-display text-sm font-semibold">{r.name}</div>
                  {r.note ? <div className="mt-0.5 text-xs text-muted-foreground">{r.note}</div> : null}
                </td>
                {r.coverage.map((covered, ci) => (
                  <td key={ci} className="px-5 py-4 text-center">
                    {covered ? (
                      <span className="relative mx-auto flex h-6 w-6 items-center justify-center">
                        <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-brand-green/50" aria-hidden="true" />
                        <Check className="relative h-4 w-4 text-brand-green" />
                      </span>
                    ) : (
                      <span className="text-graphite-300">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
