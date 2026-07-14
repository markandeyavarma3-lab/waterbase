"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/site/section";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { WaterRipple } from "@/components/site/water-ripple";
import { WaveDivider } from "@/components/site/wave-divider";
import { siteConfig } from "@/lib/site-config";



export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-green-deeper text-white bg-grain">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AuroraGlow variant="hero" />
      </motion.div>
      <WaterRipple className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />

      <Container className="relative z-10 py-16 pb-28 md:py-24 md:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-2xl">
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
              <h1 className="mt-6 font-display text-[2.65rem] font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-[4.25rem]">
                Complete <span className="text-brand-green-light">water management</span>,<br />
                <span className="text-gradient-brand">engineered end to end.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                From the first site survey to lifelong after-sales support — we design, supply and install drip, sprinkler and water-management systems for fields, lawns and nurseries.
              </p>
            </Reveal>

          </div>

          {/* Floating stats panel */}
          <Reveal delay={200}>
            <div className="glass-panel card-shine rounded-3xl p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light">Trusted across South India</p>
              <Stagger className="mt-6 grid grid-cols-2 gap-4">
                {siteConfig.stats.map((s) => (
                  <StaggerItem key={s.label}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-glow/30 hover:bg-white/8">
                      <p className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                        <CountUp end={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 text-xs leading-snug text-white/60 md:text-sm">{s.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Link
                href="/contact"
                className="mt-3 flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                <span>Request a Callback</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      <WaveDivider fill="var(--background)" />
    </section>
  );
}
