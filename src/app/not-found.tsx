import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { categories } from "@/lib/data/categories";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60dvh] flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1.04] text-ink-900">
        That page has been taken back to slab.
      </h1>
      <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600">
        The link is broken or the page has moved. The catalogue, the projects and the collections
        are all still where you left them.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/products" size="lg">
          Browse products
          <ArrowRight width={17} height={17} />
        </ButtonLink>
        <ButtonLink href="/" variant="outline" size="lg">
          Back to home
        </ButtonLink>
      </div>

      <div className="mt-14 border-t border-ink-200 pt-8">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
          Or jump to a category
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block rounded-full border border-ink-200 px-4 py-2 text-[0.8125rem] text-ink-700 transition-colors hover:border-ink-900 hover:bg-ink-50"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
