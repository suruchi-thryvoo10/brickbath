"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/ui/icons";
import { cx } from "@/lib/utils/format";

export function FacetGroup({
  title,
  values,
  selected,
  counts,
  onToggle,
  labels,
  defaultOpen = true,
  collapseAfter = 6,
}: {
  title: string;
  values: string[];
  selected: string[];
  counts?: Record<string, number>;
  onToggle: (value: string) => void;
  /** Display names when the facet values are slugs or enum keys. */
  labels?: Record<string, string>;
  defaultOpen?: boolean;
  collapseAfter?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? values : values.slice(0, collapseAfter);

  if (values.length === 0) return null;

  return (
    <div className="border-b border-ink-200 py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-700">
          {title}
          {selected.length > 0 ? (
            <span className="ml-2 rounded-full bg-ink-900 px-1.5 py-0.5 text-[0.625rem] text-ink-50">
              {selected.length}
            </span>
          ) : null}
        </span>
        <ChevronDown
          width={16}
          height={16}
          className={cx("text-ink-400 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="mt-3 space-y-0.5">
          {visible.map((value) => {
            const count = counts?.[value];
            const disabled = counts !== undefined && !count && !selected.includes(value);
            return (
              <label
                key={value}
                className={cx(
                  "flex cursor-pointer items-center gap-2.5 rounded-[7px] px-1.5 py-1.5 text-[0.8125rem] transition-colors",
                  disabled ? "cursor-not-allowed opacity-40" : "hover:bg-ink-50",
                )}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(value)}
                  disabled={disabled}
                  onChange={() => onToggle(value)}
                  className="size-4 shrink-0 rounded-[4px] border-ink-300 text-ink-900 accent-ink-900"
                />
                <span className="flex-1 text-ink-700">{labels?.[value] ?? value}</span>
                {count !== undefined ? (
                  <span className="text-[0.6875rem] tabular-nums text-ink-400">{count}</span>
                ) : null}
              </label>
            );
          })}

          {values.length > collapseAfter ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-1 px-1.5 text-[0.75rem] font-medium text-brass-700 underline underline-offset-4"
            >
              {showAll ? "Show less" : `Show ${values.length - collapseAfter} more`}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function PriceFilter({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number | undefined, number | undefined];
  onChange: (next: [number | undefined, number | undefined]) => void;
}) {
  const presets: { label: string; range: [number | undefined, number | undefined] }[] = [
    { label: "Under ₹10,000", range: [undefined, 10000] },
    { label: "₹10,000 – ₹40,000", range: [10000, 40000] },
    { label: "₹40,000 – ₹1,00,000", range: [40000, 100000] },
    { label: "Over ₹1,00,000", range: [100000, undefined] },
  ];

  return (
    <div className="border-b border-ink-200 py-4">
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-700">Price</p>
      <div className="mt-3 space-y-0.5">
        {presets.map((p) => {
          const active = value[0] === p.range[0] && value[1] === p.range[1];
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange(active ? [undefined, undefined] : p.range)}
              aria-pressed={active}
              className={cx(
                "block w-full rounded-[7px] px-1.5 py-1.5 text-left text-[0.8125rem] transition-colors",
                active ? "bg-ink-900 text-ink-50" : "text-ink-700 hover:bg-ink-50",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <label className="sr-only" htmlFor="price-min">
          Minimum price
        </label>
        <input
          id="price-min"
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          placeholder="Min"
          value={value[0] ?? ""}
          onChange={(e) =>
            onChange([e.target.value ? Number(e.target.value) : undefined, value[1]])
          }
          className="h-9 w-full rounded-[8px] border border-ink-200 px-2.5 text-[0.8125rem] outline-none transition-colors focus:border-ink-900"
        />
        <span className="text-ink-400">–</span>
        <label className="sr-only" htmlFor="price-max">
          Maximum price
        </label>
        <input
          id="price-max"
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          placeholder="Max"
          value={value[1] ?? ""}
          onChange={(e) =>
            onChange([value[0], e.target.value ? Number(e.target.value) : undefined])
          }
          className="h-9 w-full rounded-[8px] border border-ink-200 px-2.5 text-[0.8125rem] outline-none transition-colors focus:border-ink-900"
        />
      </div>
    </div>
  );
}
