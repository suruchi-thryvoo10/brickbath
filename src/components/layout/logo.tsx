import Link from "next/link";
import { cx } from "@/lib/utils/format";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="Brick & Bath — home"
      className={cx("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className={cx(
          "flex size-9 items-center justify-center rounded-[10px] transition-transform duration-300 group-hover:scale-105",
          tone === "dark" ? "bg-ink-900 text-brass-300" : "bg-ink-50 text-ink-900",
        )}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18M3 9V6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5V9" />
          <path d="M4.5 9v5a5.5 5.5 0 0 0 5.5 5.5h4A5.5 5.5 0 0 0 19.5 14V9" />
          <path d="M8 5V3.5M12 19.5V21M16 5V3.5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "whitespace-nowrap font-display text-[1.0625rem] tracking-tight",
            tone === "dark" ? "text-ink-900" : "text-ink-50",
          )}
        >
          Brick <span className="text-brass-600">&</span> Bath
        </span>
        <span
          className={cx(
            "mt-1 hidden whitespace-nowrap text-[0.5625rem] font-semibold uppercase tracking-[0.22em] sm:block",
            tone === "dark" ? "text-ink-400" : "text-ink-300",
          )}
        >
          Design · Supply · Build
        </span>
      </span>
    </Link>
  );
}
