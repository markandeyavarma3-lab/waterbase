"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/site/section";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { DUR, EASE_OUT_EXPO } from "@/lib/motion";
import { WaterCaustics } from "@/components/site/water-caustics";
import { WaveDivider } from "@/components/site/wave-divider";
import { MotionPress } from "@/components/ui/motion-press";
import { siteConfig, telLink } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -40]);

  return (
    // `isolate` creates a stacking context on the section. Without it the
    // decorative layers below (which sat at -z-10) painted BEHIND this element's
    // own bg-olive-deep fill and were invisible — which is why the old aurora,
    // canvas ripple and cursor glow all rendered as flat dark green.
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-olive-deep text-white bg-grain">
      {/* ONE signature effect, replacing three that competed and none of which
          were actually visible: an aurora at 0.08 alpha behind blur-3xl, a
          canvas water-ripple, and a cursor glow (which does nothing on touch). */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <WaterCaustics />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-white/10" aria-hidden="true" />

      <Container className="relative z-10 py-12 pb-24 text-center sm:py-16 sm:pb-28 md:py-24 md:pb-36">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            {/* The dot no longer pulses. A looping ping next to the headline
                competes with the caustic and pulls the eye off the message —
                a steady dot with a soft halo reads as considered, not busy. */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-sm font-medium tracking-[-0.01em] text-white/85 backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-glow shadow-[0_0_0_3px_rgba(79,224,196,0.15)]" />
              {siteConfig.heroBadge}
            </span>
          </Reveal>
          <Reveal delay={80}>
            {/* Authority-led and in plain words: "complete water management,
                engineered end to end" was abstract corporate language. This names
                the actual span of the work — the pump in the ground through to
                the emitter at the plant — which is the real differentiator. */}
            <h1 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(2.25rem,8vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              <span className="block">From borewell to dripper.</span>
              <span className="block text-brand-green-light">One team.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            {/* One line, not three. A long paragraph directly under a headline
                competes with it instead of supporting it. */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Design, supply, installation and after-sales — for farms, nurseries and
              corporate landscapes across South India.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Calling is the PRIMARY action: it is roughly two-thirds of this
                  business's conversions, so it gets the filled button. The amber
                  is the muted token — full-strength brand-sun read as neon here. */}
              <MotionPress magnetic>
                <a
                  href={telLink(siteConfig.phones.sales.primary)}
                  onClick={trackCallClick}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-brand-sun-muted px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/30 transition-colors duration-300 hover:bg-brand-sun-muted-hover"
                >
                  <Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                  Call now
                </a>
              </MotionPress>
              <MotionPress>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white/90 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.06] hover:text-white"
                >
                  Request a callback
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </MotionPress>
            </div>
          </Reveal>

          {/* Proof, immediately under the actions — the "is this a serious
              operator?" question answered before any scrolling. Wording matches
              the claims already used elsewhere on the site. */}
          <Reveal delay={280}>
            <p className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-white/55 sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-green-light" aria-hidden="true" />
              <span>Authorised distributor &amp; dealer</span>
              <span className="text-white/25">·</span>
              <span>Jain Irrigation</span>
              <span className="text-white/25">·</span>
              <span>KSB Pumps</span>
              <span className="text-white/25">·</span>
              <span>20+ brands</span>
            </p>
          </Reveal>

          {/* Stats as plain figures, not cards. The boxes were doing the work
              that the numbers should do themselves — five glass tiles read as UI
              chrome, whereas bare numerals separated by hairlines read as a fact
              sheet. Icons dropped for the same reason: they added colour and
              noise without adding meaning. */}
          <div className="mx-auto mt-16 max-w-4xl border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
              {siteConfig.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="px-2 text-center"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: DUR.settle, delay: 0.3 + i * 0.06, ease: EASE_OUT_EXPO }}
                >
                  <p className="font-display text-[clamp(1.5rem,3.4vw,2rem)] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-white">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-white/45 sm:text-[0.8125rem]">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <WaveDivider fill="var(--background)" />
    </section>
  );
}
