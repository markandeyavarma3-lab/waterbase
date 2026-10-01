import { Section, Container, SectionHeading } from "@/components/site/section";
import dynamic from "next/dynamic";
import { listLogos, prioritizeLogos } from "@/lib/logos";

// Below the fold, client-only, and carries an autoplay timer — no reason for it
// to be in the initial bundle of every page that renders the homepage.
const CoverflowCarousel = dynamic(
  () => import("@/components/ui/coverflow-carousel").then((m) => m.CoverflowCarousel),
  { loading: () => <div className="h-72" aria-hidden="true" /> }
);

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
