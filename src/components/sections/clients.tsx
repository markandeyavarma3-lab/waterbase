import { Section, Container, SectionHeading } from "@/components/site/section";
import { listLogos, prioritizeLogos } from "@/lib/logos";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

const CLIENT_LEAD = ["reliance", "godrej", "patanjali"];

export function Clients() {
  const clients = prioritizeLogos(listLogos("clients"), CLIENT_LEAD);
  if (clients.length === 0) return null;

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our work"
          title="Companies we've delivered for"
          lead="Commercial and estate-scale irrigation — delivered on programme, with after-sales that lasts."
        />
      </Container>

      <div className="mt-12">
        <CoverflowCarousel items={clients} />
      </div>
    </Section>
  );
}
