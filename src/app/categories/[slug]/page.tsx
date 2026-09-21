import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/catalog/product-catalog";
import { PageHero } from "@/components/layout/page-hero";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "@/components/ui/icons";
import { BreadcrumbJsonLd, ProductCardSkeleton, Section } from "@/components/ui/primitives";
import { categories, getCategory } from "@/lib/data/categories";
import { productsByCategory } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { formatPrice, pluralize } from "@/lib/utils/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: `${category.name} · ${site.name}`,
      description: category.description,
      images: [{ url: category.image, width: 1200, height: 1500, alt: category.name }],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsByCategory(category.slug);
  const prices = items.map((p) => p.price);
  const cheapest = Math.min(...prices);
  const relatedProjects = projects
    .filter((p) => p.productSlugs.some((s) => items.some((i) => i.slug === s)))
    .slice(0, 3);

  const crumbs = [
    { label: "Categories", href: "/categories" },
    { label: category.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} baseUrl={site.url} />

      <PageHero
        eyebrow={category.tagline}
        title={category.name}
        intro={category.description}
        crumbs={crumbs}
        image={category.image}
        actions={
          <>
            <ButtonLink href="#catalogue" variant="secondary">
              See {pluralize(items.length, "product")}
            </ButtonLink>
            <ButtonLink
              href="/finder"
              variant="outline"
              className="border-ink-500 text-ink-100 hover:border-ink-100 hover:bg-ink-800"
            >
              <Sparkle width={16} height={16} />
              Help me choose
            </ButtonLink>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-[16px] border border-ink-700/60 bg-ink-950/40 p-6 backdrop-blur-sm">
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">From</dt>
              <dd className="mt-1 font-display text-xl text-ink-50">{formatPrice(cheapest)}</dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                Products
              </dt>
              <dd className="mt-1 font-display text-xl text-ink-50">{items.length}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                What to compare
              </dt>
              <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink-200">
                {category.highlights.join(" · ")}
              </dd>
            </div>
          </dl>
        }
      />

      <div id="catalogue" className="container-page scroll-mt-24 py-12 md:py-16">
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog
            products={items}
            lockedCategory={category.slug}
            heading={category.name.toLowerCase()}
          />
        </Suspense>
      </div>

      {relatedProjects.length > 0 ? (
        <Section tone="muted" className="!py-16">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl text-ink-900">
                {category.name} in finished rooms
              </h2>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4"
              >
                All projects
                <ArrowRight width={14} height={14} />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block rounded-[16px] border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                  >
                    <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-brass-700">
                      {project.style}
                    </p>
                    <p className="mt-2 font-display text-lg text-ink-900">{project.title}</p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">
                      {project.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <Section className="!py-14">
        <div className="container-page">
          <RecentlyViewed />
        </div>
      </Section>
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
