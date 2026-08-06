"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DUR, EASE_OUT_EXPO, REVEAL_Y, STAGGER_STEP } from "@/lib/motion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER_STEP, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: DUR.settle, ease: EASE_OUT_EXPO } },
};

/** Wraps a grid/row of children and orchestrates a staggered entrance for `StaggerItem` children. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={cn("h-full", className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
