import type { LucideIcon } from "lucide-react";
import { Award, ShieldCheck, Users, Map, BadgePercent, LifeBuoy } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { MediaSlot } from "@/components/site/media-slot";
import { siteConfig } from "@/lib/site-config";

const reasons: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Award, title: `${siteConfig.experienceYears} years of experience`, desc: "Irrigation for commercial sites and large farms across South India — on the same land, season after season." },
  { icon: ShieldCheck, title: "Authorised & genuine", desc: "Official dealer of Jain Irrigation, KSB and Netafim — manufacturer-backed product, no grey-market stock." },
  { icon: Users, title: "In-house delivery", desc: "20+ team, 15+ field technicians and dedicated install crews. We do not subcontract the work you hired us for." },
  { icon: BadgePercent, title: "APMIP subsidy desk", desc: "Certified vendor — we run the paperwork so eligible farms pay as little as 10% of system cost." },
  { icon: Map, title: "South India, plus project supply", desc: "Andhra Pradesh, Telangana, Karnataka and Odisha — pan-India for bulk and project orders." },
  { icon: LifeBuoy, title: "After-sales as standard", desc: "Maintenance and support written into how we work, not as an afterthought." },
];

export function WhyWaterbase() {
  return (
    <Section tone="sun">
      <Container>
        <SectionHeading eyebrow="Why Waterbase" title="One accountable partner" lead="Not a catalogue seller. We own the survey, the specification, the install and the years that follow." />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
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
