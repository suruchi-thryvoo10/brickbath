# Brick & Bath

A premium bathroom products and renovation website — catalogue, project gallery,
renovation collections and a full enquiry journey.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4.
Every route is statically prerendered; there is no backend in this build.

```bash
npm install
npm run dev          # http://localhost:3100
npm run build        # production build (this is what Vercel/CI runs)
npm run lint
npm run typecheck
```

> **Windows note, specific to this folder.** npm's `.bin` shims mis-parse the `&`
> in the directory name, so the plain scripts fail locally with
> `'Bath\node_modules\.bin\' is not recognized`. Use the `:win` variants —
> `build:win`, `start:win`, `lint:win`, `typecheck:win` — which invoke each
> binary by path instead. The plain scripts are left standard so Vercel's
> framework detection sees `next build` and applies the Next.js preset.
> Renaming the folder to drop the `&` removes the need for both sets.

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Hero, categories, designers' picks, collections, before/after showcase, process, reviews |
| `/products` | Full catalogue — search, 9 facet groups, sorting, load-more |
| `/products/[slug]` | Gallery + lightbox, variants with live pricing, specs, features, reviews, related, complete-the-look |
| `/categories`, `/categories/[slug]` | Category landing pages with a locked-category catalogue |
| `/collections`, `/collections/[slug]` | Four renovation packages with inclusions, gallery and comparison table |
| `/projects`, `/projects/[slug]` | Gallery filtered by style or room type; draggable before/after reveal |
| `/finder` | Six-question guided product selector |
| `/quote`, `/contact` | Enquiry forms with client-side validation |
| `/compare` | Up to four products side by side, with a "differences only" filter |
| `/wishlist`, `/enquiries` | Device-local saved products and enquiry tracking |
| `/showrooms` | Five locations with directions and services |
| `/about`, `/faq` | Company, process, warranty and help content |

## Architecture

```
src/
  app/            One folder per route; server components by default
  components/
    catalog/      Search, facets and the product grid
    compare/      Comparison table
    finder/       Guided selector
    forms/        Field kit and the shared enquiry form
    layout/       Header, mega menu, search dialog, footer, floating CTAs
    product/      Card, rail, gallery, buy panel, recently viewed
    projects/     Before/after slider, filterable gallery
    shared/       Testimonials, wishlist, enquiry tracker
    ui/           Buttons, primitives, accordion, icons
  lib/
    data/         Typed catalogue: products, categories, collections, projects, content
    store/        Client store (wishlist, compare, recently viewed, enquiries)
    utils/        Formatting, search/filter/sort engine, validation
    site.ts       Brand constants and navigation
```

**Data.** `lib/data/*` is shaped the way a CMS or PIM would return it, so search,
facets, compare and the PDP all read through the same helpers. Swapping in a real
API means replacing those modules, not the components.

**Images.** All photography is served from Unsplash's CDN through `next/image`
(AVIF/WebP, responsive `sizes`, lazy below the fold). `lib/data/images.ts` is the
single place to point at a real DAM later.

**Client state.** Wishlist, compare, recently viewed, the enquiry basket and
submitted enquiries live in one reducer behind `ShopProvider`, persisted to
`localStorage` and guarded by a `ready` flag so nothing flashes or overwrites on
first paint. Enquiries are recorded locally; a real deployment would POST the
same payload.

**Catalogue URL state.** Filters, query and sort serialise into the query string,
so any filtered view is linkable and survives a reload.

## Accessibility & performance notes

- Skip link, visible focus rings, labelled controls, `aria-pressed` on toggles,
  live regions on result counts, and real `<table>` semantics in the comparison.
- Scroll reveals use CSS scroll-driven animations with a `prefers-reduced-motion`
  opt-out — no JavaScript touches the DOM, so nothing can diverge on hydration.
- Every page ships `metadata` with a canonical URL and Open Graph tags; the site
  emits JSON-LD for the organisation, products, breadcrumbs, FAQs and showrooms,
  plus `sitemap.xml` and `robots.txt`.
- Personal pages (`/compare`, `/wishlist`, `/enquiries`) are excluded from
  indexing.

## Content

Products, projects, reviews and copy are fictional, written for this build. The
brand is inspired by bricknbath.com but shares none of its markup or assets.
