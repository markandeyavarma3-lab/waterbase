import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type ProductTabItem = { icon: LucideIcon; title: string; desc: string; image?: string };
export type ProductTabBatch = { label: string; items: ProductTabItem[] };

export function ProductTile({ item }: { item: ProductTabItem }) {
  const Icon = item.icon;
  return (
    <Link
      href="/products"
      className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-blue-soft">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 270px, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-blue-soft to-brand-green-soft">
            <Icon className="h-12 w-12 text-brand-blue" aria-hidden="true" />
          </div>
        )}
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand-green shadow-soft">
          <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-sm font-semibold leading-snug transition-colors group-hover:text-brand-green sm:text-base">
          {item.title}
        </h3>
        <p className="mt-1.5 hidden text-sm leading-relaxed text-muted-foreground sm:block">{item.desc}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-brand-green sm:text-sm">
          View range <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

