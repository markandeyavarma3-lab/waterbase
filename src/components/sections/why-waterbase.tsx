import type { LucideIcon } from "lucide-react";
import { Award, ShieldCheck, Users, Map, BadgePercent, LifeBuoy } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { MediaSlot } from "@/components/site/media-slot";
import { siteConfig } from "@/lib/site-config";

const reasons: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: `${siteConfig.experienceYears} years of experience`, desc: "Proven, reliable irrigation work for farmers and businesses across South India, season after season." },
  { icon: ShieldCheck, title: "Authorized & genuine", desc: "Official dealer of Jain Irrigation, KSB and Netafim — genuine products with manufacturer warranty." },
  { icon: Users, title: "Skilled in-house team", desc: "20+ team members, 15+ field technicians and 5+ dedicated installation teams — no subcontracting." },
  { icon: BadgePercent, title: "APMIP subsidy experts", desc: "Certified vendor — we handle the full subsidy process so eligible farmers pay as little as 10%." },
  { icon: Map, title: "Wide service reach", desc: "Across Andhra Pradesh, Telangana, Karnataka and Odisha — and pan-India for bulk and project orders." },
  { icon: LifeBuoy, title: "Lifelong after-sales", desc: "Maintenance and ongoing support to keep your system running at its best for years." },
];

export function WhyWaterbase() {
  return (
    <Section tone="muted" className="relative overflow-hidden">
      <AuroraGlow variant="cool" />
      <Container>
        <SectionHeading eyebrow="Why Waterbase" title="One accountable partner, end to end" lead="Not just a supplier — we own the entire journey, from the first survey to long-term support." />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <ol>
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <li className="flex items-start gap-6 border-b border-border py-6 first:pt-0 last:border-b-0 last:pb-0">
                  <span className="w-10 shrink-0 font-display text-3xl font-extrabold tracking-tight tabular-nums text-graphite-300 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <r.icon className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                      <h3 className="font-display text-base font-semibold sm:text-lg">{r.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="lg:sticky lg:top-24 lg:self-start">
            <MediaSlot
              src="/images/hero.jpg"
              alt="Sprinkler irrigation system watering a field"
              ratio="tall"
              label="Field installation"
              className="shadow-lift"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
