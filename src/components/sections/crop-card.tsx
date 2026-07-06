import Image from "next/image";
import { Sprout } from "lucide-react";
import { InteractiveCard } from "@/components/ui/interactive-card";

// Presentational only — which image shows is controlled by the parent grid
// so cards can be cycled in a synchronized, column-by-column sequence.
export function CropCard({ name, images, index = 0 }: { name: string; images: string[]; index?: number }) {
  const active = images.length ? ((index % images.length) + images.length) % images.length : 0;

  return (
    <InteractiveCard glow={false} className="rounded-2xl">
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
              className="object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,var(--color-brand-green-soft),#ffffff)]">
            <Sprout className="h-9 w-9 text-brand-green/35" aria-hidden="true" />
          </div>
        )}

        {/* Growth accent — a sprout that "grows in" on hover */}
        <div className="pointer-events-none absolute left-2 top-2 z-10 opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M12 20V10M12 10c0-3.2-2.2-5.2-5.2-5.2 0 3.2 2.2 5.2 5.2 5.2Zm0 0c0-3.2 2.2-5.2 5.2-5.2 0 3.2-2.2 5.2-5.2 5.2Z"
              pathLength={1}
              strokeDasharray={1}
              className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0]"
            />
          </svg>
        </div>

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
    </InteractiveCard>
  );
}
