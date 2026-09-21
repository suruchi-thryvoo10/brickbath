"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Check, Heart, Phone, Scale, Share, Shield, Truck, WhatsApp } from "@/components/ui/icons";
import { Badge, Rating } from "@/components/ui/primitives";
import type { Product } from "@/lib/data/types";
import { site, whatsappLink } from "@/lib/site";
import { COMPARE_LIMIT, useShop } from "@/lib/store/shop-store";
import {
  availabilityLabel,
  availabilityTone,
  cx,
  discountPercent,
  formatPrice,
} from "@/lib/utils/format";

export function ProductPanel({ product }: { product: Product }) {
  const {
    isWishlisted,
    toggleWishlist,
    isCompared,
    toggleCompare,
    compare,
    addEnquiryItem,
    inEnquiry,
    ready,
    trackView,
  } = useShop();

  const [selection, setSelection] = useState<Record<string, string>>({});
  const [shared, setShared] = useState<"idle" | "copied" | "shared">("idle");

  useEffect(() => {
    trackView(product.slug);
  }, [product.slug, trackView]);

  useEffect(() => {
    // Default to the option that costs what the headline price says — the base
    // variant — rather than whichever happens to be listed first.
    const defaults: Record<string, string> = {};
    for (const group of product.variants ?? []) {
      const base = group.options.find((o) => !o.priceDelta) ?? group.options[0];
      defaults[group.name] = base.id;
    }
    setSelection(defaults);
  }, [product]);

  const { price, availability, variantLabel } = useMemo(() => {
    let delta = 0;
    let avail = product.availability;
    const labels: string[] = [];
    for (const group of product.variants ?? []) {
      const chosen = group.options.find((o) => o.id === selection[group.name]);
      if (!chosen) continue;
      delta += chosen.priceDelta ?? 0;
      labels.push(`${group.name}: ${chosen.label}`);
      if (chosen.availability === "made-to-order") avail = "made-to-order";
    }
    return {
      price: product.price + delta,
      availability: avail,
      variantLabel: labels.join(" · "),
    };
  }, [product, selection]);

  const wishlisted = ready && isWishlisted(product.slug);
  const compared = ready && isCompared(product.slug);
  const compareFull = ready && compare.length >= COMPARE_LIMIT && !compared;
  const added = ready && inEnquiry(product.slug);
  const off = discountPercent(product.price, product.compareAtPrice);

  const enquiryMessage = `Hi Brick & Bath — I'd like a quote for the ${product.name}${
    variantLabel ? ` (${variantLabel})` : ""
  }.`;

  const share = async () => {
    const url = typeof window === "undefined" ? "" : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.summary, url });
        setShared("shared");
      } else {
        await navigator.clipboard.writeText(url);
        setShared("copied");
      }
    } catch {
      // User dismissed the share sheet, or the clipboard was blocked.
      return;
    }
    window.setTimeout(() => setShared("idle"), 2200);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
          {product.brand}
        </span>
        {product.badges?.map((badge) => (
          <Badge key={badge} tone="brass">
            {badge}
          </Badge>
        ))}
      </div>

      <h1 className="mt-3 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.12] text-ink-900">
        {product.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Rating value={product.rating} count={product.reviewCount} />
        <span
          className={cx(
            "inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ring-1 ring-inset",
            availabilityTone[availability],
          )}
        >
          {availabilityLabel[availability]}
        </span>
      </div>

      <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-700">{product.summary}</p>

      <div className="mt-6 flex flex-wrap items-baseline gap-3 border-t border-ink-200 pt-6">
        <span className="font-display text-[2rem] leading-none text-ink-900">
          {formatPrice(price)}
        </span>
        <span className="text-sm text-ink-500">per {product.unit}</span>
        {product.compareAtPrice && price === product.price ? (
          <>
            <span className="text-sm text-ink-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            {off ? <Badge tone="offer">Save {off}%</Badge> : null}
          </>
        ) : null}
      </div>
      <p className="mt-1.5 text-[0.75rem] text-ink-500">
        Inclusive of GST. Project pricing applies when supplied as part of a renovation.
      </p>

      {/* Variants */}
      {product.variants?.map((group) => (
        <fieldset key={group.name} className="mt-7">
          <legend className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-600">
            {group.name}
            <span className="ml-2 font-normal normal-case tracking-normal text-ink-400">
              {group.options.find((o) => o.id === selection[group.name])?.value}
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.options.map((option) => {
              const active = selection[group.name] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelection((s) => ({ ...s, [group.name]: option.id }))}
                  className={cx(
                    "rounded-[9px] border px-3.5 py-2.5 text-left text-[0.8125rem] transition-all duration-200",
                    active
                      ? "border-ink-900 bg-ink-900 text-ink-50"
                      : "border-ink-200 text-ink-700 hover:border-ink-900",
                  )}
                >
                  <span className="block font-medium">{option.label}</span>
                  {option.priceDelta ? (
                    <span
                      className={cx(
                        "mt-0.5 block text-[0.6875rem]",
                        active ? "text-ink-300" : "text-ink-500",
                      )}
                    >
                      {option.priceDelta > 0 ? "+" : "−"}
                      {formatPrice(Math.abs(option.priceDelta))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* Actions */}
      <div className="mt-8 grid gap-2.5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Button
            size="lg"
            onClick={() =>
              addEnquiryItem({
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price,
                variant: variantLabel || undefined,
              })
            }
            disabled={added}
          >
            {added ? (
              <>
                <Check width={17} height={17} /> Added to enquiry
              </>
            ) : (
              "Add to enquiry"
            )}
          </Button>
          <ButtonLink
            href={whatsappLink(enquiryMessage)}
            variant="whatsapp"
            size="lg"
            external
          >
            <WhatsApp width={18} height={18} />
            WhatsApp us
          </ButtonLink>
        </div>

        {added ? (
          <Link
            href="/quote"
            className="text-center text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4"
          >
            Go to your enquiry →
          </Link>
        ) : null}

        <div className="grid grid-cols-3 gap-2.5">
          <Button
            variant="outline"
            onClick={() => toggleWishlist(product.slug)}
            aria-pressed={wishlisted}
          >
            <Heart width={16} height={16} className={wishlisted ? "fill-current" : undefined} />
            <span className="hidden sm:inline">{wishlisted ? "Saved" : "Save"}</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => toggleCompare(product.slug)}
            disabled={compareFull}
            aria-pressed={compared}
            title={compareFull ? "Compare list is full (4 max)" : undefined}
          >
            <Scale width={16} height={16} />
            <span className="hidden sm:inline">{compared ? "Added" : "Compare"}</span>
          </Button>
          <Button variant="outline" onClick={share}>
            <Share width={16} height={16} />
            <span className="hidden sm:inline">
              {shared === "copied" ? "Copied" : shared === "shared" ? "Shared" : "Share"}
            </span>
          </Button>
        </div>

        <a
          href={`tel:${site.salesPhone}`}
          className="mt-1 flex items-center justify-center gap-2 text-[0.8125rem] text-ink-600 transition-colors hover:text-ink-900"
        >
          <Phone width={15} height={15} className="text-brass-600" />
          Prefer to talk? {site.salesPhoneDisplay} · {site.hours}
        </a>
      </div>

      {/* Reassurance */}
      <ul className="mt-8 grid gap-3 rounded-[14px] bg-ink-50 p-5 text-[0.8125rem] text-ink-700 sm:grid-cols-3">
        <li className="flex items-start gap-2.5">
          <Shield width={17} height={17} className="mt-0.5 shrink-0 text-brass-600" />
          <span>{product.warrantyYears}-year warranty, registered to your address</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Truck width={17} height={17} className="mt-0.5 shrink-0 text-brass-600" />
          <span>Free delivery in Bhubaneswar, Cuttack & Puri over ₹5,000</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Check width={17} height={17} className="mt-0.5 shrink-0 text-brass-600" />
          <span>
            {availability === "made-to-order"
              ? "Made to order — lead time confirmed at quote"
              : "7-day returns, unused and in packaging"}
          </span>
        </li>
      </ul>
    </div>
  );
}
