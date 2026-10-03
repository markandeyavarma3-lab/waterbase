import { Section, Container, SectionHeading } from "@/components/site/section";
import { LogoRow } from "@/components/sections/brands-marquee";
import { listLogos, prioritizeLogos } from "@/lib/logos";

const CLIENT_LEAD = ["reliance", "godrej", "patanjali"];

export function Clients() {
  const clients = prioritizeLogos(listLogos("clients"), CLIENT_LEAD);
  if (clients.length === 0) return null;

  // Deliberately slow: ~14s per logo, never faster than a 2-minute loop.
  const duration = `${Math.max(120, clients.length * 14)}s`;

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

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" aria-hidden="true" />
        <LogoRow logos={clients} duration={duration} size="xl" />
      </div>
    </Section>
  );
}
