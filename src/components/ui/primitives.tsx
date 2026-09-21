import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, Star } from "@/components/ui/icons";
import { cx } from "@/lib/utils/format";

/* ------------------------------------------------------------------ section */

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "dark" | "sand";
}) {
  const tones = {
    default: "",
    muted: "bg-ink-50",
    sand: "bg-brass-100/45",
    dark: "bg-ink-900 text-ink-100",
  } as const;
  return (
    <section id={id} className={cx("py-18 md:py-24 lg:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  action,
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cx("max-w-2xl reveal", align === "center" && "mx-auto text-center")}>
        {eyebrow ? (
          <p className={cx("eyebrow mb-3", tone === "dark" && "text-brass-400")}>{eyebrow}</p>
        ) : null}
        <h2
          className={cx(
            "text-[clamp(1.75rem,3.4vw,2.85rem)] leading-[1.08]",
            tone === "dark" ? "text-ink-50" : "text-ink-900",
          )}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={cx(
              "mt-4 text-[0.975rem] leading-relaxed md:text-base",
              tone === "dark" ? "text-ink-300" : "text-ink-600",
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 reveal">{action}</div> : null}
    </div>
  );
}

/* -------------------------------------------------------------------- badge */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brass" | "dark" | "success" | "offer";
  className?: string;
}) {
  const tones = {
    neutral: "bg-white/85 text-ink-700 ring-ink-300/70",
    brass: "bg-brass-100 text-brass-700 ring-brass-400/50",
    dark: "bg-ink-900 text-ink-50 ring-ink-900",
    success: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
    offer: "bg-[#b4442f] text-white ring-[#b4442f]",
  } as const;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide ring-1 ring-inset backdrop-blur-sm",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------- rating */

export function Rating({
  value,
  count,
  size = 14,
  showValue = true,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <span className={cx("inline-flex items-center gap-1.5", className)}>
      <span className="flex text-brass-600" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={i <= rounded} width={size} height={size} />
        ))}
      </span>
      <span className="sr-only">
        Rated {value} out of 5{count ? ` from ${count} reviews` : ""}
      </span>
      {showValue ? (
        <span className="text-xs font-medium text-ink-600" aria-hidden="true">
          {value.toFixed(1)}
          {count ? ` (${count})` : ""}
        </span>
      ) : null}
    </span>
  );
}

/* -------------------------------------------------------------- breadcrumbs */

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cx("text-[0.8125rem]", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-ink-500">
        <li>
          <Link href="/" className="transition-colors hover:text-ink-900">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            <ChevronRight width={14} height={14} className="text-ink-300" />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="transition-colors hover:text-ink-900">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-ink-800" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** JSON-LD for the same trail, so search engines render the breadcrumb. */
export function BreadcrumbJsonLd({ items, baseUrl }: { items: Crumb[]; baseUrl: string }) {
  const list = [{ label: "Home", href: "/" }, ...items];
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

/* ----------------------------------------------------------------- skeleton */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("skeleton rounded-[10px]", className)} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-4/5 w-full rounded-[14px]" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

/* -------------------------------------------------------------- empty state */

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center rounded-[18px] border border-dashed border-ink-200 bg-ink-50/60 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-white text-ink-400 ring-1 ring-ink-200">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg text-ink-900">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-600">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/* --------------------------------------------------------------- stat block */

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="reveal">
      <p className="font-display text-[clamp(1.85rem,3vw,2.6rem)] leading-none text-ink-900">
        {value}
      </p>
      <p className="mt-2 text-[0.8125rem] leading-snug text-ink-500">{label}</p>
    </div>
  );
}
