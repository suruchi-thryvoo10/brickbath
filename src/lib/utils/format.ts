const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return inr.format(value);
}

/** ₹1,45,000 → "₹1.45 L"; used where space is tight. */
export function formatPriceShort(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2).replace(/\.00$/, "")} L`;
  return inr.format(value);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const availabilityLabel: Record<string, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "made-to-order": "Made to order",
  "pre-order": "Pre-order",
};

export const availabilityTone: Record<string, string> = {
  "in-stock": "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  "low-stock": "bg-amber-50 text-amber-900 ring-amber-600/25",
  "made-to-order": "bg-ink-100 text-ink-700 ring-ink-500/20",
  "pre-order": "bg-sky-50 text-sky-900 ring-sky-600/20",
};

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
