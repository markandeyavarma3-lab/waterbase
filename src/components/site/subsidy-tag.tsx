import { BadgePercent } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The one place sunrise orange is used: it always means "subsidy / offer",
 * so it stays the single warm accent on any screen.
 */
export function SubsidyTag({ children = "APMIP subsidy eligible", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-brand-sun px-3 py-1 text-xs font-bold text-white shadow-[0_6px_16px_-6px_rgba(244,162,76,0.8)]", className)}>
      <BadgePercent className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
