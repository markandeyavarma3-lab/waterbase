"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DUR, EASE_OUT_EXPO, REVEAL_Y } from "@/lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
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
      transition={{ duration: DUR.settle, delay: delay / 1000, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
