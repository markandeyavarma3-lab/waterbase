"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** A soft radial glow that follows the pointer — desktop only, off for touch/reduced-motion. */
export function CursorGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const section = el.closest("section") ?? el.parentElement;
    if (!section) return;

    function onMove(e: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      el!.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el!.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      el!.style.opacity = "1";
    }
    function onLeave() {
      el!.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500", className)}
      style={{
        background: "radial-gradient(500px circle at var(--glow-x, 50%) var(--glow-y, 30%), rgba(79,224,196,0.12), transparent 60%)",
      }}
    />
  );
}
