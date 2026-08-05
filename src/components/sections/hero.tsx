"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Sprout, Building2, MapPin, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/site/section";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { CursorGlow } from "@/components/site/cursor-glow";
import { WaterRipple } from "@/components/site/water-ripple";
import { WaveDivider } from "@/components/site/wave-divider";
import { MotionPress } from "@/components/ui/motion-press";
import { siteConfig } from "@/lib/site-config";

const STAT_ICONS: Record<string, LucideIcon> = {
  "Customers served": Users,
  "Acres irrigated": Sprout,
  "Corporate projects": Building2,
  "Districts served": MapPin,
  "States served": Globe2,
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-olive-deep text-white bg-grain">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AuroraGlow variant="hero" />
      </motion.div>
      <CursorGlow />
      <WaterRipple className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />

      <Container className="relative z-10 py-12 pb-24 text-center sm:py-16 sm:pb-28 md:py-24 md:pb-36">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium shadow-[0_0_0_1px_rgba(79,224,196,0.08)] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-glow" />
              </span>
              {siteConfig.heroBadge}
            </span>
          </Reveal>
          <Reveal delay={80}>
            {/* Fluid headline: 2.65rem was fixed until the md breakpoint, so it
                overflowed narrow phones and under-filled tablets. */}
            <h1 className="mx-auto mt-6 font-display text-[clamp(2rem,7.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
              <span className="block lg:whitespace-nowrap">Complete <span className="text-brand-green-light">water management</span>,</span>
              <span className="block text-gradient-brand">engineered end to end.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
              From the first site survey to lifelong after-sales support — we design, supply and install drip, sprinkler and water-management systems for fields, lawns and nurseries.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <MotionPress magnetic className="mt-9">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-sun px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/25 ring-1 ring-white/15 transition-colors duration-300 hover:bg-brand-sun-dark"
              >
                Request a Callback
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </MotionPress>
          </Reveal>

          {/* Stats window */}
          <Reveal delay={280}>
            <div className="glass-panel mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl">
              <p className="border-b border-white/10 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light">
                Trusted across South India
              </p>
              <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
                {siteConfig.stats.map((s) => {
                  const Icon = STAT_ICONS[s.label];
                  return (
                    <div key={s.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-7 text-center transition-colors hover:bg-white/5">
                      {Icon ? <Icon className="h-5 w-5 text-brand-green-light" aria-hidden="true" /> : null}
                      <p className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                        <CountUp end={s.value} suffix={s.suffix} />
                      </p>
                      <p className="text-xs leading-snug text-white/60 md:text-sm">{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <WaveDivider fill="var(--background)" />
    </section>
  );
}
