"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";

interface ProductCardProps {
  title: string;
  description: string;
  iconBig: React.ReactNode;
  iconSmall: React.ReactNode;
  images: string[];
}

export function ProductCard({ title, description, iconBig, iconSmall, images }: ProductCardProps) {
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
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-brand-green-soft">
        {images.length > 0 ? (
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
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-green/30">
            {iconBig}
          </div>
        )}
        {/* Overlay gradient so text is readable if we want to overlay, or just for a nice shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
            {iconSmall}
          </span>
          <h3 className="font-display text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-brand-green">
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
