"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared hover treatment for card grids (lift + corner glow + border tint).
 * Replaces the hand-duplicated `hover:-translate-y-1 hover:shadow-lift ...` markup
 * that used to live in individual section files.
 */
export function InteractiveCard({ children, className, glow = true }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-[box-shadow,border-color] duration-300 ease-out-expo hover:border-brand-green/40 hover:shadow-lift",
        className
      )}
    >
      {glow ? (
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-green-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </motion.div>
  );
}
