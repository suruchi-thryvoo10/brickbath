import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ArrowRight, categoryIcons } from "@/components/ui/icons";
import { Section } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";
import { productsByCategory } from "@/lib/data/products";
import { pluralize } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Product categories",
  description:
    "Eight bathroom categories — faucets and showers, sanitaryware, tiles, vanities, bathtubs and wellness, mirrors and lighting, accessories, and glass partitions.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Categories"
        title="Start with the part of the room you're stuck on"
        intro="Each category page explains what actually matters in that product type — the spec that decides whether you are happy in year five — then lets you filter on it."
        crumbs={[{ label: "Categories", href: "/categories" }]}
      />

      <Section className="!py-14">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2">
            {categories.map((category, i) => {
              const Icon = categoryIcons[category.icon];
              const count = productsByCategory(category.slug).length;
              return (
                <li
                  key={category.slug}
                  className="reveal"
                  style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="group grid h-full overflow-hidden rounded-[18px] border border-ink-200 transition-all duration-400 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-2"
                  >
                    <span className="relative block aspect-4/3 overflow-hidden bg-ink-100 sm:aspect-auto">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        loading={i < 2 ? "eager" : "lazy"}
                        priority={i < 2}
                        sizes="(min-width:640px) 24vw, 92vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </span>
                    <span className="flex flex-col p-6 md:p-7">
                      <span className="flex items-center gap-2.5">
                        {Icon ? (
                          <span className="flex size-8 items-center justify-center rounded-full bg-brass-100 text-brass-700">
                            <Icon width={16} height={16} />
                          </span>
                        ) : null}
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                          {pluralize(count, "product")}
                        </span>
                      </span>
                      <span className="mt-3 font-display text-xl text-ink-900">
                        {category.name}
                      </span>
                      <span className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                        {category.description}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-brass-700">
                        Browse {category.name.toLowerCase()}
                        <ArrowRight
                          width={14}
                          height={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section tone="dark" className="!py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl text-ink-50 md:text-3xl">
              Still not sure which category you need?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">
              Answer six questions about the room, the style and the budget, and we will build a
              shortlist across every category at once.
            </p>
          </div>
          <ButtonLink href="/finder" variant="secondary" size="lg">
            Try the guided finder
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
