import { CountUp } from "@/components/sections/count-up";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { siteConfig } from "@/lib/site-config";

export function Stats() {
  return (
    <section className="relative z-10 px-4 sm:px-6">
      <div className="mx-auto -mt-10 max-w-6xl overflow-hidden rounded-2xl border border-border bg-border shadow-lift">
        <Stagger className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
          {siteConfig.stats.map((s) => (
            <StaggerItem key={s.label} className="bg-card">
              <div className="group flex h-full flex-col items-center justify-center px-4 py-8 text-center transition-colors duration-300 hover:bg-brand-green-soft/60">
                <div className="font-display text-3xl font-extrabold text-brand-green transition-transform duration-300 group-hover:scale-110 md:text-4xl">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}