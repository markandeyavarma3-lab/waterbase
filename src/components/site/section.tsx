import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}>{children}</div>;
}

type Tone = "default" | "muted" | "brand" | "brand-dark";

const toneClass: Record<Tone, string> = {
  default: "bg-background",
  muted: "bg-muted",
  brand: "bg-brand-green-soft",
  "brand-dark": "bg-brand-green-deep text-white",
};

export function Section({ tone = "default", id, className, children }: { tone?: Tone; id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("py-24 md:py-32", toneClass[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, onDark = false, align = "left", className }: { children: ReactNode; onDark?: boolean; align?: "left" | "center"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] md:text-[0.8125rem]", align === "center" && "justify-center", onDark ? "text-brand-green-light" : "text-brand-green", className)}>
      <span className={cn("h-px w-6", onDark ? "bg-brand-green-light/60" : "bg-brand-green/50")} aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, lead, align = "left", onDark = false, action, className }: { eyebrow?: ReactNode; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; onDark?: boolean; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", action && "md:flex-row md:items-end md:justify-between md:gap-10", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <Eyebrow onDark={onDark} align={align}>{eyebrow}</Eyebrow> : null}
        <h2 className={cn("mt-4 font-display text-[1.75rem] font-bold leading-[1.08] text-balance sm:text-3xl md:text-[2.6rem]", onDark ? "text-white" : "text-foreground")}>{title}</h2>
        {lead ? <p className={cn("mt-4 text-lg leading-relaxed", onDark ? "text-white/75" : "text-muted-foreground")}>{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}