"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Handshake, MapPin, Ruler, PencilRuler, FileText, Truck, Wrench, Settings, LifeBuoy, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { InteractiveCard } from "@/components/ui/interactive-card";
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
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const smoothProgress = useSpring(0, { stiffness: 120, damping: 26, mass: 0.5 });
  const railHeight = useTransform(smoothProgress, (v) => `calc((100% - 4rem) * ${v})`);
  const pulseTop = useTransform(smoothProgress, (v) => `calc(2rem + (100% - 4rem) * ${v})`);
  const pulseOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  useEffect(() => {
    smoothProgress.set(progress);
  }, [progress, smoothProgress]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      requestAnimationFrame(() => setProgress(1));
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const trigger = window.innerHeight * 0.82; // line near the lower third of the screen
        const p = (trigger - rect.top) / rect.height;
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const reached = progress * steps.length;
  const currentStep = Math.min(steps.length, Math.max(1, Math.ceil(reached)));

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
      {/* live step counter — tracks scroll position through the timeline */}
      <div className="sticky top-20 z-30 mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
          </span>
          Step {currentStep} of {steps.length}
        </span>
      </div>

      {/* rail track */}
      <span className="pointer-events-none absolute left-8 top-8 bottom-8 w-1 -translate-x-1/2 rounded-full bg-border md:left-1/2" aria-hidden="true" />
      {/* rail fill — follows scroll */}
      <motion.span
        className="pointer-events-none absolute left-8 top-8 w-1 -translate-x-1/2 overflow-hidden rounded-full bg-gradient-to-b from-brand-green via-brand-green-light to-brand-blue md:left-1/2"
        style={{ height: railHeight }}
        aria-hidden="true"
      >
        {/* flowing shimmer — reads as water moving down the filled rail */}
        <span
          className="motion-flow absolute inset-0 opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(180deg, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) 4px, transparent 4px, transparent 16px)",
            animation: "flow-dash 700ms linear infinite",
          }}
        />
      </motion.span>
      {/* traveling signal pulse — marks exactly how far the rail has filled */}
      <motion.span
        className="pointer-events-none absolute left-8 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
        style={{ top: pulseTop, opacity: pulseOpacity }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-brand-glow/50 [animation-duration:1.6s]" />
        <span className="relative block h-2.5 w-2.5 rounded-full bg-brand-glow shadow-[0_0_10px_3px_rgba(79,224,196,0.7)]" />
      </motion.span>

      <ol className="relative">
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          const active = reached >= i + 0.25;
          const completed = reached >= i + 1;
          return (
            <li key={step.title} className="relative pb-11 last:pb-0 md:pb-16">
              {/* node */}
              <motion.span
                className="absolute left-8 top-0 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center md:left-1/2"
                animate={active ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.4, opacity: 0, rotate: -30 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {/* glow */}
                <span className={cn("absolute inset-0 rounded-full bg-brand-green/30 blur-md transition-opacity duration-500", active ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                {/* disc */}
                <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-lift ring-4 ring-background">
                  <AnimatePresence mode="wait" initial={false}>
                    {completed ? (
                      <motion.span
                        key="done"
                        initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Check className="h-6 w-6" aria-hidden="true" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <step.icon className="h-6 w-6" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                {/* number badge */}
                <span className="absolute -right-0.5 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-graphite-900 font-display text-[11px] font-extrabold text-white shadow-soft ring-2 ring-background">
                  {i + 1}
                </span>
              </motion.span>

              {/* content card */}
              <motion.div
                className={cn(
                  "ml-20 md:ml-0 md:w-[calc(50%-3.5rem)]",
                  left ? "md:mr-auto md:pr-14" : "md:ml-auto md:pl-14"
                )}
                style={{ transformPerspective: 800 }}
                animate={active ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: left ? -16 : 16, scale: 0.96, rotateY: left ? 6 : -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <InteractiveCard glow={false} className={cn("p-5", left && "md:text-right")}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green/70">Step {i + 1}</p>
                  <h3 className="mt-1 font-display text-base font-semibold leading-tight transition-colors group-hover:text-brand-green md:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </InteractiveCard>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
