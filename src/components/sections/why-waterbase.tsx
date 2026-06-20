import { Award, ShieldCheck, Users, Map, BadgePercent, LifeBuoy } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
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
    <Section tone="default">
      <Container>
        <SectionHeading align="center" eyebrow="Why Waterbase" title="One accountable partner, end to end" lead="Not just a supplier — we own the entire journey, from the first survey to long-term support." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 70} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
                {/* corner glow on hover */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-green-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{r.title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
