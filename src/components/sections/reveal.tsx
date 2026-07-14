"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("will-change-[opacity,transform]", className)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      variants={variants}
      transition={{ duration: 0.5, delay: delay / 1000, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
