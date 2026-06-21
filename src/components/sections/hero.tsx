import { Star, ShieldCheck } from "lucide-react";
import { Container } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
import { AnimatedWord } from "@/components/sections/animated-word";
import { siteConfig } from "@/lib/site-config";

// Drop your real hero photo at /public/images/hero.jpg (portrait ~1200x1500).
// Until then it shows a green sprinkler-irrigation sample (with a backup if that ever fails).
const HERO_LOCAL = "/images/hero.jpg";
const HERO_SAMPLES = [
  "https://images.unsplash.com/photo-1692369584496-3216a88f94c1?auto=format&fit=crop&w=1400&q=70", // sprinkler on green field
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=70", // safe backup
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-green-deep text-white">
      {/* Aurora — slow drifting gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="motion-aurora absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(63,160,108,0.26),transparent_65%)] blur-3xl" style={{ animation: "aurora-1 24s ease-in-out infinite" }} />
        <div className="motion-aurora absolute -bottom-[25%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(20,135,196,0.16),transparent_65%)] blur-3xl" style={{ animation: "aurora-2 28s ease-in-out infinite" }} />
      </div>
      {/* Subtle dot grid texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />

      <Container className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green-light" />
                </span>
                {siteConfig.heroBadge}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Complete <AnimatedWord />,<br />engineered end to end.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                From the first site survey to lifelong after-sales support — we design, supply and install drip, sprinkler and water-management systems for fields, lawns and nurseries. For individual farmers and large companies alike.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ContactActions onDark size="xl" className="mt-8" />
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-sm text-white/70">Trusted by <strong className="font-semibold text-white">15,000+</strong> customers</span>
                </div>
                <span className="hidden h-4 w-px bg-white/20 sm:block" />
                <p className="text-sm text-white/55">Jain · KSB · Netafim — 20+ leading brands</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <MediaSlot src={HERO_LOCAL} fallbackSrc={HERO_SAMPLES} alt="Sprinkler irrigation across a green field" ratio="tall" priority sizes="(min-width: 1024px) 45vw, 100vw" className="shadow-lift ring-1 ring-white/15" />

            {/* Floating stat badge — bottom left */}
            <div className="motion-float absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 text-foreground shadow-lift sm:block" style={{ animation: "float-y 6s ease-in-out infinite" }}>
              <p className="font-display text-2xl font-extrabold text-brand-green"><CountUp end={50000} suffix="+" /></p>
              <p className="text-xs font-medium text-muted-foreground">acres irrigated</p>
            </div>

            {/* Floating trust badge — top right */}
            <div className="motion-float absolute -right-4 top-6 hidden items-center gap-2.5 rounded-2xl border border-border bg-card p-3 pr-4 text-foreground shadow-lift md:flex" style={{ animation: "float-y 7s ease-in-out infinite 0.8s" }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green"><ShieldCheck className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-bold leading-tight">Authorized dealer</p>
                <p className="text-xs text-muted-foreground">Genuine · warranty-backed</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 md:mt-20 lg:grid-cols-5">
            {siteConfig.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl"><CountUp end={s.value} suffix={s.suffix} /></p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
