"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { InteractiveCard } from "@/components/ui/interactive-card";

export function FallingCards({
  items,
}: {
  items: { icon: LucideIcon; title: string; desc: string }[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => {
        const col = i % 3;
        return (
          <motion.div
            key={c.title}
            className="h-full"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -90, rotate: col === 1 ? 1.2 : col === 2 ? -1.2 : 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.22, margin: "0px 0px -6% 0px" }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 18,
              mass: 0.85,
              delay: prefersReducedMotion ? 0 : col * 0.07 + Math.floor(i / 3) * 0.04,
            }}
          >
            <Link href="/products" className="block h-full">
              <InteractiveCard className="group h-full p-6">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-4 font-display text-base font-semibold transition-colors group-hover:text-brand-green">{c.title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </InteractiveCard>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
