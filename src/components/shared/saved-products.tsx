"use client";

import { ProductCard } from "@/components/product/product-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Heart } from "@/components/ui/icons";
import { EmptyState, ProductCardSkeleton } from "@/components/ui/primitives";
import { getProducts } from "@/lib/data/products";
import { useShop } from "@/lib/store/shop-store";
import { formatPrice, pluralize } from "@/lib/utils/format";

export function SavedProducts() {
  const { wishlist, addEnquiryItem, inEnquiry, ready } = useShop();

  if (!ready) {
    return (
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const items = getProducts(wishlist);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Heart width={22} height={22} />}
        title="No saved products yet"
        description="Tap the heart on any product to keep it here. Your list stays on this device — no account, no email required."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/products">Browse products</ButtonLink>
            <ButtonLink href="/collections" variant="outline">
              See renovation collections
            </ButtonLink>
          </div>
        }
      />
    );
  }

  const total = items.reduce((sum, p) => sum + p.price, 0);
  const pending = items.filter((p) => !inEnquiry(p.slug));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-200 pb-5">
        <p className="text-[0.875rem] text-ink-600">
          {pluralize(items.length, "product")} saved ·{" "}
          <span className="font-medium text-ink-900">{formatPrice(total)}</span> at list price
        </p>
        {pending.length > 0 ? (
          <Button
            onClick={() =>
              pending.forEach((p) =>
                addEnquiryItem({
                  slug: p.slug,
                  name: p.name,
                  image: p.images[0],
                  price: p.price,
                }),
              )
            }
          >
            Add all {pending.length} to an enquiry
          </Button>
        ) : (
          <ButtonLink href="/quote">Go to your enquiry</ButtonLink>
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {items.map((product, i) => (
          <ProductCard key={product.slug} product={product} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
