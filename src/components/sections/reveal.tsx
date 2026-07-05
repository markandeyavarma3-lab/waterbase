"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
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
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
