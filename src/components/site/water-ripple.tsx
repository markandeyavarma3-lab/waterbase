"use client";

import { useEffect, useRef } from "react";

type Ripple = { x: number; y: number; r: number; alpha: number; speed: number; maxR: number };

const MOBILE_BREAKPOINT = 768;

/**
 * Ambient + pointer-reactive water ripple, drawn on canvas.
 * Skips entirely on small screens / reduced-motion — the section's
 * AuroraGlow gradient layer is the fallback in both cases, so the
 * hero never ships with nothing behind it.
 */
export function WaterRipple({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
    if (prefersReducedMotion || isSmallScreen) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ripples: Ripple[] = [];
    let raf = 0;
    let lastSpawn = 0;
    let ambientTimer = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnRipple(x: number, y: number, big = false) {
      ripples.push({ x, y, r: 0, alpha: big ? 0.32 : 0.22, speed: big ? 0.42 : 0.55, maxR: big ? 190 : 100 });
      if (ripples.length > 16) ripples.shift();
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      const now = performance.now();
      if (now - lastSpawn < 110) return;
      lastSpawn = now;
      spawnRipple(x, y);
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, width, height);

      if (t - ambientTimer > 2400) {
        ambientTimer = t;
        spawnRipple(width * (0.15 + Math.random() * 0.7), height * (0.15 + Math.random() * 0.7), true);
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += r.speed * 4;
        const life = r.r / r.maxR;
        if (life >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const alpha = r.alpha * (1 - life);
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(147, 206, 238, ${alpha})`;
        ctx!.lineWidth = 1.4;
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
