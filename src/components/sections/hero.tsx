import { Container } from "@/components/site/section";
import { MediaSlot } from "@/components/site/media-slot";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,rgba(63,160,108,0.22),transparent_60%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />
      <Container className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
                Authorized dealer &amp; distributor · Since {siteConfig.since}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Complete irrigation, engineered end to end.
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
              <p className="mt-6 text-sm text-white/55">Jain Irrigation · KSB Pumps · Netafim FlexNet — 20+ leading brands</p>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <MediaSlot src={HERO_LOCAL} fallbackSrc={HERO_SAMPLES} alt="Sprinkler irrigation across a green field" ratio="tall" priority sizes="(min-width: 1024px) 45vw, 100vw" className="shadow-lift ring-1 ring-white/15" />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 text-foreground shadow-lift sm:block">
              <p className="font-display text-2xl font-extrabold text-brand-green"><CountUp end={50000} suffix="+" /></p>
              <p className="text-xs font-medium text-muted-foreground">acres irrigated</p>
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