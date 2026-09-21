"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Close, Phone, WhatsApp } from "@/components/ui/icons";
import { site, whatsappLink } from "@/lib/site";
import { useShop } from "@/lib/store/shop-store";
import { cx } from "@/lib/utils/format";

/**
 * Two persistent affordances that never fight each other: a contact cluster
 * bottom-right, and a compare tray that only appears once something is in it.
 */
export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const { compare, clearCompare, ready } = useShop();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showCompare = ready && compare.length > 0 && pathname !== "/compare";

  return (
    <>
      {showCompare ? (
        <div className="fixed inset-x-0 bottom-0 z-80 border-t border-ink-200 bg-white/95 px-4 py-3 shadow-[0_-8px_28px_-20px_rgb(23_20_15/0.5)] backdrop-blur-md">
          <div className="container-page flex items-center justify-between gap-4 !px-0">
            <p className="text-[0.8125rem] text-ink-600">
              <span className="font-medium text-ink-900">{compare.length}</span> selected to compare
              <span className="hidden sm:inline"> · up to 4</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearCompare}
                className="rounded-[8px] px-3 py-2 text-[0.8125rem] text-ink-500 transition-colors hover:text-ink-900"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="rounded-[9px] bg-ink-900 px-4 py-2.5 text-[0.8125rem] font-medium text-ink-50 transition-colors hover:bg-ink-800"
              >
                Compare now
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={cx(
          "fixed right-4 z-80 flex flex-col items-end gap-2 transition-all duration-400 md:right-6",
          showCompare ? "bottom-20 md:bottom-24" : "bottom-5 md:bottom-6",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div
          className={cx(
            "flex flex-col items-end gap-2 transition-all duration-300",
            expanded ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink-900 shadow-lift ring-1 ring-ink-200 transition-transform hover:-translate-y-0.5"
          >
            <Phone width={16} height={16} className="text-brass-600" />
            {site.phoneDisplay}
          </a>
          <Link
            href="/quote"
            className="flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[0.8125rem] font-medium text-ink-50 shadow-lift transition-transform hover:-translate-y-0.5"
          >
            Request a quote
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("Hi Brick & Bath — I'd like help choosing products for my bathroom.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105"
          >
            <WhatsApp width={26} height={26} />
          </a>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? "Hide contact options" : "Show contact options"}
            className="flex size-10 items-center justify-center rounded-full bg-ink-900 text-ink-50 shadow-lift transition-transform duration-300 hover:scale-105"
          >
            {expanded ? <Close width={17} height={17} /> : <Phone width={17} height={17} />}
          </button>
        </div>
      </div>
    </>
  );
}
