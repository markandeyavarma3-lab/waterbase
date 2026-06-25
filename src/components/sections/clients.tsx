import Image from "next/image";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { listLogos } from "@/lib/logos";

// Drop company logos (PNG/JPG with transparent or white background, ~400x160)
// into /public/clients/ — they appear automatically in the scrolling list.
export function Clients() {
  const clients = listLogos("clients");
  if (clients.length === 0) return null;

  // Duplicate once so the -50% marquee loops seamlessly.
  const items = [...clients, ...clients];

  return (
    <Section tone="default">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our work"
          title="Companies we've delivered for"
          lead="Irrigation and water-management projects completed on time — and backed by years of after-sales support, with not a single complaint to date."
        />
      </Container>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" aria-hidden="true" />

        <div className="group flex overflow-hidden">
          <div
            className="motion-marquee flex shrink-0 items-stretch gap-5 group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee-left 40s linear infinite" }}
          >
            {items.map((c, i) => (
              <div key={i} className="flex h-36 w-56 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 shadow-soft transition-shadow hover:shadow-lift">
                <div className="relative h-16 w-full">
                  <Image src={c.src} alt={c.name} fill sizes="200px" unoptimized className="object-contain" />
                </div>
                <span className="text-center text-sm font-semibold text-foreground/80">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
