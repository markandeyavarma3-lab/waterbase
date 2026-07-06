"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/site/section";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { ContactActions } from "@/components/site/contact-actions";
import { AnimatedWord } from "@/components/sections/animated-word";
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
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-green-deeper text-white">
      {/* Aurora — slow drifting gradient blobs, with a subtle scroll-linked parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AuroraGlow variant="hero" />
      </motion.div>
      {/* Ambient + pointer-reactive water ripple (desktop only — see WaterRipple) */}
      <WaterRipple className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      {/* Subtle dot grid texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />

      <Container className="py-14 pb-24 md:py-20 md:pb-32">
        <div className="max-w-3xl">
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
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Complete <AnimatedWord />,<br />engineered end to end.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              From the first site survey to lifelong after-sales support — we design, supply and install drip, sprinkler and water-management systems for fields, lawns and nurseries. For individual farmers and large companies alike.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ContactActions onDark size="xl" className="mt-8" />
          </Reveal>
        </div>

        <Stagger className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
          {siteConfig.stats.map((s) => (
            <StaggerItem key={s.label}>
              <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl"><CountUp end={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm text-white/60">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <WaveDivider fill="var(--background)" />
    </section>
  );
}
