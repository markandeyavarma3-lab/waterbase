"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Handshake, MapPin, Ruler, PencilRuler, FileText, Truck, Wrench, Settings, LifeBuoy, Check } from "lucide-react";
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setProgress(1));
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const trigger = window.innerHeight * 0.78;
        const p = (trigger - rect.top) / rect.height;
        setProgress(Math.min(1, Math.max(0, p)));

        const centre = window.innerHeight * 0.42;
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

  const reached = progress * steps.length;
  const current = steps[activeStep - 1];
  const CurrentIcon = current.icon;

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
      {/* Spotlight — current step stays pinned while the list drops past it. */}
      <div className="sticky top-20 z-30 mb-8">
        <div className="mx-auto flex max-w-xl items-center gap-4 rounded-2xl border border-water-deep/10 bg-white/75 px-4 py-3 shadow-soft backdrop-blur-md sm:px-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a4a5c] text-white shadow-lift">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeStep}
                initial={prefersReducedMotion ? false : { y: -18, opacity: 0, scale: 0.7 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { y: 18, opacity: 0, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <CurrentIcon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            </AnimatePresence>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-green">
              Step {String(activeStep).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.title}
                className="truncate font-display text-base font-semibold text-water-deep sm:text-lg"
                initial={prefersReducedMotion ? false : { y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.title}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <span className="process-canal-bank pointer-events-none absolute left-7 top-8 bottom-8 w-2.5 -translate-x-1/2 rounded-full sm:left-8" aria-hidden="true" />
      <motion.span
        className="process-canal-water pointer-events-none absolute left-7 top-8 w-2.5 -translate-x-1/2 overflow-hidden rounded-full sm:left-8"
        style={{ height: railHeight }}
        aria-hidden="true"
      />
      <motion.span
        className="pointer-events-none absolute left-7 z-20 -translate-x-1/2 -translate-y-1/2 sm:left-8"
        style={{ top: pulseTop, opacity: pulseOpacity }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-[#5BB8E8]/45 [animation-duration:1.6s]" />
        <span className="relative block h-2.5 w-2.5 rounded-full bg-[#5BB8E8] shadow-[0_0_10px_3px_rgba(91,184,232,0.65)]" />
      </motion.span>

      <ol className="relative">
        {steps.map((step, i) => {
          const active = reached >= i + 0.2;
          const completed = reached >= i + 1;
          const focused = activeStep === i + 1;
          return (
            <li
              key={step.title}
              ref={(n) => { nodeRefs.current[i] = n; }}
              className="relative pb-8 last:pb-0 sm:pb-10"
            >
              <motion.span
                className="absolute left-7 top-1 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center sm:left-8"
                animate={active ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.45, opacity: 0, y: -22 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <span
                  className={cn(
                    "process-node relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-white shadow-lift ring-4 ring-background sm:h-12 sm:w-12",
                    i % 3 === 0 && "living-mesh-a",
                    i % 3 === 1 && "living-mesh-b",
                    i % 3 === 2 && "living-mesh-c"
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {completed ? (
                      <motion.span key="done" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </motion.span>
                    ) : (
                      <motion.span key="icon" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <step.icon className="h-5 w-5" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.span>

              <motion.div
                className="ml-[4.25rem] sm:ml-[4.75rem]"
                initial={false}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : active
                      ? { opacity: 1, y: 0, scale: focused ? 1 : 0.985 }
                      : { opacity: 0, y: -56, scale: 0.96 }
                }
                transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.9 }}
              >
                <div
                  className={cn(
                    "process-step-card overflow-hidden rounded-2xl border px-5 py-4 transition-[box-shadow,border-color] duration-300",
                    i % 3 === 0 && "living-mesh-a",
                    i % 3 === 1 && "living-mesh-b",
                    i % 3 === 2 && "living-mesh-c",
                    focused ? "border-brand-green/35 shadow-lift" : "border-water-deep/8"
                  )}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-green/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold leading-tight md:text-lg">{step.title}</h3>
                  <AnimatePresence initial={false}>
                    {focused ? (
                      <motion.p
                        key="desc"
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 block pb-0.5">{step.desc}</span>
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
