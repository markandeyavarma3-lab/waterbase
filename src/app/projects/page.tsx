import { PageHero } from "@/components/site/page-hero";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";
import { BeforeAfter } from "@/components/sections/before-after";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Projects",
  description: "Irrigation projects delivered by Waterbase Technologies — from smallholder farms to large commercial developments across South India.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Our irrigation projects" description="From smallholder farms to large commercial developments — work we're proud of across South India." />
      <Projects />

      <Section tone="muted">
        <Container>
          <SectionHeading eyebrow="See the difference" title="Before & after — the Waterbase effect" lead="Drag the slider to compare a field before and after our drip irrigation system was installed." />
          <div className="mx-auto mt-10 max-w-3xl">
            <BeforeAfter
              beforeSrc="/images/projects/before-field.jpg"
              afterSrc="/images/projects/after-field.jpg"
              beforeLabel="Before"
              afterLabel="After"
              alt="Farm field before and after drip irrigation installation"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">West Godavari banana farm — installed 2023 · 12 acres · Jain inline drip system</p>
          </div>
        </Container>
      </Section>

      <Testimonials />
      <ContactCTA />
    </>
  );
}
