import type { Metadata } from "next";
import { Package, Ruler, Wrench, Workflow, Building2, Sprout, BadgePercent, Award, ShieldCheck, Users, Map, LifeBuoy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading, Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Process } from "@/components/sections/process";
import { ContactActions } from "@/components/site/contact-actions";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { pageMeta } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = pageMeta({
  title: "Irrigation Services",
  description:
    "End-to-end irrigation services — survey, design, installation, project execution, maintenance and APMIP subsidy assistance across Andhra Pradesh, Telangana, Karnataka and Odisha.",
  path: "/services",
});

const solutions = [
  {
    icon: Workflow,
    title: "Complete Irrigation Projects",
    desc: "End-to-end irrigation execution from survey to commissioning.",
    links: [
      { name: "Agri Farms (Small, Mid, Large)", href: "/services/agri-farms" },
      { name: "Commercial (Factories, Nurseries, Lawns)", href: "/services/commercial" },
      { name: "View Our Past Projects", href: "/projects" },
    ],
  },
  {
    icon: Package,
    title: "Product Supply",
    desc: "We supply drip, sprinkler, pipes, pumps, filters and automation from 20+ leading brands.",
    links: [
      { name: "Learn About Product Supply", href: "/services/product-supply" },
    ],
  },
  {
    icon: BadgePercent,
    title: "APMIP Services",
    desc: "End-to-end assistance with APMIP subsidy irrigation work in West Godavari.",
    links: [
      { name: "APMIP Subsidy Assistance", href: "/apmip-subsidy" },
    ],
  },
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
  { icon: Award, title: `${siteConfig.experienceYears} years of experience`, desc: `Serving farmers and businesses for over 25 years with proven, reliable irrigation work.` },
  { icon: ShieldCheck, title: "Authorized & genuine", desc: "Official dealer of Jain Irrigation, KSB and Netafim — genuine products with warranty." },
  { icon: Users, title: "Skilled in-house team", desc: "20+ team members, 15+ field technicians and 5+ dedicated installation teams." },
  { icon: BadgePercent, title: "APMIP subsidy expertise", desc: "End-to-end assistance with subsidy-based micro-irrigation in West Godavari." },
  { icon: Map, title: "Wide service reach", desc: "Supply across AP, Telangana, Karnataka and Odisha; pan-India for larger orders." },
  { icon: LifeBuoy, title: "After-sales support", desc: "Maintenance and ongoing support to keep your system running at its best." },
];

export default function ServicesPage() {
  return (
    <div className="theme-warm">
      <PageHero eyebrow="Services" title="Our Core Services" description="We organize our expertise into three main areas: Complete Irrigation Projects (for farms and commercial spaces), Product Supply, and APMIP Subsidy services." />

      <Section tone="sky">
        <Container>
          <SectionHeading eyebrow="What we do" title="Complete solutions, not just products" lead="From the first survey to the final installation and subsidy paperwork, we handle every part of your irrigation project." />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {solutions.map((s) => (
              <StaggerItem key={s.title}>
                <InteractiveCard className="flex h-full flex-col p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white"><s.icon className="h-6 w-6" /></span>
                  <h3 className="mt-6 font-display text-xl font-semibold transition-colors group-hover:text-brand-green">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.desc}</p>
                  
                  {/* tap-target-y: these link rows were 20px tall — hard to hit with a
                      thumb. The hit area grows on touch; desktop spacing is unchanged. */}
                  <div className="mt-6 flex flex-col gap-2 border-t border-border/50 pt-6">
                    {s.links.map((link, idx) => (
                      <a key={idx} href={link.href} className="tap-target-y flex items-center text-sm font-medium text-brand-green hover:text-brand-green-dark hover:underline">
                        → {link.name}
                      </a>
                    ))}
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="field">
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
                    <div key={t.label} className="surface-card rounded-2xl p-4 text-center">
                      <p className="font-display text-2xl font-extrabold text-brand-green md:text-3xl">{t.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{t.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={200}>
                <Button asChild size="lg" className="mt-8"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5" /> Talk to our team</a></Button>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="surface-card rounded-2xl p-6 md:p-8">
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

      <Section tone="soil">
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

      <Section tone="sun">
        <Container>
          <SectionHeading align="center" eyebrow="Why choose us" title="A partner you can rely on" lead="Not just a supplier — a complete irrigation partner from planning to long-term support." />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <StaggerItem key={r.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white"><r.icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="brand-deep">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Start your project</p>
            <h2 className="mt-3 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-bold leading-tight tracking-tight text-water-deep">Ready to plan your irrigation?</h2>
            <p className="mt-4 text-lg text-water-deep/70">Tell us about your land and we&apos;ll recommend the right system — and help you access any available government subsidy.</p>
            <ContactActions size="xl" className="mt-7 justify-center" />
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
