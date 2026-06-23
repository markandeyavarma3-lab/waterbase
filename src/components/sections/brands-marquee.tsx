import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/site/section";
import { listLogos, type Logo } from "@/lib/logos";

// Number of empty placeholder cards shown until real logos are added.
const PLACEHOLDER_COUNT = 12;

function LogoCard({ logo }: { logo: Logo }) {
  return (
    <div className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-card px-6 shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative h-14 w-full">
        <Image src={logo.src} alt={logo.name} fill sizes="180px" unoptimized className="object-contain" />
      </div>
    </div>
  );
}

function LogoRow({ logos, duration }: { logos: Logo[]; duration: string }) {
  // Duplicate once so the -50% marquee loops seamlessly.
  const items = [...logos, ...logos];
  return (
    <div className="group flex overflow-hidden">
      <div
        className="motion-marquee flex shrink-0 items-center gap-4 group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee-left ${duration} linear infinite` }}
      >
        {items.map((logo, i) => (
          <LogoCard key={i} logo={logo} />
        ))}
      </div>
    </div>
  );
}

const isJain = (l: Logo) => /jain/i.test(l.src) || /jain/i.test(l.name);

export function BrandsMarquee({ twoRows = false }: { twoRows?: boolean }) {
  const logos = listLogos("brands");
  const hasLogos = logos.length > 0;

  return (
    <section className="border-y border-border bg-background py-16">
      <Container>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Authorized Distributor &amp; Dealer</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">Genuine products from 20+ leading brands</h2>
        </div>
      </Container>

      <div className="relative mt-10 space-y-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" aria-hidden="true" />

        {!hasLogos ? (
          <div className="group flex overflow-hidden">
            <div className="motion-marquee flex shrink-0 items-center gap-4" style={{ animation: "marquee-left 45s linear infinite" }}>
              {Array.from({ length: PLACEHOLDER_COUNT * 2 }).map((_, i) => (
                <div key={i} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-dashed border-border bg-card text-border shadow-soft">
                  <ImageIcon className="h-7 w-7 text-foreground/15" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        ) : twoRows ? (
          <>
            <LogoRow logos={logos.filter(isJain)} duration="38s" />
            <LogoRow logos={logos.filter((l) => !isJain(l))} duration="46s" />
          </>
        ) : (
          <LogoRow logos={logos} duration="45s" />
        )}
      </div>
    </section>
  );
}
