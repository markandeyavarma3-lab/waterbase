import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Agri Farms Irrigation",
  description: "Complete irrigation projects for small, mid, and large agricultural farms.",
  path: "/services/agri-farms",
});

export default function AgriFarmsPage() {
  return (
    <>
      <PageHero 
        eyebrow="Services / Agri Farms" 
        title="Irrigation for Every Farm Size" 
        description="We design and execute complete irrigation systems tailored for small, mid, and large agricultural farms to maximize yield and save water." 
      />

      <Section tone="default">
        <Container>
          <SectionHeading 
            title="Premium Agricultural Solutions" 
            lead="Detailed content and images for your Agricultural Farm irrigation services will go here. You can add project case studies, specific technologies used, and client testimonials." 
          />
          <div className="mt-12 flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card">
            <p className="text-sm font-medium text-muted-foreground">Content Placeholder for Agri Farms</p>
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
