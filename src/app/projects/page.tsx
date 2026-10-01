import { PageHero } from "@/components/site/page-hero";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";
import dynamic from "next/dynamic";

const BeforeAfter = dynamic(
  () => import("@/components/sections/before-after").then((m) => m.BeforeAfter),
  { loading: () => <div className="aspect-video w-full rounded-2xl bg-muted" aria-hidden="true" /> }
);
import { Section, Container, SectionHeading } from "@/components/site/section";
import { pageMeta } from "@/lib/seo";
import { publicFileExists } from "@/lib/logos";

export const metadata = pageMeta({
  title: "Projects",
  description: "Irrigation projects delivered by Waterbase Technologies — from smallholder farms to large commercial developments across South India.",
  path: "/projects",
});

const BEFORE = "/images/projects/before-field.jpg";
const AFTER = "/images/projects/after-field.jpg";

export default function ProjectsPage() {
  const hasBeforeAfter = publicFileExists(BEFORE) && publicFileExists(AFTER);
  return (
    <div className="theme-warm">
      <PageHero eyebrow="Projects" title="Selected irrigation work" description="Commercial landscapes and large-farm systems across South India — delivery you can inspect on site." />
      <Projects />

      {/* Rendered only when both photos exist — a comparison slider with a
          missing side is worse than no section at all. */}
      {hasBeforeAfter ? (
        <Section tone="muted">
          <Container>
            <SectionHeading eyebrow="See the difference" title="Before & after — the Waterbase effect" lead="Drag the slider to compare a field before and after our drip irrigation system was installed." />
            <div className="mx-auto mt-10 max-w-3xl">
              <BeforeAfter
                beforeSrc={BEFORE}
                afterSrc={AFTER}
                beforeLabel="Before"
                afterLabel="After"
                alt="Farm field before and after drip irrigation installation"
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <Testimonials />
      <ContactCTA />
    </div>
  );
}
