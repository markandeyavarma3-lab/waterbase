"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export function CropCard({ name, images }: { name: string; images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 2000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-green-soft/40">
        {images.length > 0 ? (
          images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={name}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
              unoptimized
              className="object-cover transition-opacity duration-700 ease-out-expo"
              style={{ opacity: i === idx ? 1 : 0 }}
            />
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-green/40">
            <ImageIcon className="h-8 w-8" aria-hidden="true" />
            <span className="text-xs font-medium">Photos coming soon</span>
          </div>
        )}

        {/* Slide dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={"h-1.5 rounded-full bg-white shadow transition-all duration-300 " + (i === idx ? "w-4 opacity-100" : "w-1.5 opacity-60")}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </div>
      <div className="px-4 py-3 text-center">
        <span className="text-sm font-semibold transition-colors group-hover:text-brand-green">{name}</span>
      </div>
    </div>
  );
}
