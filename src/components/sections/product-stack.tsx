import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES, PRODUCT_GROUPS } from "@/lib/products";
import { listLogos } from "@/lib/logos";

const groupTitle = Object.fromEntries(PRODUCT_GROUPS.map((g) => [g.id, g.title]));

/**
 * Every product category as a card that sticks near the top while the next one
 * slides up over it, so they pile into a deck. Pure CSS `position: sticky` —
 * it needs no ancestor with overflow:hidden (Section uses overflow:clip).
 */
export function ProductStack() {
  const items = PRODUCT_CATEGORIES.map((c) => ({ ...c, image: listLogos(`products/${c.folder}`)[0]?.src }));
  const total = String(items.length).padStart(2, "0");

  return (
    <ol className="mx-auto mt-14 max-w-5xl">
      {items.map((p, i) => {
        const Icon = p.icon;
        return (
          <li
            key={p.folder}
            className="sticky pb-6 sm:pb-8"
            style={{ top: `calc(5.5rem + ${i * 10}px)` }}
          >
            <Link
              href="/products"
              className="group grid overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_-6px_24px_-12px_rgba(42,124,172,0.25),0_24px_48px_-20px_rgba(31,99,118,0.30)] md:h-[21rem] md:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative h-40 overflow-hidden bg-brand-blue-soft sm:h-60 md:h-full">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-blue-soft to-brand-green-soft">
                    <Icon className="h-16 w-16 text-brand-blue" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="truncate rounded-full bg-brand-green-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand-green-dark sm:text-xs">
                    {groupTitle[p.group]}
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-display text-sm font-bold tabular-nums text-water-deep/35">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                </div>
                <span className="mt-5 hidden h-12 w-12 sm:flex items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight md:text-[1.75rem]">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                  View range
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
