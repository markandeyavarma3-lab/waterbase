import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Layers, Package, Package2, Wrench, Link2, Settings2, Award, MapPin, BadgePercent, Truck } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { StickyCallBar } from "@/components/site/sticky-call-bar";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "HDPE & PVC Pipes Bulk Supply in Eluru | Waterbase Technologies",
  description: "Authorized pipe dealer in Eluru. HDPE mainline, PVC column pipes, borewell casing, GI pipes and fittings — retail and bulk pricing for farms, borewells and industries across AP.",
  path: "/heavy-pipes",
});

const TRUST_POINTS = [
  "ISI-marked genuine pipes — no duplicates or reprocessed material",
  "All sizes, pressure ratings and lengths in stock",
  "Bulk pricing for contractors and large orders",
  "Supply across AP, Telangana and nearby states",
];

const PRODUCTS: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Layers, name: "HDPE Pipes & Coils", desc: "Agriculture-grade and mainline HDPE in all diameters. UV-stabilized, pressure-rated, suitable for drip and field mains." },
  { icon: Package, name: "PVC Column Pipes", desc: "For borewell suction, delivery and domestic water lines. Available in multiple pressure classes and lengths." },
  { icon: Package2, name: "Borewell Casing Pipes", desc: "Slotted and plain casing in all wall thicknesses for shallow and deep borewells across all soil types." },
  { icon: Wrench, name: "GI & MS Pipes", desc: "For pump delivery lines, overhead tank systems and industrial water distribution. All sizes available." },
  { icon: Link2, name: "Pipe Fittings & Joints", desc: "Elbows, tees, reducers, couplings and bushings in PVC, HDPE and GI — all thread types and diameters." },
  { icon: Settings2, name: "Drip & Sprinkler Accessories", desc: "End caps, stakes, connectors, punch tools, inline valves and repair sleeves for drip and sprinkler systems." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: "Authorized & Genuine", desc: "ISI-marked, verified-quality pipes from recognized manufacturers. No reprocessed or duplicate material." },
  { icon: Package, title: "All Sizes in Stock", desc: "Wide range of diameters, pressure ratings and lengths available for immediate pickup or dispatch." },
  { icon: BadgePercent, title: "Bulk & Retail", desc: "Contractor pricing for large orders; single-piece available for farm repairs and small requirements." },
  { icon: Truck, title: "Local & Fast", desc: "Based in Eluru — quick supply with local delivery for urgent farm, borewell and construction needs." },
];

export default function HeavyPipesPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-green-deep text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="motion-aurora absolute -right-[8%] -top-[30%] h-[42vw] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(70,184,136,0.24),transparent_65%)] blur-3xl" style={{ animation: "aurora-1 24s ease-in-out infinite" }} />
          <div className="motion-aurora absolute -left-[10%] top-[12%] h-[36vw] w-[36vw] rounded-full bg-[radial-gradient(circle,rgba(20,136,194,0.2),transparent_65%)] blur-3xl" style={{ animation: "aurora-2 28s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />
        <Container className="py-16 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">

            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-sm font-medium backdrop-blur-md">Authorized Pipe Dealer · Eluru, AP</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl">HDPE, PVC & Casing Pipes — Bulk Supply in Eluru</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">We supply HDPE mainline, PVC column pipes, borewell casing, GI pipes and all fittings for farms, borewells, industries and construction — retail walk-in and contractor bulk pricing.</p>
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
                <h2 className="font-display text-xl font-bold text-brand-green-deep">Get a Quote</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us what you need and we'll give you the best price — retail or bulk.</p>
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
          <SectionHeading eyebrow="What we supply" title="Pipes & Fittings for Every Application" lead="From farm mainlines to borewell casings — all types, all sizes, genuine brands, ready to dispatch from Eluru." />
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
          <SectionHeading eyebrow="Why choose us" title="Your reliable pipe supplier in Eluru" lead="Genuine materials, competitive pricing and fast local availability — for farms, contractors and industries." align="center" />
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
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green-light md:text-[0.8125rem]"><span className="h-px w-6 bg-brand-green-light/60" aria-hidden="true" />Ready to order?</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl">Call us for pricing and availability</h2>
            <p className="mt-4 text-lg text-white/75">Walk in to our Eluru store or call now — bulk orders can be arranged for same-day dispatch.</p>
            <ContactActions showCall onDark size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
      <StickyCallBar />
    </main>
  );
}
