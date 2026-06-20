import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Droplets, Gauge, Wind, CloudRain, Layers, Filter, Award, MapPin, LifeBuoy, BadgePercent } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Jain Drip Irrigation in Eluru | Waterbase Technologies",
  description: "Authorized Jain Irrigation dealer in Eluru. Survey, design, supply & installation of drip and sprinkler systems for farms, nurseries and corporate projects across West Godavari, AP.",
  path: "/jain-systems",
});

const TRUST_POINTS = [
  "Authorized Jain dealer — genuine products & warranty",
  "Free site survey before any commitment",
  "APMIP subsidy eligible — up to 90% off system cost",
  "15,000+ farmers served across AP & Telangana",
];

const PRODUCTS: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Droplets, name: "Drip Laterals & Emitters", desc: "Precision drip delivers water directly to roots — cuts water usage by 50–70% versus flood irrigation." },
  { icon: Gauge, name: "Pressure-Compensating (PC) Drip", desc: "Consistent flow regardless of slope or pressure variation. Ideal for uneven terrain and long field rows." },
  { icon: Wind, name: "Micro-Sprinklers", desc: "Fine, even coverage for orchards, groundnut, nurseries and under-canopy watering. Low-pressure operation." },
  { icon: CloudRain, name: "Rain Guns & Field Sprinklers", desc: "Large-area coverage for paddy, sugarcane and open fields. Multiple nozzle sizes available." },
  { icon: Layers, name: "HDPE Mainline & Sub-main Pipes", desc: "Jain-quality HDPE mains, sub-mains and fittings rated for long-term field use in all soil types." },
  { icon: Filter, name: "Disc, Sand & Screen Filters", desc: "Prevent emitter clogging and protect your entire system. Filter type recommended based on your water source." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: "Authorized Jain Dealer", desc: "Official distributor in Eluru — every product is genuine Jain Irrigation with full manufacturer warranty. No duplicates." },
  { icon: MapPin, title: "Free Site Survey", desc: "We visit your field, check your water source and design the right system before you commit to anything." },
  { icon: LifeBuoy, title: "Full Project Execution", desc: "Survey → design → supply → installation → testing. One local team, no middlemen, no subcontractors." },
  { icon: BadgePercent, title: "APMIP Subsidy Help", desc: "Your Jain drip system may qualify for up to 90% government subsidy. We handle the paperwork end to end." },
];

export default function JainSystemsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-green-deep text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_80%_0%,rgba(63,160,108,0.22),transparent_60%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />
        <Container className="py-16 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">

            {/* Left: headline + CTAs + trust points */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">Jain Authorized Distributor · Eluru, AP</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">Jain Drip & Sprinkler Systems — Survey, Supply & Installation</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">We're the authorized Jain Irrigation dealer in Eluru. One team handles your site visit, system design, product supply and complete installation — for paddy, banana, sugarcane, nurseries and corporate farms.</p>
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
                <h2 className="font-display text-xl font-bold text-brand-green-deep">Get a Free Site Survey</h2>
                <p className="mt-1 text-sm text-muted-foreground">We'll visit your field and design the right Jain system — no commitment needed.</p>
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
          <SectionHeading eyebrow="What we supply" title="Complete Jain Irrigation Systems" lead="Every component sourced directly from Jain Irrigation — genuine quality for paddy, sugarcane, banana, horticulture and corporate projects." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{p.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY WATERBASE */}
      <Section tone="brand">
        <Container>
          <SectionHeading eyebrow="Why choose us" title="One local partner for the complete project" lead="From the first site visit to the day water flows through your field — we handle everything." align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand-green">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* BOTTOM CTA */}
      <Section tone="brand-dark">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light">Ready to install?</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">Get your Jain drip system up and running</h2>
            <p className="mt-4 text-lg text-white/75">Call us now or send a WhatsApp — we'll schedule your free site survey within 24 hours.</p>
            <ContactActions showCall onDark size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
