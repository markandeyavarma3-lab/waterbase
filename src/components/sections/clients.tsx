import { Section, Container, SectionHeading } from "@/components/site/section";
import { listLogos } from "@/lib/logos";
import dynamic from "next/dynamic";

// Below the fold, client-only, and carries an autoplay timer — no reason for it
// to be in the initial bundle of every page that renders the homepage.
const CoverflowCarousel = dynamic(
  () => import("@/components/ui/coverflow-carousel").then((m) => m.CoverflowCarousel),
  { loading: () => <div className="h-72" aria-hidden="true" /> }
);

export function Clients() {
  const clients = listLogos("clients");
  if (clients.length === 0) return null;

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our work"
          title="Companies we've delivered for"
          lead="Irrigation and water-management projects completed on time — backed by years of after-sales support."
        />
      </Container>

      <div className="mt-12">
        <CoverflowCarousel items={clients} />
      </div>
    </Section>
  );
}
