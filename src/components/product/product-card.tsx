"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Rating } from "@/components/ui/primitives";
import { Heart, Scale } from "@/components/ui/icons";
import type { Product } from "@/lib/data/types";
import { COMPARE_LIMIT, useShop } from "@/lib/store/shop-store";
import { availabilityLabel, cx, discountPercent, formatPrice } from "@/lib/utils/format";

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width:1280px) 22vw, (min-width:768px) 31vw, 45vw",
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
}) {
  const { isWishlisted, toggleWishlist, isCompared, toggleCompare, compare, ready } = useShop();
  const wishlisted = ready && isWishlisted(product.slug);
  const compared = ready && isCompared(product.slug);
  const compareFull = ready && compare.length >= COMPARE_LIMIT && !compared;
  const off = discountPercent(product.price, product.compareAtPrice);

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-[14px] bg-ink-100">
        <Link href={`/products/${product.slug}`} className="block" tabIndex={-1} aria-hidden="true">
          <span className="relative block aspect-4/5">
            <Image
              src={product.images[0]}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            {product.images[1] ? (
              <Image
                src={product.images[1]}
                alt=""
                fill
                sizes={sizes}
                loading="lazy"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            ) : null}
          </span>
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {off ? <Badge tone="offer">{off}% off</Badge> : null}
            {product.newArrival ? <Badge tone="dark">New</Badge> : null}
            {product.bestSeller && !off ? <Badge tone="brass">Best seller</Badge> : null}
          </div>

          <div className="pointer-events-auto flex flex-col gap-1.5 opacity-0 transition-opacity duration-300 focus-within:opacity-100 group-hover:opacity-100 max-md:opacity-100">
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
              className={cx(
                "flex size-9 items-center justify-center rounded-full ring-1 backdrop-blur-sm transition-colors",
                wishlisted
                  ? "bg-ink-900 text-brass-300 ring-ink-900"
                  : "bg-white/90 text-ink-600 ring-ink-200 hover:text-ink-900",
              )}
            >
              <Heart width={17} height={17} className={wishlisted ? "fill-current" : undefined} />
            </button>
            <button
              type="button"
              onClick={() => toggleCompare(product.slug)}
              disabled={compareFull}
              aria-pressed={compared}
              title={compareFull ? "Compare list is full (4 max)" : undefined}
              aria-label={compared ? `Remove ${product.name} from compare` : `Add ${product.name} to compare`}
              className={cx(
                "flex size-9 items-center justify-center rounded-full ring-1 backdrop-blur-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                compared
                  ? "bg-ink-900 text-brass-300 ring-ink-900"
                  : "bg-white/90 text-ink-600 ring-ink-200 hover:text-ink-900",
              )}
            >
              <Scale width={17} height={17} />
            </button>
          </div>
        </div>

        {product.availability !== "in-stock" ? (
          <div className="pointer-events-none absolute inset-x-3 bottom-3">
            <Badge tone="neutral">{availabilityLabel[product.availability]}</Badge>
          </div>
        ) : null}
      </div>

      <div className={cx("flex flex-1 flex-col", compact ? "pt-3" : "pt-4")}>
        <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
          {product.brand}
        </p>
        <h3 className="mt-1.5 font-sans text-[0.9375rem] font-medium leading-snug text-ink-900">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        {!compact ? (
          <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">
            {product.summary}
          </p>
        ) : null}

        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="flex items-baseline gap-2">
            <span className="text-[0.9375rem] font-semibold text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-xs text-ink-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
            <span className="text-[0.6875rem] text-ink-400">/ {product.unit}</span>
          </p>
        </div>
        <Rating value={product.rating} count={product.reviewCount} className="mt-2" size={12} />
      </div>
    </article>
  );
}
