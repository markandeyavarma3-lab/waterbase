import { Award, ShieldCheck, Users, Map, BadgePercent, LifeBuoy } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { siteConfig } from "@/lib/site-config";

const reasons = [
  { icon: Award, title: `${siteConfig.experienceYears} years of experience`, desc: "Proven, reliable irrigation work for farmers and businesses — with not a single complaint to date." },
  { icon: ShieldCheck, title: "Authorized & genuine", desc: "Official dealer of Jain Irrigation, KSB and Netafim — genuine products with manufacturer warranty." },
  { icon: Users, title: "Skilled in-house team", desc: "20+ team members, 15+ field technicians and 5+ dedicated installation teams — no subcontracting." },
  { icon: BadgePercent, title: "APMIP subsidy experts", desc: "Certified vendor — we handle the full subsidy process so eligible farmers pay as little as 10%." },
  { icon: Map, title: "Wide service reach", desc: "Across Andhra Pradesh, Telangana, Karnataka and Odisha — and pan-India for bulk and project orders." },
  { icon: LifeBuoy, title: "Lifelong after-sales", desc: "Maintenance and ongoing support to keep your system running at its best for years." },
];

export function WhyWaterbase() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading align="center" eyebrow="Why Waterbase" title="One accountable partner, end to end" lead="Not just a supplier — we own the entire journey, from the first survey to long-term support." />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <InteractiveCard className="p-6">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{r.title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
