import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stats } from "@/components/sections/stats";
import { LeadForm } from "@/components/sections/lead-form";
import { ContactActions } from "@/components/site/contact-actions";
import { StickyCallBar } from "@/components/site/sticky-call-bar";
import type { RequirementValue } from "@/lib/leads";

export interface LandingPageTemplateProps {
  badge: string;
  title: string;
  description: string;
  trustPoints: string[];
  products: { icon: LucideIcon; name: string; desc: string }[];
  whyReasons: { icon: LucideIcon; title: string; desc: string }[];
  ctaSubtitle: string;
  ctaTitle: string;
  ctaDesc: string;
  formTitle?: string;
  formDesc?: string;
  formRequirement?: RequirementValue;
  productsEyebrow?: string;
  productsTitle?: string;
  productsLead?: string;
  whyEyebrow?: string;
  whyTitle?: string;
  whyLead?: string;
}

export function LandingPageTemplate({
  badge,
  title,
  description,
  trustPoints,
  products,
  whyReasons,
  ctaSubtitle,
  ctaTitle,
  ctaDesc,
  formTitle = "Get a Free Quote",
  formDesc = "Tell us what you need and we'll give you the best price.",
  formRequirement,
  productsEyebrow = "What we supply",
  productsTitle = "Complete Systems",
  productsLead,
  whyEyebrow = "Why choose us",
  whyTitle = "Your reliable partner",
  whyLead,
}: LandingPageTemplateProps) {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-sunrise text-water-deep">
        <Container className="pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-24">
          {/* minmax(0,1fr) rather than 1fr — a bare 1fr track has min-width:auto,
              so a wide child (the form) can push the grid past the viewport. */}
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-water-deep/12 bg-white/70 px-4 py-1.5 text-sm font-medium backdrop-blur">{badge}</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-[clamp(1.875rem,6vw,3rem)] font-extrabold leading-[1.06] tracking-tight">{title}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-water-deep/70 sm:text-lg">{description}</p>
              </Reveal>
              <Reveal delay={240}>
                <ContactActions showCall size="xl" className="mt-7" />
              </Reveal>
              <Reveal delay={320}>
                <ul className="mt-7 space-y-2.5">
                  {trustPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-water-deep/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="sink-panel rounded-2xl p-5 text-foreground sm:p-6">
                <h2 className="font-display text-xl font-bold text-brand-green-deep">{formTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{formDesc}</p>
                <div className="mt-5">
                  <LeadForm defaultRequirement={formRequirement} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Stats />

      {/* PRODUCTS */}
      <Section tone="sky">
        <Container>
          <SectionHeading eyebrow={productsEyebrow} title={productsTitle} lead={productsLead} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className="group surface-card h-full rounded-2xl p-6">
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

      {/* WHY */}
      <Section tone="soil">
        <Container>
          <SectionHeading eyebrow={whyEyebrow} title={whyTitle} lead={whyLead} align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyReasons.map((w, i) => (
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
      <Section tone="brand-deep">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">{ctaSubtitle}</p>
            <h2 className="mt-3 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-bold leading-tight tracking-tight text-water-deep">{ctaTitle}</h2>
            <p className="mt-4 text-lg text-water-deep/70">{ctaDesc}</p>
            <ContactActions showCall size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
      <StickyCallBar />
    </>
  );
}
