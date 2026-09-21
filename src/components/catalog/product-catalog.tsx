"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { FacetGroup, PriceFilter } from "@/components/catalog/filter-panel";
import { ProductCard } from "@/components/product/product-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Close, Filter as FilterIcon, Search as SearchIcon } from "@/components/ui/icons";
import { EmptyState, ProductCardSkeleton } from "@/components/ui/primitives";
import { categories } from "@/lib/data/categories";
import {
  allBrands,
  allFinishes,
  allMaterials,
  allRooms,
  allStyles,
  priceBounds,
} from "@/lib/data/products";
import type { Product } from "@/lib/data/types";
import { cx, pluralize } from "@/lib/utils/format";
import {
  activeFilterCount,
  emptyFilters,
  facetCounts,
  filterProducts,
  sortProducts,
  type Filters,
  type SortKey,
} from "@/lib/utils/search";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest" },
];

const AVAILABILITY = ["in-stock", "low-stock", "made-to-order"];
const AVAILABILITY_LABELS: Record<string, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "made-to-order": "Made to order",
};
const TIERS = ["value", "premium", "luxury"];
const TIER_LABELS: Record<string, string> = {
  value: "Value",
  premium: "Premium",
  luxury: "Luxury",
};

const PAGE_SIZE = 12;

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export function ProductCatalog({
  products,
  lockedCategory,
  heading = "products",
}: {
  products: Product[];
  /** When rendered inside a category page, hide and pin the category facet. */
  lockedCategory?: string;
  heading?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // Depend on the serialised query, not the object: useSearchParams hands back a
  // fresh instance on every render, which would make the sync effect re-run
  // forever.
  const paramsKey = params.toString();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [queryInput, setQueryInput] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pending, setPending] = useState(false);

  // Read URL → state on mount and whenever the URL actually changes.
  useEffect(() => {
    const sp = new URLSearchParams(paramsKey);
    const next: Filters = {
      q: sp.get("q") ?? "",
      categories: lockedCategory ? [lockedCategory] : parseList(sp.get("category")),
      brands: parseList(sp.get("brand")),
      finishes: parseList(sp.get("finish")),
      styles: parseList(sp.get("style")),
      materials: parseList(sp.get("material")),
      rooms: parseList(sp.get("room")),
      availability: parseList(sp.get("availability")),
      priceTiers: parseList(sp.get("tier")),
      minPrice: sp.get("min") ? Number(sp.get("min")) : undefined,
      maxPrice: sp.get("max") ? Number(sp.get("max")) : undefined,
      minRating: sp.get("rating") ? Number(sp.get("rating")) : undefined,
      onlyOffers: sp.get("offers") === "1" || undefined,
    };
    setFilters(next);
    setQueryInput(next.q);
    setSort((sp.get("sort") as SortKey) ?? "relevance");
    setVisible(PAGE_SIZE);
  }, [paramsKey, lockedCategory]);

  const pushUrl = useCallback(
    (next: Filters, nextSort: SortKey) => {
      const sp = new URLSearchParams();
      if (next.q) sp.set("q", next.q);
      if (!lockedCategory && next.categories.length) sp.set("category", next.categories.join(","));
      if (next.brands.length) sp.set("brand", next.brands.join(","));
      if (next.finishes.length) sp.set("finish", next.finishes.join(","));
      if (next.styles.length) sp.set("style", next.styles.join(","));
      if (next.materials.length) sp.set("material", next.materials.join(","));
      if (next.rooms.length) sp.set("room", next.rooms.join(","));
      if (next.availability.length) sp.set("availability", next.availability.join(","));
      if (next.priceTiers.length) sp.set("tier", next.priceTiers.join(","));
      if (next.minPrice !== undefined) sp.set("min", String(next.minPrice));
      if (next.maxPrice !== undefined) sp.set("max", String(next.maxPrice));
      if (next.minRating !== undefined) sp.set("rating", String(next.minRating));
      if (next.onlyOffers) sp.set("offers", "1");
      if (nextSort !== "relevance") sp.set("sort", nextSort);
      const qs = sp.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [lockedCategory, pathname, router],
  );

  const update = useCallback(
    (patch: Partial<Filters>, nextSort = sort) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      setVisible(PAGE_SIZE);
      setSort(nextSort);
      // Brief skeleton so a large facet change reads as work, not a jump cut.
      setPending(true);
      window.setTimeout(() => setPending(false), 220);
      pushUrl(next, nextSort);
    },
    [filters, sort, pushUrl],
  );

  const toggleIn = (key: keyof Filters) => (value: string) => {
    const current = filters[key] as string[];
    update({
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    } as Partial<Filters>);
  };

  // Debounce the search box so typing does not thrash the URL.
  useEffect(() => {
    if (queryInput === filters.q) return;
    const t = window.setTimeout(() => update({ q: queryInput }), 260);
    return () => window.clearTimeout(t);
  }, [queryInput, filters.q, update]);

  const results = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sort, filters.q);
  }, [products, filters, sort]);

  const counts = useMemo(
    () => ({
      categories: facetCounts(products, filters, "categories", (p) => [p.category]),
      brands: facetCounts(products, filters, "brands", (p) => [p.brand]),
      finishes: facetCounts(products, filters, "finishes", (p) => p.finishes),
      styles: facetCounts(products, filters, "styles", (p) => p.styles),
      materials: facetCounts(products, filters, "materials", (p) => p.materials),
      rooms: facetCounts(products, filters, "rooms", (p) => p.rooms),
      availability: facetCounts(products, filters, "availability", (p) => [p.availability]),
      tiers: facetCounts(products, filters, "priceTiers", (p) => [p.priceTier]),
    }),
    [products, filters],
  );

  const activeCount = activeFilterCount(filters) - (lockedCategory ? 1 : 0);
  const shown = results.slice(0, visible);

  const clearAll = () => {
    setQueryInput("");
    update({
      ...emptyFilters,
      categories: lockedCategory ? [lockedCategory] : [],
    });
  };

  const facets = (
    <>
      {!lockedCategory ? (
        <FacetGroup
          title="Category"
          values={categories.map((c) => c.slug)}
          selected={filters.categories}
          counts={counts.categories}
          onToggle={toggleIn("categories")}
          labels={Object.fromEntries(categories.map((c) => [c.slug, c.name]))}
          collapseAfter={8}
        />
      ) : null}
      <PriceFilter
        min={priceBounds.min}
        max={priceBounds.max}
        value={[filters.minPrice, filters.maxPrice]}
        onChange={([min, max]) => update({ minPrice: min, maxPrice: max })}
      />
      <FacetGroup
        title="Finish"
        values={allFinishes}
        selected={filters.finishes}
        counts={counts.finishes}
        onToggle={toggleIn("finishes")}
      />
      <FacetGroup
        title="Style"
        values={allStyles}
        selected={filters.styles}
        counts={counts.styles}
        onToggle={toggleIn("styles")}
      />
      <FacetGroup
        title="Material"
        values={allMaterials}
        selected={filters.materials}
        counts={counts.materials}
        onToggle={toggleIn("materials")}
        defaultOpen={false}
      />
      <FacetGroup
        title="Room"
        values={allRooms}
        selected={filters.rooms}
        counts={counts.rooms}
        onToggle={toggleIn("rooms")}
        defaultOpen={false}
      />
      <FacetGroup
        title="Brand"
        values={allBrands}
        selected={filters.brands}
        counts={counts.brands}
        onToggle={toggleIn("brands")}
        defaultOpen={false}
      />
      <FacetGroup
        title="Availability"
        values={AVAILABILITY}
        selected={filters.availability}
        counts={counts.availability}
        onToggle={toggleIn("availability")}
        labels={AVAILABILITY_LABELS}
        defaultOpen={false}
      />
      <FacetGroup
        title="Price tier"
        values={TIERS}
        selected={filters.priceTiers}
        counts={counts.tiers}
        onToggle={toggleIn("priceTiers")}
        labels={TIER_LABELS}
        defaultOpen={false}
      />
      <div className="py-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-[0.8125rem] text-ink-700">
          <input
            type="checkbox"
            checked={Boolean(filters.onlyOffers)}
            onChange={(e) => update({ onlyOffers: e.target.checked || undefined })}
            className="size-4 rounded-[4px] accent-ink-900"
          />
          Show only items on offer
        </label>
      </div>
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2">
          <div className="flex items-center justify-between pb-3">
            <h2 className="font-display text-lg text-ink-900">Refine</h2>
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="text-[0.75rem] font-medium text-brass-700 underline underline-offset-4"
              >
                Clear all
              </button>
            ) : null}
          </div>
          {facets}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-ink-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <SearchIcon
              width={17}
              height={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <label htmlFor="catalog-search" className="sr-only">
              Search {heading}
            </label>
            <input
              id="catalog-search"
              type="search"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={`Search ${heading}…`}
              className="h-11 w-full rounded-[10px] border border-ink-200 bg-white pl-10 pr-3 text-sm outline-none transition-colors focus:border-ink-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              className="lg:hidden"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
            >
              <FilterIcon width={16} height={16} />
              Filters
              {activeCount > 0 ? (
                <span className="rounded-full bg-ink-900 px-1.5 text-[0.625rem] text-ink-50">
                  {activeCount}
                </span>
              ) : null}
            </Button>

            <label htmlFor="catalog-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => update({}, e.target.value as SortKey)}
              className="h-11 rounded-[10px] border border-ink-200 bg-white px-3 pr-8 text-sm text-ink-800 outline-none transition-colors focus:border-ink-900"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active chips */}
        {activeCount > 0 ? (
          <div className="flex flex-wrap items-center gap-2 py-4">
            {(
              [
                ...(lockedCategory ? [] : filters.categories.map((v) => ["categories", v] as const)),
                ...filters.finishes.map((v) => ["finishes", v] as const),
                ...filters.styles.map((v) => ["styles", v] as const),
                ...filters.materials.map((v) => ["materials", v] as const),
                ...filters.rooms.map((v) => ["rooms", v] as const),
                ...filters.brands.map((v) => ["brands", v] as const),
                ...filters.availability.map((v) => ["availability", v] as const),
                ...filters.priceTiers.map((v) => ["priceTiers", v] as const),
              ] as [keyof Filters, string][]
            ).map(([key, value]) => (
              <button
                key={`${key}-${value}`}
                type="button"
                onClick={() => toggleIn(key)(value)}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 py-1.5 pl-3 pr-2 text-[0.75rem] text-ink-700 transition-colors hover:bg-ink-200"
              >
                {key === "availability"
                  ? AVAILABILITY_LABELS[value]
                  : key === "priceTiers"
                    ? TIER_LABELS[value]
                    : key === "categories"
                      ? (categories.find((c) => c.slug === value)?.name ?? value)
                      : value}
                <Close width={12} height={12} />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            {filters.minPrice !== undefined || filters.maxPrice !== undefined ? (
              <button
                type="button"
                onClick={() => update({ minPrice: undefined, maxPrice: undefined })}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 py-1.5 pl-3 pr-2 text-[0.75rem] text-ink-700 transition-colors hover:bg-ink-200"
              >
                Price filter
                <Close width={12} height={12} />
              </button>
            ) : null}
            <button
              type="button"
              onClick={clearAll}
              className="ml-1 text-[0.75rem] font-medium text-brass-700 underline underline-offset-4"
            >
              Clear all
            </button>
          </div>
        ) : null}

        <p
          className="py-4 text-[0.8125rem] text-ink-500"
          role="status"
          aria-live="polite"
        >
          {pending ? "Updating results…" : `${pluralize(results.length, "product")}`}
          {filters.q ? ` matching “${filters.q}”` : ""}
        </p>

        {pending ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            icon={<SearchIcon width={22} height={22} />}
            title="No products match those filters"
            description="Try removing a filter, or tell us what you are looking for — we source beyond the catalogue for most projects."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={clearAll}>
                  Clear filters
                </Button>
                <ButtonLink href="/contact">Ask us to source it</ButtonLink>
              </div>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {shown.map((product, i) => (
                <ProductCard key={product.slug} product={product} priority={i < 4} />
              ))}
            </div>

            {visible < results.length ? (
              <div className="mt-14 flex flex-col items-center gap-3">
                <p className="text-[0.8125rem] text-ink-500">
                  Showing {shown.length} of {results.length}
                </p>
                <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  Load more products
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* Mobile filter sheet */}
      <div
        className={cx("fixed inset-0 z-100 lg:hidden", sheetOpen ? "" : "pointer-events-none")}
        aria-hidden={!sheetOpen}
      >
        <button
          type="button"
          aria-label="Close filters"
          tabIndex={sheetOpen ? 0 : -1}
          onClick={() => setSheetOpen(false)}
          className={cx(
            "absolute inset-0 bg-ink-950/40 transition-opacity duration-300",
            sheetOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal={sheetOpen}
          aria-label="Filters"
          className={cx(
            "absolute inset-x-0 bottom-0 flex max-h-[86dvh] flex-col rounded-t-[20px] bg-white transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
            sheetOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
            <h2 className="font-display text-lg text-ink-900">Refine</h2>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              tabIndex={sheetOpen ? 0 : -1}
              aria-label="Close filters"
              className="rounded-full p-2 text-ink-600 transition-colors hover:bg-ink-100"
            >
              <Close width={20} height={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">{facets}</div>
          <div className="grid grid-cols-2 gap-3 border-t border-ink-200 p-4">
            <Button variant="outline" onClick={clearAll} tabIndex={sheetOpen ? 0 : -1}>
              Clear all
            </Button>
            <Button onClick={() => setSheetOpen(false)} tabIndex={sheetOpen ? 0 : -1}>
              Show {results.length} results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
