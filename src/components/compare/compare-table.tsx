"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Check, Close, Scale } from "@/components/ui/icons";
import { EmptyState, Rating, Skeleton } from "@/components/ui/primitives";
import { getProducts } from "@/lib/data/products";
import { useShop } from "@/lib/store/shop-store";
import {
  availabilityLabel,
  cx,
  formatPrice,
  pluralize,
} from "@/lib/utils/format";

export function CompareTable() {
  const { compare, toggleCompare, clearCompare, addEnquiryItem, inEnquiry, ready } = useShop();
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  // Memoised so the spec-row derivation below has a stable dependency.
  const items = useMemo(() => (ready ? getProducts(compare) : []), [ready, compare]);

  /** Union of spec labels across the selection, in first-seen order. */
  const specRows = useMemo(() => {
    const labels: string[] = [];
    for (const product of items) {
      for (const spec of product.specs) {
        if (!labels.includes(spec.label)) labels.push(spec.label);
      }
    }
    return labels.map((label) => ({
      label,
      values: items.map((p) => p.specs.find((s) => s.label === label)?.value ?? "—"),
    }));
  }, [items]);

  const visibleSpecs = onlyDifferences
    ? specRows.filter((row) => new Set(row.values).size > 1)
    : specRows;

  if (!ready) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-80" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Scale width={22} height={22} />}
        title="Nothing to compare yet"
        description="Add up to four products from any listing or product page — the compare icon sits on every card — and we'll line up their specifications side by side."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/products">Browse products</ButtonLink>
            <ButtonLink href="/finder" variant="outline">
              Try the guided finder
            </ButtonLink>
          </div>
        }
      />
    );
  }

  const cheapest = Math.min(...items.map((p) => p.price));
  const bestRated = Math.max(...items.map((p) => p.rating));
  const longestWarranty = Math.max(...items.map((p) => p.warrantyYears));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
        <p className="text-[0.875rem] text-ink-600">
          Comparing {pluralize(items.length, "product")}
          {items.length < 4 ? ` — you can add ${4 - items.length} more` : ""}
        </p>
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-[0.8125rem] text-ink-700">
            <input
              type="checkbox"
              checked={onlyDifferences}
              onChange={(e) => setOnlyDifferences(e.target.checked)}
              className="size-4 rounded-[4px] accent-ink-900"
            />
            Show only differences
          </label>
          <button
            type="button"
            onClick={clearCompare}
            className="text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-[0.875rem]">
          <caption className="sr-only">Product comparison</caption>
          <thead>
            <tr>
              <th scope="col" className="w-40 py-4 text-left align-bottom">
                <span className="sr-only">Attribute</span>
              </th>
              {items.map((product) => (
                <th key={product.slug} scope="col" className="p-4 align-bottom">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleCompare(product.slug)}
                      aria-label={`Remove ${product.name} from comparison`}
                      className="absolute right-0 top-0 z-10 rounded-full bg-white/90 p-1.5 text-ink-500 ring-1 ring-ink-200 transition-colors hover:text-ink-900"
                    >
                      <Close width={14} height={14} />
                    </button>
                    <Link href={`/products/${product.slug}`} className="block">
                      <span className="relative block aspect-4/5 overflow-hidden rounded-[12px] bg-ink-100">
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </span>
                      <span className="mt-3 block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                        {product.brand}
                      </span>
                      <span className="mt-1 block text-left font-sans text-[0.9375rem] font-medium leading-snug text-ink-900 hover:underline">
                        {product.name}
                      </span>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-200 border-y border-ink-200">
            <Row label="Price">
              {items.map((p) => (
                <Cell key={p.slug} highlight={p.price === cheapest && items.length > 1}>
                  <span className="font-semibold text-ink-900">{formatPrice(p.price)}</span>
                  <span className="block text-[0.75rem] text-ink-500">per {p.unit}</span>
                  {p.price === cheapest && items.length > 1 ? (
                    <span className="mt-1 inline-flex items-center gap-1 text-[0.6875rem] font-medium text-emerald-700">
                      <Check width={12} height={12} /> Lowest price
                    </span>
                  ) : null}
                </Cell>
              ))}
            </Row>

            <Row label="Rating">
              {items.map((p) => (
                <Cell key={p.slug} highlight={p.rating === bestRated && items.length > 1}>
                  <Rating value={p.rating} count={p.reviewCount} size={13} />
                </Cell>
              ))}
            </Row>

            <Row label="Availability">
              {items.map((p) => (
                <Cell key={p.slug}>{availabilityLabel[p.availability]}</Cell>
              ))}
            </Row>

            <Row label="Warranty">
              {items.map((p) => (
                <Cell key={p.slug} highlight={p.warrantyYears === longestWarranty && items.length > 1}>
                  {p.warrantyYears} years
                </Cell>
              ))}
            </Row>

            <Row label="Finishes">
              {items.map((p) => (
                <Cell key={p.slug}>{p.finishes.join(", ")}</Cell>
              ))}
            </Row>

            <Row label="Materials">
              {items.map((p) => (
                <Cell key={p.slug}>{p.materials.join(", ")}</Cell>
              ))}
            </Row>

            <Row label="Styles">
              {items.map((p) => (
                <Cell key={p.slug}>{p.styles.join(", ")}</Cell>
              ))}
            </Row>

            {visibleSpecs.map((row) => (
              <Row key={row.label} label={row.label}>
                {row.values.map((value, i) => (
                  <Cell key={`${row.label}-${i}`}>{value}</Cell>
                ))}
              </Row>
            ))}

            <Row label="Key features">
              {items.map((p) => (
                <Cell key={p.slug}>
                  <ul className="grid gap-1.5 text-left">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[0.8125rem] leading-snug">
                        <Check width={13} height={13} className="mt-0.5 shrink-0 text-brass-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Cell>
              ))}
            </Row>
          </tbody>

          <tfoot>
            <tr>
              <th scope="row" className="py-5 text-left">
                <span className="sr-only">Actions</span>
              </th>
              {items.map((p) => (
                <td key={p.slug} className="p-4 align-top">
                  <div className="grid gap-2">
                    <Button
                      size="sm"
                      disabled={inEnquiry(p.slug)}
                      onClick={() =>
                        addEnquiryItem({
                          slug: p.slug,
                          name: p.name,
                          image: p.images[0],
                          price: p.price,
                        })
                      }
                    >
                      {inEnquiry(p.slug) ? "In enquiry" : "Add to enquiry"}
                    </Button>
                    <ButtonLink href={`/products/${p.slug}`} variant="outline" size="sm">
                      View product
                    </ButtonLink>
                  </div>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {onlyDifferences && visibleSpecs.length === 0 ? (
        <p className="mt-6 rounded-[12px] border border-dashed border-ink-200 bg-ink-50 p-6 text-center text-[0.875rem] text-ink-600">
          These products share every specification we track. The difference is finish, price and
          brand.
        </p>
      ) : null}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th
        scope="row"
        className="sticky left-0 bg-white py-4 pr-4 text-left align-top font-medium text-ink-500"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <td
      className={cx(
        "p-4 align-top text-ink-800",
        highlight && "bg-emerald-50/60",
      )}
    >
      {children}
    </td>
  );
}
