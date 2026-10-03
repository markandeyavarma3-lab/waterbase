import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/site/section";
import { listLogos, type Logo } from "@/lib/logos";
import { cn } from "@/lib/utils";
import { WaveTop } from "@/components/site/wave-divider";

// Number of empty placeholder cards shown until real logos are added.
const PLACEHOLDER_COUNT = 12;

type CardSize = "sm" | "lg" | "xl";

const CARD: Record<CardSize, { box: string; img: string; sizes: string }> = {
  sm: { box: "h-24 w-44 px-6", img: "h-14", sizes: "180px" },
  lg: { box: "h-44 w-80 px-10", img: "h-24", sizes: "320px" },
  xl: { box: "h-48 w-80 px-10 sm:h-52 sm:w-[22rem]", img: "h-28", sizes: "352px" },
};

/** Frosted glass card; the logo sits slightly muted and pops to full colour on hover. */
export function LogoCard({ logo, size = "sm" }: { logo: Logo; size?: CardSize }) {
  const c = CARD[size];
  return (
    <div className={cn("logo-glass group/logo flex shrink-0 items-center justify-center rounded-3xl", c.box)}>
      <div className={cn("relative w-full", c.img)}>
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes={c.sizes}
          className="object-contain opacity-80 grayscale-[85%] transition-[filter,opacity,transform] duration-500 group-hover/logo:scale-[1.04] group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
        />
      </div>
    </div>
  );
}

export function LogoRow({
  logos,
  duration,
  size = "sm",
  reverse = false,
}: {
  logos: Logo[];
  duration: string;
  size?: CardSize;
  reverse?: boolean;
}) {
  // Duplicate once so the -50% marquee loops seamlessly.
  const items = [...logos, ...logos];
  return (
    <div className="group flex overflow-hidden py-3">
      <div
        className="motion-marquee flex shrink-0 items-center gap-5 group-hover:[animation-play-state:paused]"
        style={{ animation: `${reverse ? "marquee-right" : "marquee-left"} ${duration} linear infinite` }}
      >
        {items.map((logo, i) => (
          <LogoCard key={i} logo={logo} size={size} />
        ))}
      </div>
    </div>
  );
}

export function BrandsMarquee({ twoRows = false }: { twoRows?: boolean }) {
  // Each row is controlled by a folder: drop a logo into row-1 or row-2.
  const row1 = listLogos("brands/row-1");
  const row2 = listLogos("brands/row-2");
  const logos = [...row1, ...row2];
  const hasLogos = logos.length > 0;

  return (
    <section className="wave-top relative isolate overflow-hidden tint-wash-plain py-16 md:pb-24 md:pt-32">
      <WaveTop />
      <Container>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Authorized Distributor &amp; Dealer</p>
          <h2 className="mt-3 font-display text-[clamp(1.375rem,3.6vw,1.875rem)] font-bold tracking-tight">Genuine products from 20+ leading brands</h2>
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
            <LogoRow logos={row1} duration="80s" size="lg" />
            <LogoRow logos={row2} duration="60s" reverse />
          </>
        ) : (
          <LogoRow logos={logos} duration="60s" />
        )}
      </div>
    </section>
  );
}
