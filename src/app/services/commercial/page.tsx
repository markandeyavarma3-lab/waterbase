import type { Metadata } from "next";
import { Building2, Sprout, Trees, Landmark, ShieldCheck, Clock, Award, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Commercial & Landscaping",
  description: "Irrigation solutions for factories, industries, nurseries, corporate lawns, and gardens across South India.",
  path: "/services/commercial",
});

const segments = [
  { icon: Building2, title: "Factories & industrial campuses", desc: "Green-belt and process-area irrigation designed to run unattended alongside your facility's own schedule." },
  { icon: Trees, title: "Corporate lawns & landscapes", desc: "Automated sprinkler and drip systems for office campuses and grounds, built for a clean, consistent look with minimal upkeep." },
  { icon: Sprout, title: "Commercial nurseries", desc: "Precise misting and drip for high-density plant beds and greenhouses, where over- or under-watering costs you stock." },
  { icon: Landmark, title: "Resorts & public spaces", desc: "Large-area coverage for hospitality and public green spaces, engineered for reliability with low day-to-day maintenance." },
];

const reasons = [
  { icon: ShieldCheck, title: "One point of contact", desc: "Survey, design, supply and installation from a single accountable team — no coordinating between multiple vendors." },
  { icon: Clock, title: "Minimal site disruption", desc: "Installation planned around your working hours, so operations continue while the system goes in." },
  { icon: Award, title: "Genuine, branded components", desc: "Authorized dealer of Jain Irrigation, KSB and Netafim — the same standard we use on large agricultural projects." },
];

export default function CommercialPage() {
  return (
    <div className="theme-warm">
      <PageHero
        eyebrow="Services / Commercial"
        title="Commercial & Landscaping Irrigation"
        description="Professional irrigation for factories, industries, commercial nurseries, corporate lawns, and expansive gardens."
      />

      <Section tone="default">
        <Container>
          <SectionHeading
            title="Built for places where downtime isn't an option"
            lead="Commercial sites need irrigation that runs reliably in the background — not something that needs daily attention."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {segments.map((s) => (
              <StaggerItem key={s.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-blue">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading align="center" eyebrow="Why businesses choose us" title="A partner you don't have to manage" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {reasons.map((r) => (
              <StaggerItem key={r.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand-blue">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2">
            {["Site survey & design", "Automated scheduling", "Genuine branded parts", "Scheduled maintenance", "AP / TG / KA / OD coverage"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-brand-blue" /> {t}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </div>
  );
}
