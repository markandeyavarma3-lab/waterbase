"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useReducedMotion } from "framer-motion";
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
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const prefersReducedMotion = useReducedMotion();
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

        // The pill is derived from where the step NODES actually are, not from
        // the rail-fill progress above. The rail is a "filled up to here" line
        // that intentionally runs ahead of the viewport centre, so reusing it
        // made the pill announce a step several nodes before you could see it.
        const centre = window.innerHeight / 2;
        let active = 0;
        nodeRefs.current.forEach((node, i) => {
          if (!node) return;
          const r = node.getBoundingClientRect();
          if (r.top + r.height / 2 <= centre) active = i + 1;
        });
        setActiveStep(Math.min(steps.length, Math.max(1, active)));
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

  // `reached` still drives which cards have animated in (tied to the rail fill).
  // The pill uses activeStep, measured from real node positions — see onScroll.
  const reached = progress * steps.length;
  const currentStep = activeStep;

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
      {/* live step counter — tracks scroll position through the timeline */}
      <div className="sticky top-20 z-30 mb-6 flex justify-center">
        <motion.span
          layout
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {/* Steady dot — the old one looped an animate-ping right next to a
              number that changes, which read as two competing signals. */}
          <span className="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green shadow-[0_0_0_3px_rgba(46,148,102,0.16)]" />
          <span className="tabular-nums">
            Step{" "}
            {/* The digit swaps with a small vertical roll so the change is
                legible in peripheral vision without moving the pill itself. */}
            <span className="relative inline-flex h-[1.1em] w-[1.1ch] overflow-hidden align-baseline">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={currentStep}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={prefersReducedMotion ? false : { y: "-90%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { y: "90%", opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  {currentStep}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            of {steps.length}
          </span>
        </motion.span>
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
            <li
              key={step.title}
              ref={(n) => { nodeRefs.current[i] = n; }}
              className="relative pb-11 last:pb-0 md:pb-16"
            >
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
                <InteractiveCard
                  glow={false}
                  className={cn(
                    "process-step-card p-5",
                    i % 3 === 0 && "living-mesh-a",
                    i % 3 === 1 && "living-mesh-b",
                    i % 3 === 2 && "living-mesh-c",
                    left && "md:text-right"
                  )}
                >
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
