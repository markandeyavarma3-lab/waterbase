import { ShieldCheck, BadgeCheck, Award, FileCheck } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";

const items = [
  {
    icon: ShieldCheck,
    title: "Authorized Dealer & Distributor",
    desc: "Official dealer of Jain Irrigation, KSB Pumps & Motors and Netafim FlexNet, plus 20+ leading brands.",
    tone: "text-brand-green bg-brand-green-soft group-hover:bg-brand-green",
  },
  {
    icon: BadgeCheck,
    title: "Certified APMIP Vendor",
    desc: "Approved to supply and install systems under the Andhra Pradesh Micro Irrigation Project subsidy scheme.",
    tone: "text-brand-blue bg-brand-blue-soft group-hover:bg-brand-blue",
  },
  {
    icon: Award,
    title: "Genuine, Warranty-Backed",
    desc: "Only verified, brand-certified products — no duplicates — backed by manufacturer warranty.",
    tone: "text-brand-sun-dark bg-brand-sun-soft group-hover:bg-brand-sun",
  },
  {
    icon: FileCheck,
    title: "Registered Proprietorship",
    desc: "An established, accountable local business serving farmers and companies across South India.",
    tone: "text-brand-soil-dark bg-brand-soil-soft group-hover:bg-brand-soil",
  },
];

export function Credentials() {
  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Credentials"
          title="Authorized, certified & accountable"
          lead="Every claim we make is backed by real authorization. Certificates and dealer authorization letters are available on request."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <StaggerItem key={it.title}>
              <InteractiveCard className="p-6">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${it.tone}`}>
                  <it.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
