"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import type { Product } from "@/lib/data/types";

/**
 * Horizontal product rail. Snap-scrolls on touch, gains arrows on pointer
 * devices, and stays a plain scrollable list for keyboard and screen readers.
 */
export function ProductRail({
  products,
  label,
  action,
}: {
  products: Product[];
  label: string;
  action?: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-xl text-ink-900 md:text-2xl">{label}</h2>
        <div className="flex items-center gap-2">
          {action}
          <div className="hidden gap-1.5 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex size-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              <ArrowLeft width={16} height={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex size-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              <ArrowRight width={16} height={16} />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={ref}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
      >
        {products.map((product) => (
          <li
            key={product.slug}
            className="w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[23%]"
          >
            <ProductCard
              product={product}
              sizes="(min-width:1024px) 23vw, (min-width:640px) 42vw, 62vw"
              compact
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
