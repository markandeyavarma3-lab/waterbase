"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InteractiveCard({ children, className, glow = true }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group card-shine relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-[box-shadow,border-color] duration-300 ease-out-expo hover:border-brand-green/40 hover:shadow-lift",
        className
      )}
    >
      {glow ? (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-green/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
