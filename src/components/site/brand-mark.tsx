import { cn } from "@/lib/utils";

// Waterbase brand mark — a water droplet with a sprout inside (water + growth).
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-green text-white", className)} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-3/5 w-3/5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3s6 6.4 6 10.5a6 6 0 0 1-12 0C6 9.4 12 3 12 3Z" />
        <path d="M9.5 13c1.4 0 2.5-1.1 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5" />
      </svg>
    </span>
  );
}
