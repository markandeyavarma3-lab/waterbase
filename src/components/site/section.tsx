import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { AuroraGlow } from "@/components/site/aurora-glow";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  // px-4 on small phones (not px-6) — on a 320px screen that returns 16px of
  // content width, which is the difference between a cramped and a readable line.
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8", className)}>{children}</div>;
}

/**
 * Section tones. The four light tints are the elements this business works in —
 * water, crop, earth, early light — and pages alternate through them so
 * scrolling moves through the same story the hero gradient tells.
 *
 * They are all at 97-99% lightness deliberately. You should register a change of
 * TEMPERATURE between sections, not a change of colour; anything stronger turns
 * a page into a stack of coloured blocks, which is the opposite of premium.
 * White cards on any of these still read as white and lift cleanly.
 *
 * `muted` and `brand` are kept as aliases so the existing pages keep working.
 */
type Tone =
  | "default" | "sky" | "field" | "soil" | "sun"
  | "muted" | "brand"
  | "brand-dark" | "brand-deep";

/**
 * Each tone also sets a `tone-*` class. That does not paint anything itself —
 * it declares the --card-edge / --card-cast / --card-wash variables that
 * `.surface-card` descendants inherit, so a card's border, shadow and faint
 * fill gradient all pick up the hue of whatever section it happens to sit in,
 * without any card needing to know where it is.
 *
 * The `tint-wash-*` classes are gradients, not flat fills — see globals.css.
 * No section on the site should ever resolve to a single solid colour.
 */
const toneClass: Record<Tone, string> = {
  default: "tint-wash-plain tone-plain",
  sky: "tint-wash-sky tone-sky",
  field: "tint-wash-field tone-field",
  soil: "tint-wash-soil tone-soil",
  sun: "tint-wash-sun tone-sun",
  // back-compat aliases
  muted: "tint-wash-sky tone-sky",
  brand: "tint-wash-field tone-field",
  // dark sections keep their weight, for rhythm against all of the above —
  // but still settle from deep teal toward an even deeper edge, not one slab
  "brand-dark": "tint-wash-dark text-white tone-plain",
  "brand-deep": "tint-wash-darker text-white tone-plain",
};

/** Which ambient AuroraGlow blobs belong to each tone, so every section gets
 *  matching movement automatically instead of pages remembering to add it. */
const glowVariant: Record<Tone, "sky" | "field" | "soil" | "sun" | "plain" | "dark-teal" | "dark-converge"> = {
  default: "plain",
  sky: "sky",
  field: "field",
  soil: "soil",
  sun: "sun",
  muted: "sky",
  brand: "field",
  "brand-dark": "dark-teal",
  "brand-deep": "dark-converge",
};

export function Section({ tone = "default", id, className, children }: { tone?: Tone; id?: string; className?: string; children: ReactNode }) {
  return (
    // `isolate` makes this element form a stacking context, so decorative layers
    // placed at -z-10 (AuroraGlow and friends) paint ABOVE this section's own
    // tone background rather than behind it. Without it they were drawn under
    // the fill and were invisible everywhere on the site. `overflow-hidden` is
    // baked in here (not left to callers) because every section now carries
    // its own ambient glow blobs, which bleed past the edge by design.
    <section id={id} className={cn("relative isolate overflow-hidden py-14 sm:py-20 md:py-28", toneClass[tone], className)}>
      <AuroraGlow variant={glowVariant[tone]} />
      {children}
    </section>
  );
}

export function Eyebrow({ children, onDark = false, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    // `flex w-fit`, NOT inline-flex. When a centered SectionHeading applies
    // .heading-accent (display:inline-block) to the h2, an inline-level eyebrow
    // shares a line with the heading and the two overlap. Block-level here,
    // w-fit so it still hugs its text.
    <p className={cn(
      "flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm",
      onDark ? "text-brand-green-light" : "text-brand-green",
      className
    )}>
      <span className={cn("h-px w-6", onDark ? "bg-brand-green-light/60" : "bg-brand-green/40")} aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, lead, align = "left", onDark = false, action, className }: { eyebrow?: ReactNode; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; onDark?: boolean; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", action && "md:flex-row md:items-end md:justify-between md:gap-10", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {/* mx-auto (not justify-center) now that Eyebrow is `w-fit`: it hugs its
            text, so it has to be centred by margin rather than by justification. */}
        {eyebrow ? <Eyebrow onDark={onDark} className={align === "center" ? "mx-auto" : undefined}>{eyebrow}</Eyebrow> : null}
        {/* Fluid size: scales continuously between phone and desktop instead of
            snapping at the md breakpoint, which is what made tablet widths look off. */}
        <h2 className={cn(
          "mt-4 font-display text-[clamp(1.625rem,4.4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-balance",
          onDark ? "text-white" : "text-foreground",
          align === "center" && "heading-accent heading-accent-center"
        )}>{title}</h2>
        {lead ? <p className={cn("mt-4 text-lg leading-relaxed", onDark ? "text-white/80" : "text-muted-foreground")}>{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
