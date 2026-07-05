import { Award, ShieldCheck, Users, Map, BadgePercent, LifeBuoy } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { siteConfig } from "@/lib/site-config";

const reasons = [
  { icon: Award, title: `${siteConfig.experienceYears} years of experience`, desc: `Serving farmers and businesses for over 25 years with proven, reliable irrigation work.` },
  { icon: ShieldCheck, title: "Authorized & genuine", desc: "Official dealer of Jain Irrigation, KSB and Netafim — genuine products with warranty." },
  { icon: Users, title: "Skilled in-house team", desc: "20+ team members, 15+ field technicians and 5+ dedicated installation teams." },
  { icon: BadgePercent, title: "APMIP subsidy expertise", desc: "End-to-end assistance with subsidy-based micro-irrigation in West Godavari." },
  { icon: Map, title: "Wide service reach", desc: "Supply across AP, Telangana, Karnataka & Odisha; pan-India for larger orders." },
  { icon: LifeBuoy, title: "After-sales support", desc: "Maintenance and ongoing support to keep your system running at its best." },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green md:text-sm">Why choose us</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-[2.5rem]">A partner you can rely on</h2>
        <p className="mt-3 text-muted-foreground">Not just a supplier — a complete irrigation partner from planning to long-term support.</p>
      </Reveal>
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <StaggerItem key={r.title}>
            <InteractiveCard className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                <r.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </InteractiveCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}