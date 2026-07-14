import { ShieldCheck, BadgeCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: ShieldCheck,
    title: "Authorized Dealer & Distributor",
    desc: "Official dealer of Jain Irrigation, KSB Pumps & Motors and Netafim FlexNet, plus 20+ leading brands.",
  },
  {
    icon: BadgeCheck,
    title: "Certified APMIP Vendor",
    desc: "Approved to supply and install systems under the Andhra Pradesh Micro Irrigation Project subsidy scheme.",
  },
  {
    icon: Award,
    title: "Genuine, Warranty-Backed",
    desc: "Only verified, brand-certified products — no duplicates — backed by manufacturer warranty.",
  },
  {
    icon: FileCheck,
    title: "Registered Proprietorship",
    desc: "An established, accountable local business serving farmers and companies across South India.",
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
        <Stagger className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {items.map((it, i) => (
              <StaggerItem key={it.title}>
                <div
                  className={cn(
                    "flex items-start gap-4 p-5 sm:items-center sm:gap-6 sm:p-6",
                    i !== items.length - 1 && "border-b border-border"
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite-300 text-graphite-700">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold">{it.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-brand-green/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-green-dark sm:inline-flex">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
