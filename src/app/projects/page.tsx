import { PageHero } from "@/components/site/page-hero";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Projects",
  description: "Irrigation projects delivered by Waterbase Technologies — from smallholder farms to large commercial developments across South India.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main>
      <PageHero eyebrow="Projects" title="Our irrigation projects" description="From smallholder farms to large commercial developments — work we're proud of across South India." />
      <Projects />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}