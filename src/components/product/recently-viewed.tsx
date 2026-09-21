"use client";

import { ProductRail } from "@/components/product/product-rail";
import { ProductCardSkeleton } from "@/components/ui/primitives";
import { getProducts } from "@/lib/data/products";
import { useShop } from "@/lib/store/shop-store";

/** Renders nothing until there is history worth showing — no empty shelf. */
export function RecentlyViewed({
  excludeSlug,
  label = "Recently viewed",
  limit = 8,
}: {
  excludeSlug?: string;
  label?: string;
  limit?: number;
}) {
  const { recent, ready } = useShop();

  if (!ready) {
    return (
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const products = getProducts(recent.filter((s) => s !== excludeSlug)).slice(0, limit);
  if (products.length < 2) return null;

  return <ProductRail products={products} label={label} />;
}
