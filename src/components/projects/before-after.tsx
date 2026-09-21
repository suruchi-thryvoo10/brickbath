"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cx } from "@/lib/utils/format";

/**
 * Before/after comparison. Pointer-draggable, and the handle is a real range
 * input so it works with a keyboard and reads correctly to assistive tech.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  className,
  priority = false,
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [position, setPosition] = useState(52);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={frame}
      className={cx(
        "group relative select-none overflow-hidden rounded-[16px] bg-ink-100",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
    >
      <Image
        src={after}
        alt={`${alt} — after renovation`}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="(min-width:1024px) 50vw, 100vw"
        className="object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} — before renovation`}
          fill
          loading="lazy"
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover grayscale-[0.25]"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-ink-900 backdrop-blur-sm">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_12px_rgb(0_0_0/0.35)]"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-800 shadow-lift">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7 4.5 12 9 17M15 7l4.5 5-4.5 5" />
          </svg>
        </span>
      </div>

      <label className="sr-only" htmlFor={`ba-${alt.replace(/\s+/g, "-")}`}>
        Reveal before and after for {alt}
      </label>
      <input
        id={`ba-${alt.replace(/\s+/g, "-")}`}
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
        aria-valuetext={`${Math.round(position)}% before`}
      />
    </div>
  );
}
