"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";

interface ProductCardProps {
  title: string;
  description: string;
  iconSmall: React.ReactNode;
  images: string[];
}

export function ProductCard({ title, description, iconSmall, images }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <InteractiveCard className="group flex h-full min-h-[280px] flex-col overflow-hidden p-0">
      {/* No photos for this category → no media block at all. A grey
          "image pending" plate on a product card reads as an unfinished site;
          the card's icon, title and description stand on their own. */}
      {images.length > 0 ? (
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-graphite-50">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`${title} image`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </motion.div>
          </AnimatePresence>
          {/* Overlay gradient so text is readable if we want to overlay, or just for a nice shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-graphite-700 transition-colors duration-300 group-hover:border-brand-green/40 group-hover:bg-brand-green group-hover:text-white">
            {iconSmall}
          </span>
          <h3 className="font-display text-base font-semibold leading-tight text-heading transition-colors group-hover:text-brand-green">
            {title}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </InteractiveCard>
  );
}
