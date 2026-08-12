"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InteractiveCard({ children, className, glow = true }: { children: ReactNode; className?: string; glow?: boolean }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 300, damping: 30, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      whileTap={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group card-shine surface-card relative h-full overflow-hidden rounded-2xl",
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
