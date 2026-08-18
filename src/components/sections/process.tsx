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

/** 0 at neighbour (small), 1 at viewport centre (large). */
function focusFromDistance(dist: number, slot: number) {
  return Math.max(0, 1 - dist / slot);
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [focus, setFocus] = useState<number[]>(() => steps.map((_, i) => (i === 0 ? 1 : 0)));
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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      requestAnimationFrame(() => {
        setProgress(1);
        setFocus(steps.map(() => 1));
      });
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const trigger = window.innerHeight * 0.82;
        const p = (trigger - rect.top) / rect.height;
        setProgress(Math.min(1, Math.max(0, p)));

        const centre = window.innerHeight / 2;
        const slot = window.innerHeight / 3;
        let active = 1;
        let best = Infinity;
        const nextFocus = steps.map((_, i) => {
          const node = nodeRefs.current[i];
          if (!node) return 0;
          const r = node.getBoundingClientRect();
          const mid = r.top + r.height / 2;
          const dist = Math.abs(mid - centre);
          if (dist < best) {
            best = dist;
            active = i + 1;
          }
          return focusFromDistance(dist, slot);
        });
        setFocus(nextFocus);
        setActiveStep(active);
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
  const currentStep = activeStep;

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
      <div className="sticky top-20 z-30 mb-4 flex justify-center">
        <motion.span
          layout
          className="inline-flex items-center gap-2 rounded-full sink-panel living-mesh-b px-3.5 py-1.5 text-xs font-semibold text-foreground"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          <span className="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#5BB8E8] shadow-[0_0_0_3px_rgba(91,184,232,0.2)]" />
          <span className="tabular-nums">
            Step{" "}
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

      <span className="process-canal-bank pointer-events-none absolute left-8 top-8 bottom-8 w-2.5 -translate-x-1/2 rounded-full md:left-1/2" aria-hidden="true" />
      <motion.span
        className="process-canal-water pointer-events-none absolute left-8 top-8 w-2.5 -translate-x-1/2 overflow-hidden rounded-full md:left-1/2"
        style={{ height: railHeight }}
        aria-hidden="true"
      />
      <motion.span
        className="pointer-events-none absolute left-8 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
        style={{ top: pulseTop, opacity: pulseOpacity }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-[#5BB8E8]/45 [animation-duration:1.6s]" />
        <span className="relative block h-2.5 w-2.5 rounded-full bg-[#5BB8E8] shadow-[0_0_10px_3px_rgba(91,184,232,0.65)]" />
      </motion.span>

      <ol className="relative">
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          const t = focus[i] ?? 0;
          const lit = reached >= i + 0.15 || t > 0.08;
          const completed = reached >= i + 1;
          const scale = 0.78 + t * 0.34;
          const opacity = 0.42 + t * 0.58;
          return (
            <li
              key={step.title}
              ref={(n) => { nodeRefs.current[i] = n; }}
              className="relative flex min-h-[32vh] items-center pb-2 last:pb-0"
            >
              <motion.span
                className="absolute left-8 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:left-1/2"
                animate={lit ? { scale: 0.85 + t * 0.2, opacity: 1, rotate: 0 } : { scale: 0.4, opacity: 0, rotate: -30 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.7 }}
              >
                <span className={cn("absolute inset-0 rounded-full bg-[#5BB8E8]/30 blur-md transition-opacity duration-500", t > 0.5 ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                <span
                  className={cn(
                    "process-node relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-white shadow-lift ring-4 ring-background",
                    i % 3 === 0 && "living-mesh-a",
                    i % 3 === 1 && "living-mesh-b",
                    i % 3 === 2 && "living-mesh-c"
                  )}
                >
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
                <span
                  className={cn(
                    "process-node-badge absolute -right-0.5 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full font-display text-[11px] font-extrabold shadow-soft ring-2 ring-background",
                    i % 3 === 0 && "living-mesh-a",
                    i % 3 === 1 && "living-mesh-b",
                    i % 3 === 2 && "living-mesh-c"
                  )}
                >
                  {i + 1}
                </span>
              </motion.span>

              <motion.div
                className={cn(
                  "ml-20 w-full origin-center md:ml-0 md:w-[calc(50%-3.5rem)]",
                  left ? "md:mr-auto md:origin-right md:pr-14" : "md:ml-auto md:origin-left md:pl-14"
                )}
                style={{ transformPerspective: 800 }}
                animate={{
                  opacity,
                  scale,
                  x: 0,
                  rotateY: 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.75 }}
              >
                <InteractiveCard
                  glow={false}
                  className={cn(
                    "process-step-card p-5",
                    i % 3 === 0 && "living-mesh-a",
                    i % 3 === 1 && "living-mesh-b",
                    i % 3 === 2 && "living-mesh-c",
                    left && "md:text-right",
                    t > 0.65 && "shadow-lift"
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
