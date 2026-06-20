import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Search, FileText, MapPin, FileCheck, Hammer, BadgePercent, Award, ShieldCheck, Zap } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "APMIP Subsidy on Drip Irrigation — 90% Off | Waterbase Technologies",
  description: "Certified APMIP vendor in West Godavari. Eligible AP farmers pay only 10% — we handle the full application, survey assistance and installation of your subsidized drip or sprinkler system.",
  path: "/apmip-subsidy",
});

const TRUST_POINTS = [
  "Certified APMIP vendor — approved for subsidy installation",
  "Full application and paperwork handled for you",
  "Covers drip, sprinkler and micro-irrigation systems",
  "15,000+ farmers served including APMIP subsidy projects",
];

const STEPS: { icon: LucideIcon; step: string; title: string; desc: string }[] = [
  { icon: Search, step: "01", title: "Eligibility Check", desc: "We verify your land records, crop type and eligible area against the current APMIP scheme norms — free of charge." },
  { icon: FileText, step: "02", title: "Application Filing", desc: "We prepare all required documents and submit your application to the district horticulture department on your behalf." },
  { icon: MapPin, step: "03", title: "Field Verification", desc: "A government survey team visits your field to confirm the eligible area. We assist you during this visit." },
  { icon: FileCheck, step: "04", title: "Sanction Order", desc: "On approval, the department issues a sanction order specifying the approved system type and subsidy amount." },
  { icon: Hammer, step: "05", title: "System Installation", desc: "We supply and install the approved drip or sprinkler system after sanction — using certified Jain Irrigation materials." },
  { icon: BadgePercent, step: "06", title: "Subsidy Release", desc: "After government inspection and final approval, the subsidy is credited. You pay only 10% of the total system cost." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: "Certified APMIP Vendor", desc: "Officially approved by the AP government to supply and install systems under the APMIP micro-irrigation scheme." },
  { icon: FileText, title: "Paperwork Handled", desc: "We manage the full application process — documents, submissions and follow-ups — so you focus on farming." },
  { icon: ShieldCheck, title: "Genuine Jain Systems", desc: "All installed systems use certified Jain Irrigation components as required under the APMIP scheme specifications." },
  { icon: Zap, title: "Fast & Transparent", desc: "No hidden fees. We guide you through every stage and keep you updated until your subsidy is released." },
];

export default function ApmipSubsidyPage() {
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
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">APMIP Certified Vendor · West Godavari, AP</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">90% Government Subsidy on Drip Irrigation — Apply Now</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">Under the APMIP scheme, eligible farmers in Andhra Pradesh pay only 10% of the drip or sprinkler system cost. We're a certified vendor and handle everything — from application to installation.</p>
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
                <h2 className="font-display text-xl font-bold text-brand-green-deep">Check Your Eligibility</h2>
                <p className="mt-1 text-sm text-muted-foreground">Leave your details and we'll call you back to check if your land qualifies for the subsidy.</p>
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

      {/* PROCESS */}
      <Section>
        <Container>
          <SectionHeading eyebrow="How it works" title="From application to installation — we handle it" lead="Six straightforward steps. You provide the land and crop details; we do the rest." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-2xl font-extrabold text-brand-green/20 transition-colors group-hover:text-brand-green/40">{s.step}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{s.title}</h3>
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
          <SectionHeading eyebrow="Why choose us" title="The trusted APMIP partner in West Godavari" lead="We've helped thousands of farmers access the government subsidy — with zero paperwork hassle." align="center" />
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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light">Don't miss the subsidy</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">Find out if your land qualifies — call us now</h2>
            <p className="mt-4 text-lg text-white/75">Eligibility check is free. We'll confirm within minutes and guide you through the next steps.</p>
            <ContactActions showCall onDark size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
