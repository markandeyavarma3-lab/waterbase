"use client";

import Image from "next/image";
import { ArrowRight, Droplets, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/site/section";
import { CountUp } from "@/components/sections/count-up";
import { WaterCaustics } from "@/components/site/water-caustics";
import { MotionPress } from "@/components/ui/motion-press";
import { siteConfig, callNowTelLink } from "@/lib/site-config";
import { trackCallClick } from "@/lib/analytics";
import { CallbackTrigger } from "@/components/site/callback-dialog";

/**
 * Split hero: message and actions on the left, a three-photo collage on the
 * right. Entrance motion is CSS (`.hero-in`), so the top of the homepage
 * ships no animation library.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-sunrise text-water-deep">
      <div className="absolute inset-0 z-0">
        <WaterCaustics />
      </div>

      <Container className="relative z-10 pt-28 pb-20 sm:pt-32 md:pt-36 md:pb-28 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ── Message ── */}
          <div className="text-center lg:text-left">
            <span className="hero-in inline-flex items-center gap-2.5 rounded-full border border-brand-blue-light/50 bg-gradient-to-r from-brand-blue-soft to-brand-green-soft px-5 py-2 text-sm font-semibold tracking-[-0.01em] text-water-deep shadow-soft">
              <span className="relative inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-green shadow-[0_0_0_3px_rgba(46,148,102,0.2)]" />
              {siteConfig.heroBadge}
            </span>

            <h1
              className="hero-in mt-6 font-display text-[clamp(2.25rem,6.4vw,4.1rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
              style={{ animationDelay: "80ms" }}
            >
              Complete <span className="text-brand-green">water management</span>,{" "}
              <span className="block">engineered end to end.</span>
            </h1>

            <p
              className="hero-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
              style={{ animationDelay: "160ms" }}
            >
              Survey, design, supply and installation for commercial landscapes,
              estates and large farms — one accountable team from first site visit
              to after-sales.
            </p>

            <div
              className="hero-in mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "240ms" }}
            >
              {/* Calling is roughly two-thirds of conversions, so it gets the filled button. */}
              <MotionPress magnetic>
                <a
                  href={callNowTelLink()}
                  onClick={trackCallClick}
                  data-gtm="call_now"
                  className="cta-sink-primary cta-call-now group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold transition-colors duration-300"
                >
                  <Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                  Call now
                </a>
              </MotionPress>
              <MotionPress>
                <CallbackTrigger
                  className="cta-sink-secondary group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-colors duration-300"
                >
                  Request a callback
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </CallbackTrigger>
              </MotionPress>
            </div>

            <p
              className="hero-in mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground sm:text-sm lg:mx-0 lg:justify-start"
              style={{ animationDelay: "300ms" }}
            >
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
              <span>Authorised distributor &amp; dealer</span>
              <span className="text-water-deep/30">·</span>
              <span>Jain Irrigation</span>
              <span className="text-water-deep/30">·</span>
              <span>KSB Pumps</span>
              <span className="text-water-deep/30">·</span>
              <span>20+ brands</span>
            </p>
          </div>

          {/* ── Photo collage ── */}
          <div className="hero-in relative mx-auto w-full max-w-xl lg:max-w-none" style={{ animationDelay: "120ms" }}>
            <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
              <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-auto sm:min-h-[26rem]">
                <Image
                  src="/products/rainguns/raingun-dolly.jpg"
                  alt="Raingun irrigating a green field"
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 overflow-hidden rounded-[1.5rem] shadow-lift">
                <Image
                  src="/products/micro-mini-sprinklers/micro-spray.jpg"
                  alt="Micro sprinkler spraying water droplets"
                  fill
                  sizes="(min-width: 1024px) 240px, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 overflow-hidden rounded-[1.5rem] shadow-lift">
                <Image
                  src="/products/sprinkler-irrigation/field-sprinkler.jpg"
                  alt="Field sprinkler on prepared farmland"
                  fill
                  sizes="(min-width: 1024px) 240px, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating proof chip over the collage */}
            <div className="hero-float absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lift sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
                <Droplets className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-display text-lg font-extrabold leading-none text-heading tabular-nums">
                  <CountUp end={siteConfig.stats[1].value} suffix={siteConfig.stats[1].suffix} />
                </span>
                <span className="text-xs text-muted-foreground">{siteConfig.stats[1].label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/70 bg-white/75 px-4 py-7 shadow-soft md:mt-20">
          <div className="grid grid-cols-2 gap-y-7 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-water-deep/10">
            {siteConfig.stats.map((s, i) => (
              <div key={s.label} className="hero-stat px-2 text-center" style={{ animationDelay: `${350 + i * 70}ms` }}>
                <p className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-heading">
                  <CountUp end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-[0.8125rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
