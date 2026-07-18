import { Section, Container, SectionHeading } from "@/components/site/section";
import { listLogos } from "@/lib/logos";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

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
