"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAGNETIC_PULL = 0.25;
const MAGNETIC_MAX = 10;

function createRipple(host: HTMLElement, clientX: number, clientY: number) {
  // Ripples go into their own clipped layer, not the wrapper itself. The
  // wrapper used to be overflow-hidden + rounded-md so the ripple stayed inside
  // the button — which also clipped the button's drop shadow into a visible
  // grey RECTANGLE around every rounded Call/WhatsApp pill.
  const el = (host.querySelector(":scope > .motion-press-ripples") as HTMLElement | null) ?? host;
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
 * Subtle scale + ripple on hover/press — wrap buttons/links for a tactile,
 * non-flashy feel. Pass `magnetic` to also have it gently pull toward the
 * cursor (mouse only).
 *
 * CSS-driven (`.motion-press` in globals.css). It used to be a framer-motion
 * component, which — because it wraps every Call/WhatsApp CTA, including on the
 * paid landing pages — kept the animation library in those pages' bundles for
 * the sake of a 3% scale. The magnetic offset and the hover/press scale are now
 * CSS custom properties composed into one transform, and an overshooting
 * cubic-bezier stands in for the spring.
 */
export function MotionPress({ children, className, magnetic = false }: { children: ReactNode; className?: string; magnetic?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!magnetic || e.pointerType !== "mouse" || !el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.setProperty("--mx", `${Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_PULL))}px`);
    el.style.setProperty("--my", `${Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_PULL))}px`);
  };

  const onPointerLeave = () => {
    ref.current?.style.setProperty("--mx", "0px");
    ref.current?.style.setProperty("--my", "0px");
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (ref.current) createRipple(ref.current, e.clientX, e.clientY);
  };

  return (
    <div
      ref={ref}
      className={cn("motion-press relative isolate inline-block", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
      {children}
      <span className="motion-press-ripples pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden="true" />
    </div>
  );
}
