import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Building2, Sprout, Factory, Ruler, Zap, Settings2, Award, LifeBuoy, MapPin, ShieldCheck } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { StickyCallBar } from "@/components/site/sticky-call-bar";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Commercial & Industrial Irrigation in AP | Waterbase Technologies",
  description: "Turnkey irrigation for corporate lawns, nurseries, factories, resorts and large agricultural developments. Authorized Jain and Netafim dealer serving Vijayawada, Hyderabad, CRDA and beyond.",
  path: "/commercial-irrigation",
});

const TRUST_POINTS = [
  "100+ corporate and industrial projects completed",
  "Survey, design, supply and full turnkey installation",
  "Projects across Vijayawada, Hyderabad, CRDA and Vizag",
  "Authorized Jain Irrigation and Netafim dealer",
];

const SERVICES: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Building2, name: "Corporate Lawn Irrigation", desc: "Multi-zone pop-up sprinkler and drip systems for office parks, gated communities, hotels and resorts. Timer-ready." },
  { icon: Sprout, name: "Nursery Drip Systems", desc: "Precision drip and mist systems for plant nurseries, poly houses and floriculture — designed for high plant density." },
  { icon: Factory, name: "Industrial Green Belt", desc: "Dust suppression, tree plantation drip and green belt irrigation for factories, SEZs and industrial parks." },
  { icon: Ruler, name: "Landscape Irrigation Design", desc: "Layout design for large-area projects with hydraulic calculations. Coordinated with landscape architects on request." },
  { icon: Zap, name: "Pump & Motor Integration", desc: "KSB pump selection, installation, control panel wiring and pressure testing for pressurized commercial systems." },
  { icon: Settings2, name: "Automation & Controllers", desc: "Timer-based and sensor-driven irrigation controllers for unmanned operation of large multi-zone systems." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: "100+ Projects Delivered", desc: "Proven track record across corporate campuses, nurseries, resorts and large farms across AP and Telangana." },
  { icon: LifeBuoy, title: "End-to-End Execution", desc: "Survey → design → supply → installation → testing and handover. One team handles the complete scope." },
  { icon: MapPin, title: "Wide Service Reach", desc: "Based in Eluru with projects across Vijayawada, Hyderabad, CRDA, Kadiyam and Vizag corridors." },
  { icon: ShieldCheck, title: "Authorized Brands", desc: "Authorized dealer of Jain Irrigation, Netafim FlexNet and KSB — genuine products with manufacturer warranty." },
];

export default function CommercialIrrigationPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-green-deep text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_80%_0%,rgba(63,160,108,0.22),transparent_60%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />
        <Container className="py-16 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">

            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">Commercial Irrigation · AP & Telangana</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">Irrigation for Corporate Lawns, Nurseries & Industrial Sites</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">We design, supply and install irrigation systems for corporate campuses, nurseries, factories, resorts and large agricultural developments. Authorized Jain Irrigation and Netafim dealer with 100+ commercial projects delivered.</p>
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

            <Reveal delay={120}>
              <div className="rounded-2xl bg-white p-6 text-foreground shadow-lift ring-1 ring-black/5">
                <h2 className="font-display text-xl font-bold text-brand-green-deep">Request a Project Discussion</h2>
                <p className="mt-1 text-sm text-muted-foreground">Share your requirement and we'll get back with a site visit and preliminary plan.</p>
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

      {/* SERVICES */}
      <Section>
        <Container>
          <SectionHeading eyebrow="What we do" title="Complete Commercial Irrigation Solutions" lead="From landscape design to pump integration — everything handled in-house for corporate clients, institutions and large developers." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY WATERBASE */}
      <Section tone="brand">
        <Container>
          <SectionHeading eyebrow="Why choose us" title="The commercial irrigation partner you can rely on" lead="We've delivered 100+ corporate and industrial projects — on time, within scope, with full after-sales support." align="center" />
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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light">Start your project</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">Let's discuss your commercial irrigation project</h2>
            <p className="mt-4 text-lg text-white/75">Call us directly or send a WhatsApp — we'll arrange a site visit and proposal within 48 hours.</p>
            <ContactActions showCall onDark size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
      <StickyCallBar />
    </main>
  );
}
