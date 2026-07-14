import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Commercial & Landscaping",
  description: "Irrigation solutions for factories, industries, nurseries, lawns, and gardens.",
  path: "/services/commercial",
});

export default function CommercialPage() {
  return (
    <>
      <PageHero 
        eyebrow="Services / Commercial" 
        title="Commercial & Landscaping Irrigation" 
        description="Professional irrigation for factories, industries, commercial nurseries, corporate lawns, and expansive gardens." 
      />

      <Section tone="default">
        <Container>
          <SectionHeading 
            title="Corporate & Industrial Scale" 
            lead="Detailed content and images for your Commercial irrigation services will go here. You can highlight landscape architecture, campus greening, and commercial nursery solutions." 
          />
          <div className="mt-12 flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card">
            <p className="text-sm font-medium text-muted-foreground">Content Placeholder for Commercial Services</p>
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
