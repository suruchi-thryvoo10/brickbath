"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Close, Search as SearchIcon } from "@/components/ui/icons";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { products } from "@/lib/data/products";
import { formatPrice, cx } from "@/lib/utils/format";
import { scoreProduct } from "@/lib/utils/search";

const QUICK = [
  "Rain shower",
  "Wall-hung WC",
  "Large-format tile",
  "Oak vanity",
  "Freestanding tub",
  "Backlit mirror",
];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return products
      .map((p) => ({ p, score: scoreProduct(p, query) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.p);
  }, [query]);

  const categoryHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return [
      ...categories
        .filter((c) => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q))
        .map((c) => ({ label: c.name, href: `/categories/${c.slug}`, kind: "Category" })),
      ...collections
        .filter((c) => c.name.toLowerCase().includes(q))
        .map((c) => ({ label: `${c.name} Collection`, href: `/collections/${c.slug}`, kind: "Collection" })),
    ].slice(0, 3);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const hit = results[active];
        if (hit) {
          onClose();
          router.push(`/products/${hit.slug}`);
        } else if (query.trim()) {
          onClose();
          router.push(`/products?q=${encodeURIComponent(query.trim())}`);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, query, onClose, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label="Search products">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/45 backdrop-blur-sm"
      />
      <div className="relative mx-auto mt-[8vh] w-[min(42rem,calc(100vw-2rem))] animate-fade-up overflow-hidden rounded-[18px] bg-white shadow-lift">
        <div className="flex items-center gap-3 border-b border-ink-200 px-5">
          <SearchIcon width={19} height={19} className="shrink-0 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search faucets, tiles, vanities…"
            aria-label="Search products"
            className="h-16 flex-1 bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-400"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            aria-label="Close search"
          >
            <Close width={18} height={18} />
          </button>
        </div>

        <div className="max-h-[min(28rem,60vh)] overflow-y-auto p-3">
          {query.trim().length < 2 ? (
            <div className="p-3">
              <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuery(q)}
                    className="rounded-full border border-ink-200 px-3 py-1.5 text-[0.8125rem] text-ink-700 transition-colors hover:border-ink-900 hover:bg-ink-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 && categoryHits.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-ink-700">
                Nothing matches <span className="font-medium text-ink-900">“{query}”</span>.
              </p>
              <p className="mt-1.5 text-[0.8125rem] text-ink-500">
                Try a material, a finish, or tell us what you need and we will source it.
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-4 inline-block text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4"
              >
                Ask our team →
              </Link>
            </div>
          ) : (
            <>
              {categoryHits.length > 0 ? (
                <div className="mb-2 px-1">
                  {categoryHits.map((hit) => (
                    <Link
                      key={hit.href}
                      href={hit.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-[10px] px-3 py-2.5 text-sm transition-colors hover:bg-ink-50"
                    >
                      <span className="text-ink-800">{hit.label}</span>
                      <span className="text-[0.6875rem] uppercase tracking-wider text-ink-400">
                        {hit.kind}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}

              <ul className="px-1">
                {results.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setActive(i)}
                      className={cx(
                        "flex items-center gap-3.5 rounded-[12px] p-2.5 transition-colors",
                        i === active ? "bg-ink-50" : "hover:bg-ink-50/60",
                      )}
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-[8px] bg-ink-100">
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink-900">
                          {p.name}
                        </span>
                        <span className="block truncate text-xs text-ink-500">
                          {p.brand} · {p.subCategory}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-medium text-ink-800">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/products?q=${encodeURIComponent(query.trim())}`}
                onClick={onClose}
                className="mx-1 mt-2 block rounded-[10px] border-t border-ink-100 px-3 py-3 text-center text-[0.8125rem] font-medium text-brass-700 transition-colors hover:bg-brass-100/50"
              >
                See all results for “{query.trim()}”
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
