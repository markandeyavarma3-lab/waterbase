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
      {/* Aurora — slow drifting gradient blobs (green + water blue) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* green field glow */}
        <div className="motion-aurora absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(70,184,136,0.26),transparent_65%)] blur-3xl" style={{ animation: "aurora-1 24s ease-in-out infinite" }} />
        {/* water-blue glow */}
        <div className="motion-aurora absolute -left-[12%] top-[6%] h-[48vw] w-[48vw] rounded-full bg-[radial-gradient(circle,rgba(20,136,194,0.22),transparent_65%)] blur-3xl" style={{ animation: "aurora-2 28s ease-in-out infinite" }} />
        {/* deep teal pool near the horizon */}
        <div className="motion-aurora absolute -bottom-[32%] left-[24%] h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(circle,rgba(70,184,136,0.16),transparent_60%)] blur-3xl" style={{ animation: "aurora-1 26s ease-in-out infinite" }} />
      </div>
      {/* Slow-spinning decorative ring */}
      <div className="motion-spin-slow pointer-events-none absolute -right-[18%] top-[10%] -z-10 hidden h-[40vw] w-[40vw] rounded-full border border-white/[0.06] [mask-image:radial-gradient(circle,transparent_55%,black_56%)] lg:block" aria-hidden="true" />
      {/* Subtle dot grid texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <Container className="py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal from="scale">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green-light" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green-light" />
                </span>
                {siteConfig.heroBadge}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 max-w-xl font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] md:text-6xl">
                Complete <AnimatedWord />,<br />engineered end to end.
              </h1>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
                From the first site survey to lifelong after-sales support — we design, supply and install drip, sprinkler and water-management systems for fields, lawns and nurseries. For individual farmers and large companies alike.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <ContactActions onDark size="xl" className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={220} from="left" className="relative">
            {/* glow halo behind the image */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle,rgba(70,184,136,0.25),transparent_70%)] blur-2xl" aria-hidden="true" />
            <MediaSlot src={HERO_LOCAL} fallbackSrc={HERO_SAMPLES} alt="Sprinkler irrigation across a green field" ratio="tall" priority sizes="(min-width: 1024px) 45vw, 100vw" className="rounded-2xl shadow-lift ring-1 ring-white/15" />

            {/* Floating stat badge — bottom left */}
            <div className="motion-float absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card/95 p-4 text-foreground shadow-lift backdrop-blur sm:block" style={{ animation: "float-y 6s ease-in-out infinite" }}>
              <p className="font-display text-2xl font-extrabold text-brand-green"><CountUp end={50000} suffix="+" /></p>
              <p className="text-xs font-medium text-muted-foreground">acres irrigated</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-3 md:mt-24 lg:grid-cols-5">
            {siteConfig.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70} from="up" className="group">
                <p className="font-display text-3xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-brand-green-light md:text-4xl"><CountUp end={s.value} suffix={s.suffix} /></p>
                <p className="mt-1.5 text-sm text-white/55">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
