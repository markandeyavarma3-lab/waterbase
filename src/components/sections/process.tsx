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
      {/* rail: left on mobile, centered on desktop */}
      <span className="pointer-events-none absolute left-7 top-7 bottom-7 w-0.5 -translate-x-1/2 bg-border md:left-1/2" aria-hidden="true" />
      <span className="pointer-events-none absolute left-7 top-7 w-0.5 -translate-x-1/2 bg-brand-green transition-all duration-[1200ms] ease-out-expo md:left-1/2" style={{ height: active ? "calc(100% - 3.5rem)" : "0px" }} aria-hidden="true" />

      <ol className="relative">
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          return (
            <li key={step.title} className="relative pb-10 last:pb-0 md:pb-14">
              <span className={cn("absolute left-7 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-card transition-all duration-500 ease-out-expo md:left-1/2", active ? "border-brand-green/30 opacity-100 [transform:translateX(-50%)_scale(1)]" : "border-border opacity-0 [transform:translateX(-50%)_scale(0.85)]")} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="absolute -right-1 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green font-display text-[11px] font-bold text-white">{i + 1}</span>
                <step.icon className="h-6 w-6 text-brand-green" aria-hidden="true" />
              </span>
              <div className={cn("ml-16 transition-all duration-500 ease-out-expo md:ml-0 md:w-[calc(50%-3rem)]", left ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left", active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")} style={{ transitionDelay: `${i * 90 + 120}ms` }}>
                <h3 className="font-display text-base font-semibold leading-tight md:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}