import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Layers, Droplets, Wind, Settings2, Wrench, FlaskConical, Package, Award, BadgePercent, Clock } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { StickyCallBar } from "@/components/site/sticky-call-bar";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Farm Supplies & Irrigation Accessories in Eluru | Waterbase Technologies",
  description: "Farm shop in Eluru selling mulching film, drip tape, sprinkler heads, PVC fittings, venturi units and all irrigation accessories. Retail and wholesale. Open Mon–Sat 10 AM–7 PM.",
  path: "/farm-shop",
});

const TRUST_POINTS = [
  "Wide range of farm and irrigation accessories in stock",
  "Genuine brands — no duplicate or low-quality material",
  "Retail walk-in and wholesale bulk pricing",
  "Open Mon – Sat, 10:00 AM – 7:00 PM",
];

const PRODUCTS: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Layers, name: "Mulching Film & Sheets", desc: "Black, silver-black and transparent mulch in all widths. Retains soil moisture, controls weeds and improves yield." },
  { icon: Droplets, name: "Drip Tape / Paper Drip", desc: "Single-season drip tape for vegetables, chillies, tomatoes and row crops. Low-cost, high-efficiency watering." },
  { icon: Wind, name: "Sprinkler Heads & Risers", desc: "Micro-sprinklers, pop-up heads and rain gun nozzles. Replacement parts for all common brands available." },
  { icon: Settings2, name: "Drip Connectors & Accessories", desc: "Takeoffs, stakes, end caps, punch tools, joiners and repair sleeves — everything to maintain your drip system." },
  { icon: Wrench, name: "PVC Fittings & Valves", desc: "Elbows, tees, ball valves, foot valves and gate valves in all sizes. For pumps, pipes and irrigation networks." },
  { icon: FlaskConical, name: "Fertigation & Venturi Units", desc: "Inline venturi injectors and fertilizer tanks for water-soluble fertilizer application through your drip system." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Package, title: "Everything Under One Roof", desc: "Drip accessories, pipes, fittings, mulch, sprinklers and more — find everything your farm needs in one stop." },
  { icon: Award, title: "Genuine Brands Only", desc: "We stock only verified, ISI-marked and brand-certified products. No duplicates, no compromise on quality." },
  { icon: BadgePercent, title: "Retail & Wholesale", desc: "Single pieces for repairs or bulk lots for the season — pricing available for all order sizes." },
  { icon: Clock, title: "Open 6 Days a Week", desc: "Visit us Monday to Saturday, 10 AM to 7 PM. Our team is ready to help you pick the right product." },
];

export default function FarmShopPage() {
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
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-sm font-medium backdrop-blur-md">Farm Supplies · Eluru, AP</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl">Farm Accessories & Irrigation Supplies — Eluru</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">From mulching sheets and drip tape to PVC fittings, sprinkler heads and fertilizer applicators — everything your farm needs, available in our Eluru store. Retail and wholesale.</p>
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
                <h2 className="font-display text-xl font-bold text-brand-green-deep">Ask About Stock & Pricing</h2>
                <p className="mt-1 text-sm text-muted-foreground">Tell us what you need and we'll confirm availability and best price before your visit.</p>
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
          <SectionHeading eyebrow="What's in our store" title="Irrigation Accessories for Every Farm Need" lead="Stocked year-round for paddy, banana, vegetable, sugarcane and horticulture farmers across West Godavari." />
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
          <SectionHeading eyebrow="Why choose us" title="Eluru's trusted farm supply store" lead="Genuine products, honest pricing and a knowledgeable team — ready to help you pick exactly what your farm needs." align="center" />
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
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green-light md:text-[0.8125rem]"><span className="h-px w-6 bg-brand-green-light/60" aria-hidden="true" />Visit or call us</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl">Need farm supplies? We're open today</h2>
            <p className="mt-4 text-lg text-white/75">Call ahead to confirm stock or just walk in — Monday to Saturday, 10 AM to 7 PM, Kandrikagudem, Eluru.</p>
            <ContactActions showCall onDark size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
      <StickyCallBar />
    </main>
  );
}
