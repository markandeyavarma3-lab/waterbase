"use client";

import { useEffect, useRef, useState } from "react";
import { Handshake, MapPin, Ruler, PencilRuler, FileText, Truck, Wrench, Settings, LifeBuoy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const steps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Handshake, title: "Client interaction", desc: "We learn your crop, land and goals." },
  { icon: MapPin, title: "Site visit", desc: "Our team assesses the land on-site." },
  { icon: Ruler, title: "Survey", desc: "Soil, water source and layout measured." },
  { icon: PencilRuler, title: "Design", desc: "A system designed for your land." },
  { icon: FileText, title: "Estimation", desc: "Clear, itemised quotation." },
  { icon: Truck, title: "Supply", desc: "Genuine products, delivered on time." },
  { icon: Wrench, title: "Installation", desc: "Installed and commissioned by experts." },
  { icon: Settings, title: "Maintenance", desc: "Scheduled servicing keeps it running." },
  { icon: LifeBuoy, title: "After-sales", desc: "Ongoing support, whenever you need it." },
];

export function Process() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
      {/* rail track */}
      <span className="pointer-events-none absolute left-8 top-8 bottom-8 w-1 -translate-x-1/2 rounded-full bg-border md:left-1/2" aria-hidden="true" />
      {/* rail fill — draws on scroll, sunrise gradient */}
      <span
        className="pointer-events-none absolute left-8 top-8 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-green via-brand-green-light to-brand-sun transition-all duration-[1400ms] ease-out-expo md:left-1/2"
        style={{ height: active ? "calc(100% - 4rem)" : "0px" }}
        aria-hidden="true"
      />

      <ol className="relative">
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          return (
            <li key={step.title} className="relative pb-11 last:pb-0 md:pb-16">
              {/* node */}
              <span
                className={cn(
                  "absolute left-8 top-0 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full transition-all duration-700 ease-out-expo md:left-1/2",
                  active ? "scale-100 opacity-100" : "scale-50 opacity-0"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* glow */}
                <span className="absolute inset-0 rounded-full bg-brand-green/25 blur-md" aria-hidden="true" />
                {/* disc */}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-lift ring-4 ring-background">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                {/* number badge */}
                <span className="absolute -right-0.5 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-sun font-display text-[11px] font-extrabold text-brand-green-deep shadow-soft ring-2 ring-background">
                  {i + 1}
                </span>
              </span>

              {/* content card */}
              <div
                className={cn(
                  "ml-20 transition-all duration-700 ease-out-expo md:ml-0 md:w-[calc(50%-3.5rem)]",
                  left ? "md:mr-auto md:pr-14" : "md:ml-auto md:pl-14",
                  active ? "translate-x-0 opacity-100" : cn("opacity-0", left ? "md:-translate-x-4" : "md:translate-x-4", "max-md:translate-x-3")
                )}
                style={{ transitionDelay: `${i * 100 + 150}ms` }}
              >
                <div className={cn("group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift", left && "md:text-right")}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green/70">Step {i + 1}</p>
                  <h3 className="mt-1 font-display text-base font-semibold leading-tight transition-colors group-hover:text-brand-green md:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
