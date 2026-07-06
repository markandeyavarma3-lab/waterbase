import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Gauge, Waves, ArrowUpFromLine, Zap, Sun, SlidersHorizontal, Award, MapPin, LifeBuoy, BadgePercent } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { StickyCallBar } from "@/components/site/sticky-call-bar";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "KSB Pumps & Motors Dealer in Eluru | Waterbase Technologies",
  description: "Authorized KSB Pumps & Motors dealer in Eluru. Submersible, monoblock, openwell and solar pumps with genuine warranty, correct sizing and expert installation across West Godavari, AP.",
  path: "/ksb-pumps",
});

const TRUST_POINTS = [
  "Authorized KSB dealer — genuine pumps & motors with warranty",
  "Free pump sizing based on your borewell depth & flow needs",
  "APMIP subsidy eligible on qualifying micro-irrigation projects",
  "15,000+ farmers served across AP & Telangana",
];

const PRODUCTS: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: ArrowUpFromLine, name: "Submersible Pumps", desc: "Borewell submersible pumps for farm, domestic and industrial water lift — matched to your depth and yield." },
  { icon: Gauge, name: "Monoblock Pumps", desc: "Compact, efficient monoblock sets for open-source and shallow-lift applications on farms and in homes." },
  { icon: Waves, name: "Openwell Pumps", desc: "Purpose-built for open wells and sumps — reliable lift with low maintenance for daily farm use." },
  { icon: Zap, name: "Pump Motors", desc: "Genuine KSB motors sized to your pump for efficient, long-running performance and lower power bills." },
  { icon: Sun, name: "Solar Pumps", desc: "Solar-powered pump sets for off-grid fields and areas with unreliable electricity supply." },
  { icon: SlidersHorizontal, name: "Starters, Panels & Controllers", desc: "Control panels, starters and protection devices to run your pump safely and extend its working life." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: "Authorized KSB Dealer", desc: "Official dealer in Eluru — every pump and motor is genuine KSB with full manufacturer warranty. No duplicates." },
  { icon: MapPin, title: "Free Pump Sizing", desc: "We check your borewell depth, water yield and use-case before recommending the right pump — no guesswork." },
  { icon: LifeBuoy, title: "Installation & After-Sales", desc: "Professional installation plus ongoing maintenance and support to keep your pump running for years." },
  { icon: BadgePercent, title: "APMIP Subsidy Help", desc: "Where your project qualifies for government micro-irrigation subsidy, we handle the paperwork end to end." },
];

export default function KsbPumpsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-green-deeper text-white">
        <AuroraGlow variant="hero" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />
        <Container className="py-16 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">

            {/* Left: headline + CTAs + trust points */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">KSB Authorized Dealer · Eluru, AP</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">KSB Pumps & Motors — Genuine, Correctly Sized, Installed Right</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">We're the authorized KSB Pumps & Motors dealer in Eluru. One team handles pump selection, supply and installation — submersible, monoblock, openwell and solar — for farms, homes and industries.</p>
              </Reveal>
              <Reveal delay={240}>
                <ContactActions showCall onDark size="xl" className="mt-7" />
              </Reveal>
              <Reveal delay={320}>
                <ul className="mt-7 space-y-2.5">
                  {TRUST_POINTS.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-light" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right: callback form */}
            <Reveal delay={120}>
              <div className="rounded-2xl bg-white p-6 text-foreground shadow-lift ring-1 ring-black/5">
                <h2 className="font-display text-xl font-bold text-brand-green-deep">Get the Right Pump for Your Borewell</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us your requirement and we'll recommend the right KSB pump — no commitment needed.</p>
                <div className="mt-5">
                  <LeadForm />
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </section>

      {/* STATS */}
      <Stats />

      {/* PRODUCTS */}
      <Section>
        <Container>
          <SectionHeading eyebrow="What we supply" title="Complete KSB Pump Range" lead="Every pump sourced directly from KSB — genuine quality for borewells, open wells, farms, homes and industrial use." />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <StaggerItem key={p.name}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{p.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* WHY WATERBASE */}
      <Section tone="brand" className="relative overflow-hidden">
        <AuroraGlow variant="cool" />
        <Container>
          <SectionHeading eyebrow="Why choose us" title="One local partner for the complete project" lead="From pump selection to the day water flows through your system — we handle everything." align="center" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <StaggerItem key={w.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand-green">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* BOTTOM CTA */}
      <Section tone="brand-deep" className="relative overflow-hidden">
        <AuroraGlow variant="dark-converge" />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light">Ready to install?</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">Get the right KSB pump for your borewell</h2>
            <p className="mt-4 text-lg text-white/75">Call us now or send a WhatsApp — we'll recommend the right pump and schedule installation.</p>
            <ContactActions showCall onDark size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
      <StickyCallBar />
    </main>
  );
}
