import type { Metadata } from "next";
import { Package, Ruler, Wrench, Workflow, Building2, Sprout, BadgePercent, Award, ShieldCheck, Users, Map, LifeBuoy, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading, Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Process } from "@/components/sections/process";
import { ContactActions } from "@/components/site/contact-actions";
import { pageMeta } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = pageMeta({
  title: "Irrigation Services",
  description:
    "End-to-end irrigation services — survey, design, installation, project execution, maintenance and APMIP subsidy assistance across Andhra Pradesh, Telangana, Karnataka and Odisha.",
  path: "/services",
});

const solutions = [
  { icon: Package, title: "Product supply", desc: "Drip, sprinkler, pipes, pumps, filters and automation from 20+ leading brands." },
  { icon: Ruler, title: "Survey & design", desc: "Field survey, hydraulic planning and complete irrigation system design." },
  { icon: Wrench, title: "Installation", desc: "Professional installation by trained field teams and technicians." },
  { icon: Workflow, title: "Project execution", desc: "End-to-end execution of farm and commercial irrigation projects." },
  { icon: Building2, title: "Corporate & landscape", desc: "Landscape and campus irrigation for industries, resorts and corporates." },
  { icon: Sprout, title: "Nursery irrigation", desc: "Specialised micro-irrigation systems for nurseries and plantations." },
  { icon: BadgePercent, title: "APMIP subsidy", desc: "End-to-end help with APMIP subsidy irrigation work in West Godavari." },
];

const scope = [
  "Survey & planning",
  "System design",
  "Installation",
  "Farm irrigation projects",
  "Corporate & industrial landscaping",
  "Nursery irrigation systems",
  "Commercial irrigation projects",
  "Water management solutions",
  "APMIP subsidy assistance",
  "Maintenance & support",
];

const team = [
  { value: "20+", label: "Team members" },
  { value: "15+", label: "Field technicians" },
  { value: "5+", label: "Installation teams" },
];

const reasons = [
  { icon: Award, title: `${siteConfig.experienceYears} years of experience`, desc: `Serving farmers and businesses since ${siteConfig.since} with proven, reliable irrigation work.` },
  { icon: ShieldCheck, title: "Authorized & genuine", desc: "Official dealer of Jain Irrigation, KSB and Netafim — genuine products with warranty." },
  { icon: Users, title: "Skilled in-house team", desc: "20+ team members, 15+ field technicians and 5+ dedicated installation teams." },
  { icon: BadgePercent, title: "APMIP subsidy expertise", desc: "End-to-end assistance with subsidy-based micro-irrigation in West Godavari." },
  { icon: Map, title: "Wide service reach", desc: "Supply across AP, Telangana, Karnataka and Odisha; pan-India for larger orders." },
  { icon: LifeBuoy, title: "After-sales support", desc: "Maintenance and ongoing support to keep your system running at its best." },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero eyebrow="Services" title="End-to-end irrigation services, from survey to support" description="One accountable team for the whole project — we survey, design, supply, install and maintain irrigation for fields, lawns and nurseries, and handle APMIP subsidy work too." />

      <Section tone="default">
        <Container>
          <SectionHeading eyebrow="What we do" title="Complete solutions, not just products" lead="From the first survey to the final installation and subsidy paperwork, we handle every part of your irrigation project." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.title} delay={i * 70} className="h-full">
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white"><s.icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <Eyebrow>Full service scope</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-[2.5rem]">Handled by an experienced in-house team</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">We take projects from concept to commissioning — and keep them running for years afterwards.</p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {team.map((t) => (
                    <div key={t.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
                      <p className="font-display text-2xl font-extrabold text-brand-green md:text-3xl">{t.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{t.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={200}>
                <Button asChild size="lg" className="mt-8"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Talk to our team</a></Button>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                <ul className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {scope.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                      <span className="text-sm font-medium text-foreground/90">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>How we work</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-[2.5rem]">Nine steps, one accountable team</h2>
              <p className="mt-3 text-muted-foreground">No hand-offs, no finger-pointing. Every stage — from understanding your land to servicing it years later — is handled in-house.</p>
            </div>
          </Reveal>
          <Process />
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading align="center" eyebrow="Why choose us" title="A partner you can rely on" lead="Not just a supplier — a complete irrigation partner from planning to long-term support." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 70} className="h-full">
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white"><r.icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="brand-dark">
        <Container>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">Ready to plan your irrigation?</h2>
              <p className="mt-2 max-w-xl text-white/80">Tell us about your land and we&apos;ll recommend the right system.</p>
            </div>
            <ContactActions onDark className="shrink-0" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
