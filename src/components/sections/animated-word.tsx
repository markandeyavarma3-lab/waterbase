"use client";

import { useState, useEffect } from "react";

const WORDS = ["drip irrigation", "sprinkler systems", "water management", "micro-irrigation"];

export function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setFading(false);
      }, 320);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
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
