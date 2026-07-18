import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, Workflow, Gauge, Package, Truck, Store, Award, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Button } from "@/components/ui/button";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Product Supply",
  description: "We supply drip, sprinkler, pipes, pumps, filters and automation from 20+ leading brands.",
  path: "/services/product-supply",
});

const categories = [
  { icon: Droplets, title: "Drip & sprinkler systems", desc: "Inline and online drippers, micro-sprinklers, rainguns and complete field-ready kits." },
  { icon: Workflow, title: "Pipes & fittings", desc: "PVC, PE, hose and column pipes with matching fittings for mainlines, sub-mains and borewells." },
  { icon: Gauge, title: "Pumps & automation", desc: "Submersible, monoblock and open-well pumps, plus starters, panels and filtration." },
];

const supplyModes = [
  { icon: Package, title: "Project supply", desc: "Full bill of materials sourced and delivered as part of a design-and-install project — one invoice, one team." },
  { icon: Truck, title: "Bulk & wholesale", desc: "Contractor and dealer pricing on large orders, delivered across Andhra Pradesh, Telangana, Karnataka and Odisha." },
  { icon: Store, title: "Farm shop, Eluru", desc: "Walk in and buy directly — parts, fittings and accessories in stock for immediate pickup." },
];

export default function ProductSupplyPage() {
  return (
    <div className="theme-warm">
      <PageHero
        eyebrow="Services / Product Supply"
        title="Genuine Parts & Product Supply"
        description="We don't just build systems; we are an authorized distributor supplying genuine parts from over 20 leading irrigation brands."
      />

      <Section tone="default">
        <Container>
          <SectionHeading
            eyebrow="What we stock"
            title="Every component for a working system"
            lead="From a single dripper to a full project's bill of materials — genuine, warranty-backed stock, not duplicates."
            action={<Button asChild variant="outline"><Link href="/products">Browse the full catalog <ArrowRight className="h-4 w-4" /></Link></Button>}
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {categories.map((c) => (
              <StaggerItem key={c.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold transition-colors group-hover:text-brand-green">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading align="center" eyebrow="How you can buy" title="Whichever way suits your order" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {supplyModes.map((m) => (
              <StaggerItem key={m.title}>
                <InteractiveCard className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sun-soft text-brand-sun-dark transition-colors duration-300 group-hover:bg-brand-sun group-hover:text-white">
                    <m.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand-sun-dark">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 shrink-0 text-brand-green" />
            Authorized dealer of Jain Irrigation, KSB Pumps &amp; Motors and Netafim FlexNet, plus 20+ other leading brands.
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </div>
  );
}
