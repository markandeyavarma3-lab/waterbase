import { Container } from "@/components/site/section";
import { CountUp } from "@/components/sections/count-up";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
import { AnimatedWord } from "@/components/sections/animated-word";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-green-deep text-white">
      {/* Aurora — slow drifting gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* green field glow */}
        <div className="motion-aurora absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(107,192,151,0.22),transparent_65%)] blur-3xl" style={{ animation: "aurora-1 24s ease-in-out infinite" }} />
        {/* sky-blue glow */}
        <div className="motion-aurora absolute -left-[12%] top-[8%] h-[45vw] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(63,163,218,0.16),transparent_65%)] blur-3xl" style={{ animation: "aurora-2 28s ease-in-out infinite" }} />
        {/* sunrise-orange glow on the horizon */}
        <div className="motion-aurora absolute -bottom-[30%] left-[18%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(244,162,76,0.18),transparent_60%)] blur-3xl" style={{ animation: "aurora-1 26s ease-in-out infinite" }} />
      </div>
      {/* Subtle dot grid texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />

      <Container className="py-14 md:py-20">
        <div className="max-w-3xl">
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

        <Reveal delay={120}>
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
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
