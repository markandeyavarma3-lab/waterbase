import type { Metadata } from "next";
import { Sprout, Ruler, Trees, BadgePercent, ShieldCheck, LifeBuoy, Award, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Agri Farms Irrigation",
  description: "Complete irrigation projects for small, mid, and large agricultural farms — survey, design, supply, installation and APMIP subsidy help.",
  path: "/services/agri-farms",
});

const farmSizes = [
  { icon: Sprout, title: "Small farms (up to 5 acres)", desc: "Drip systems for orchards, vegetables and nurseries — sized to your plot and budget, with room to expand later." },
  { icon: Ruler, title: "Mid-size farms (5–25 acres)", desc: "Combined drip and sprinkler systems designed around your soil, water source and crop mix for maximum yield per drop." },
  { icon: Trees, title: "Large estates (25+ acres)", desc: "Zone-based automated systems with filtration and fertigation, built for plantation crops, orchards and multi-crop farms." },
  { icon: BadgePercent, title: "APMIP subsidy farms", desc: "For eligible farmers in West Godavari — we handle the entire subsidy application alongside your system design and installation." },
];

const reasons = [
  { icon: ShieldCheck, title: "Survey before we quote", desc: "We visit your land, test your water source and design around your actual soil and crop — not a generic package." },
  { icon: Award, title: "Genuine, warranty-backed", desc: "Authorized Jain Irrigation, KSB and Netafim dealer — every component is genuine and covered." },
  { icon: LifeBuoy, title: "After-sales support", desc: "Maintenance and servicing after installation, so your system keeps performing for years, not just one season." },
];

export default function AgriFarmsPage() {
  return (
    <div className="theme-warm">
      <PageHero
        eyebrow="Services / Agri Farms"
        title="Irrigation for Every Farm Size"
        description="We design and execute complete irrigation systems tailored for small, mid, and large agricultural farms to maximize yield and save water."
      />

      <Section tone="default">
        <Container>
          <SectionHeading
            title="Sized to your land, not a one-size package"
            lead="Whether you're irrigating a one-acre nursery or a multi-crop estate, the design starts with a site visit — not a catalog."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {farmSizes.map((f) => (
              <StaggerItem key={f.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading align="center" eyebrow="Why farmers choose us" title="One team, from survey to harvest" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {reasons.map((r) => (
              <StaggerItem key={r.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand-green">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2">
            {["Drip & sprinkler design", "Soil & water survey", "Genuine Jain / Netafim parts", "APMIP paperwork handled", "Post-install servicing"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-brand-green" /> {t}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </div>
  );
}
