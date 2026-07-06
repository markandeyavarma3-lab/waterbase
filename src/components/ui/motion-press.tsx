"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAGNETIC_PULL = 0.25;
const MAGNETIC_MAX = 10;

function createRipple(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.6;
  const span = document.createElement("span");
  span.className = "motion-ripple pointer-events-none absolute rounded-full bg-current/20";
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  span.style.left = `${clientX - rect.left - size / 2}px`;
  span.style.top = `${clientY - rect.top - size / 2}px`;
  span.style.animation = "ripple-ping 550ms ease-out";
  el.appendChild(span);
  span.addEventListener("animationend", () => span.remove());
}

/**
 * Subtle spring scale + ripple on hover/press — wrap buttons/links for a tactile, non-flashy feel.
 * Pass `magnetic` to also have it gently pull toward the cursor (desktop pointer only).
 */
export function MotionPress({ children, className, magnetic = false }: { children: ReactNode; className?: string; magnetic?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_PULL)));
    y.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_PULL)));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (ref.current) createRipple(ref.current, e.clientX, e.clientY);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative isolate inline-block overflow-hidden rounded-md", className)}
      style={magnetic ? { x, y } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
