import Image from "next/image";
import { Sprout } from "lucide-react";

// Presentational only — which image shows is controlled by the parent grid
// so cards can be cycled in a synchronized, column-by-column sequence.
export function CropCard({ name, images, index = 0 }: { name: string; images: string[]; index?: number }) {
  const active = images.length ? ((index % images.length) + images.length) % images.length : 0;

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
              className="object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,var(--color-brand-green-soft),#ffffff)]">
            <Sprout className="h-9 w-9 text-brand-green/35" aria-hidden="true" />
          </div>
        )}

        {/* Slide dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={"h-1.5 rounded-full bg-white shadow transition-all duration-300 " + (i === active ? "w-4 opacity-100" : "w-1.5 opacity-60")}
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
