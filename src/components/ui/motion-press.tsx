"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Subtle spring scale on hover/press — wrap buttons/links for a tactile, non-flashy feel. */
export function MotionPress({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("inline-block", className)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
