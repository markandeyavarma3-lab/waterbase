import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card shell with a CSS hover lift. It used to be a framer-motion 3D tilt,
 * which put the animation library on every page that shows a card.
 */
export function InteractiveCard({ children, className, glow = true }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={cn("group surface-card card-lift relative h-full overflow-hidden rounded-3xl", className)}>
      {glow ? (
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-blue/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}
