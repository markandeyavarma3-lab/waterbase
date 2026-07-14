"use client";

import { useState, useEffect, useRef } from "react";

const WORDS = ["water management"];

export function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setFading(false);
      }, 320);
    }, 2800);
    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <span
      ref={ref}
      aria-live="polite"
      className="text-brand-green-light"
      style={{
        display: "inline-block",
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(-6px)" : "translateY(0)",
        transition: "opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {WORDS[index]}
    </span>
  );
}
