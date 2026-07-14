import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Product Supply",
  description: "We supply drip, sprinkler, pipes, pumps, filters and automation from 20+ leading brands.",
  path: "/services/product-supply",
});

export default function ProductSupplyPage() {
  return (
    <>
      <PageHero 
        eyebrow="Services / Product Supply" 
        title="Genuine Parts & Product Supply" 
        description="We don't just build systems; we are an authorized distributor supplying genuine parts from over 20 leading irrigation brands." 
      />

      <Section tone="default">
        <Container>
          <SectionHeading 
            title="Supply at Scale" 
            lead="Detailed content about your supply chain, bulk ordering, and retail services will go here. You can link this directly to your Products catalog." 
          />
          <div className="mt-12 flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card">
            <p className="text-sm font-medium text-muted-foreground">Content Placeholder for Product Supply</p>
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
