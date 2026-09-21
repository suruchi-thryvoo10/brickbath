import type { Product } from "@/lib/data/types";

export type SortKey =
  | "relevance"
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export type Filters = {
  q: string;
  categories: string[];
  brands: string[];
  finishes: string[];
  styles: string[];
  materials: string[];
  rooms: string[];
  availability: string[];
  priceTiers: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onlyOffers?: boolean;
};

export const emptyFilters: Filters = {
  q: "",
  categories: [],
  brands: [],
  finishes: [],
  styles: [],
  materials: [],
  rooms: [],
  availability: [],
  priceTiers: [],
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** A product's searchable text, computed once per product. */
const haystacks = new WeakMap<Product, string>();

function haystack(product: Product): string {
  let value = haystacks.get(product);
  if (!value) {
    value = normalise(
      [
        product.name,
        product.brand,
        product.subCategory,
        product.category.replace(/-/g, " "),
        product.summary,
        product.finishes.join(" "),
        product.styles.join(" "),
        product.materials.join(" "),
        product.rooms.join(" "),
        product.badges?.join(" ") ?? "",
        product.specs.map((s) => `${s.label} ${s.value}`).join(" "),
      ].join(" "),
    );
    haystacks.set(product, value);
  }
  return value;
}

/**
 * Token-AND scoring: every term must appear somewhere, and matches in the
 * name/brand outrank matches buried in the spec table.
 */
export function scoreProduct(product: Product, query: string): number {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return 1;

  const hay = haystack(product);
  const name = normalise(product.name);
  const brand = normalise(product.brand);
  const sub = normalise(product.subCategory);

  let score = 0;
  for (const term of terms) {
    if (!hay.includes(term)) return 0;
    if (name.startsWith(term)) score += 12;
    else if (name.includes(term)) score += 8;
    if (brand.includes(term)) score += 4;
    if (sub.includes(term)) score += 5;
    score += 1;
  }
  score += product.rating;
  if (product.featured) score += 1.5;
  return score;
}

function has(list: string[], values: string[]): boolean {
  return list.length === 0 || values.some((v) => list.includes(v));
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    if (!has(filters.categories, [p.category])) return false;
    if (!has(filters.brands, [p.brand])) return false;
    if (!has(filters.finishes, p.finishes)) return false;
    if (!has(filters.styles, p.styles)) return false;
    if (!has(filters.materials, p.materials)) return false;
    if (!has(filters.rooms, p.rooms)) return false;
    if (!has(filters.availability, [p.availability])) return false;
    if (!has(filters.priceTiers, [p.priceTier])) return false;
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.minRating !== undefined && p.rating < filters.minRating) return false;
    if (filters.onlyOffers && !p.compareAtPrice) return false;
    if (filters.q.trim() && scoreProduct(p, filters.q) === 0) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortKey, query = ""): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "newest":
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "featured":
      return list.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)) ||
          b.rating - a.rating,
      );
    case "relevance":
    default:
      if (!query.trim()) {
        return list.sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating,
        );
      }
      return list.sort((a, b) => scoreProduct(b, query) - scoreProduct(a, query));
  }
}

/** Counts for each facet value, computed against everything *except* that facet. */
export function facetCounts(
  products: Product[],
  filters: Filters,
  key: keyof Filters,
  valuesOf: (p: Product) => string[],
): Record<string, number> {
  const scoped = filterProducts(products, { ...filters, [key]: [] } as Filters);
  const counts: Record<string, number> = {};
  for (const p of scoped) {
    for (const v of valuesOf(p)) counts[v] = (counts[v] ?? 0) + 1;
  }
  return counts;
}

export function activeFilterCount(filters: Filters): number {
  return (
    filters.categories.length +
    filters.brands.length +
    filters.finishes.length +
    filters.styles.length +
    filters.materials.length +
    filters.rooms.length +
    filters.availability.length +
    filters.priceTiers.length +
    (filters.minPrice !== undefined || filters.maxPrice !== undefined ? 1 : 0) +
    (filters.minRating !== undefined ? 1 : 0) +
    (filters.onlyOffers ? 1 : 0)
  );
}
