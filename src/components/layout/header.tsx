"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { SearchDialog } from "@/components/layout/search-dialog";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Close,
  Heart,
  Menu,
  Phone,
  Scale,
  Search as SearchIcon,
  Sparkle,
} from "@/components/ui/icons";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { primaryNav, site } from "@/lib/site";
import { useShop } from "@/lib/store/shop-store";
import { cx } from "@/lib/utils/format";

const MEGA: Record<string, "categories" | "collections" | null> = {
  "/categories": "categories",
  "/collections": "collections",
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const { wishlist, compare, ready } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = (href: string) => {
    window.clearTimeout(closeTimer.current);
    setMega(MEGA[href] ? href : null);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMega(null), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-[8px] focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-sm focus:text-ink-50"
      >
        Skip to content
      </a>

      {/* Utility strip */}
      <div className="hidden bg-ink-900 text-ink-300 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-[0.75rem]">
          <p className="flex items-center gap-2">
            <Sparkle width={14} height={14} className="text-brass-400" />
            Free site visit and firm quote across Bhubaneswar, Cuttack & Puri
          </p>
          <div className="flex items-center gap-5">
            <Link href="/showrooms" className="transition-colors hover:text-ink-50">
              5 showrooms
            </Link>
            <Link href="/enquiries" className="transition-colors hover:text-ink-50">
              Track enquiry
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 font-medium text-ink-100 transition-colors hover:text-brass-300"
            >
              <Phone width={13} height={13} />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cx(
          "sticky top-0 z-90 border-b transition-all duration-300",
          scrolled
            ? "border-ink-200/80 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70"
            : "border-transparent bg-white",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((link) => (
                <li
                  key={link.href}
                  onMouseEnter={() => openMega(link.href)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    aria-expanded={MEGA[link.href] ? mega === link.href : undefined}
                    onFocus={() => openMega(link.href)}
                    className={cx(
                      "relative flex h-10 items-center rounded-[8px] px-3.5 text-[0.875rem] transition-colors",
                      isActive(link.href)
                        ? "text-ink-900"
                        : "text-ink-600 hover:text-ink-900",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        "absolute inset-x-3.5 bottom-1 h-px origin-left bg-brass-600 transition-transform duration-300",
                        isActive(link.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="flex size-10 items-center justify-center rounded-[9px] text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <SearchIcon width={19} height={19} />
            </button>

            <HeaderIconLink
              href="/wishlist"
              label="Wishlist"
              count={ready ? wishlist.length : 0}
            >
              <Heart width={19} height={19} />
            </HeaderIconLink>

            <HeaderIconLink href="/compare" label="Compare" count={ready ? compare.length : 0}>
              <Scale width={19} height={19} />
            </HeaderIconLink>

            <ButtonLink href="/quote" size="sm" className="ml-2 hidden md:inline-flex">
              Get a quote
            </ButtonLink>

            <Button
              variant="ghost"
              size="sm"
              className="ml-1 !px-2 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu width={22} height={22} />
            </Button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          onMouseEnter={() => window.clearTimeout(closeTimer.current)}
          onMouseLeave={scheduleClose}
          className={cx(
            "absolute inset-x-0 top-full hidden overflow-hidden border-b border-ink-200 bg-white shadow-soft transition-all duration-300 lg:block",
            mega && MEGA[mega] ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <div className="container-page py-8">
            {mega === "/categories" ? <CategoriesMega /> : null}
            {mega === "/collections" ? <CollectionsMega /> : null}
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function HeaderIconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative flex size-10 items-center justify-center rounded-[9px] text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
      aria-label={count > 0 ? `${label}, ${count} items` : label}
    >
      {children}
      {count > 0 ? (
        <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-brass-600 px-1 text-[0.5625rem] font-bold leading-4 text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

function CategoriesMega() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/categories/${c.slug}`}
              className="group flex items-baseline justify-between gap-4 rounded-[8px] px-3 py-2.5 transition-colors hover:bg-ink-50"
            >
              <span>
                <span className="block text-sm font-medium text-ink-900">{c.name}</span>
                <span className="block text-xs text-ink-500">{c.tagline}</span>
              </span>
              <span className="text-xs text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brass-600">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/finder"
        className="group relative col-span-4 flex flex-col justify-end overflow-hidden rounded-[14px] bg-ink-900 p-6 text-ink-50"
      >
        <Image
          src={categories[0].image}
          alt=""
          fill
          sizes="320px"
          className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="relative">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brass-300">
            Not sure where to start
          </p>
          <p className="mt-2 font-display text-xl leading-snug">Find the right product in six questions</p>
          <p className="mt-2 text-[0.8125rem] text-ink-300">Guided selector →</p>
        </div>
      </Link>
    </div>
  );
}

function CollectionsMega() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {collections.map((c) => (
        <Link
          key={c.slug}
          href={`/collections/${c.slug}`}
          className="group overflow-hidden rounded-[14px] border border-ink-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
        >
          <span className="relative block aspect-16/10 overflow-hidden bg-ink-100">
            <Image
              src={c.image}
              alt=""
              fill
              sizes="(min-width:1024px) 22vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </span>
          <span className="block p-4">
            <span className="block font-display text-base text-ink-900">{c.name}</span>
            <span className="mt-0.5 block text-xs text-ink-500">{c.subtitle}</span>
            <span className="mt-2.5 block text-[0.8125rem] font-medium text-brass-700">
              From ₹{(c.priceFrom / 100000).toFixed(2).replace(/\.00$/, "")} L
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cx(
        "fixed inset-0 z-100 lg:hidden",
        open ? "" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cx(
          "absolute inset-0 bg-ink-950/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Menu"
        className={cx(
          "absolute right-0 top-0 flex h-dvh w-[min(22rem,88vw)] flex-col bg-white shadow-lift transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            aria-label="Close menu"
            className="rounded-full p-2 text-ink-600 transition-colors hover:bg-ink-100"
          >
            <Close width={20} height={20} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-4">
          <ul>
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline justify-between rounded-[10px] px-4 py-3.5 transition-colors hover:bg-ink-50"
                >
                  <span className="font-display text-lg text-ink-900">{link.label}</span>
                  <span className="text-xs text-ink-400">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-ink-200 px-4 pt-4">
            <p className="eyebrow mb-3">Shop by category</p>
            <ul className="grid grid-cols-2 gap-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    tabIndex={open ? 0 : -1}
                    className="block rounded-[8px] py-2 text-[0.8125rem] text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 border-t border-ink-200 px-4 pt-4">
            <ul className="grid gap-1 text-[0.875rem] text-ink-600">
              {[
                { label: "Find the right product", href: "/finder" },
                { label: "Wishlist", href: "/wishlist" },
                { label: "Compare", href: "/compare" },
                { label: "Track an enquiry", href: "/enquiries" },
                { label: "Showrooms", href: "/showrooms" },
                { label: "FAQ", href: "/faq" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    tabIndex={open ? 0 : -1}
                    className="block py-2 transition-colors hover:text-ink-900"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="grid gap-2 border-t border-ink-200 p-4">
          <ButtonLink href="/quote" size="md" tabIndex={open ? 0 : -1}>
            Get a quote
          </ButtonLink>
          <ButtonLink href={`tel:${site.phone}`} variant="outline" size="md" tabIndex={open ? 0 : -1}>
            <Phone width={16} height={16} />
            {site.phoneDisplay}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
