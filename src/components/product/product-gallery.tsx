"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/icons";
import { cx } from "@/lib/utils/format";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => setIndex((next + images.length) % images.length);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, index, images.length]);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      <ul className="flex gap-3 overflow-x-auto no-scrollbar md:w-20 md:flex-col md:overflow-visible">
        {images.map((src, i) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className={cx(
                "relative block size-18 overflow-hidden rounded-[10px] ring-1 transition-all duration-200 md:w-full",
                i === index
                  ? "ring-2 ring-ink-900"
                  : "opacity-70 ring-ink-200 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                loading="lazy"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <div ref={mainRef} className="relative flex-1 overflow-hidden rounded-[16px] bg-ink-100">
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="group relative block aspect-4/5 w-full cursor-zoom-in md:aspect-square"
          aria-label={`Enlarge image ${index + 1} of ${images.length}`}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? name : `${name} — view ${i + 1}`}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="(min-width:1024px) 46vw, 100vw"
              className={cx(
                "object-cover transition-opacity duration-500",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </button>

        {images.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <GalleryArrow direction="prev" onClick={() => go(index - 1)} />
            <GalleryArrow direction="next" onClick={() => go(index + 1)} />
          </div>
        ) : null}

        <p className="absolute bottom-3 right-3 rounded-full bg-ink-900/70 px-2.5 py-1 text-[0.6875rem] font-medium text-ink-50 backdrop-blur-sm">
          {index + 1} / {images.length}
        </p>
      </div>

      {zoom ? (
        <div
          className="fixed inset-0 z-120 flex items-center justify-center bg-ink-950/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — enlarged image`}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <Close width={20} height={20} />
          </button>
          <div className="relative h-[min(86vh,86vw)] w-[min(86vh,86vw)]">
            <Image
              src={images[index]}
              alt={`${name} — view ${index + 1}`}
              fill
              sizes="86vw"
              className="object-contain"
            />
          </div>
          {images.length > 1 ? (
            <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 justify-between">
              <GalleryArrow direction="prev" onClick={() => go(index - 1)} dark />
              <GalleryArrow direction="next" onClick={() => go(index + 1)} dark />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function GalleryArrow({
  direction,
  onClick,
  dark = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  dark?: boolean;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={cx(
        "pointer-events-auto flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-105",
        dark
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-white/90 text-ink-800 shadow-soft ring-1 ring-ink-200",
      )}
    >
      <Icon width={18} height={18} />
    </button>
  );
}
