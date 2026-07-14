import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}>{children}</div>;
}

type Tone = "default" | "muted" | "brand" | "brand-dark" | "brand-deep";

const toneClass: Record<Tone, string> = {
  default: "bg-background",
  muted: "bg-muted bg-mesh-warm",
  brand: "bg-brand-green-soft bg-mesh-cool",
  "brand-dark": "bg-brand-green-deep text-white",
  "brand-deep": "bg-brand-green-deeper text-white",
};

export function Section({ tone = "default", id, className, children }: { tone?: Tone; id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", toneClass[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, onDark = false, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={cn(
      "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm",
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
        {eyebrow ? <Eyebrow onDark={onDark} className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow> : null}
        <h2 className={cn(
          "mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance md:text-[2.65rem]",
          onDark ? "text-white" : "text-foreground",
          align === "center" && "heading-accent heading-accent-center"
        )}>{title}</h2>
        {lead ? <p className={cn("mt-4 text-lg leading-relaxed", onDark ? "text-white/80" : "text-muted-foreground")}>{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
