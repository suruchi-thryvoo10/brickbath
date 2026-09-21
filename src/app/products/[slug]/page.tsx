import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPanel } from "@/components/product/product-panel";
import { ProductRail } from "@/components/product/product-rail";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { ButtonLink } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";
import {
  BreadcrumbJsonLd,
  Breadcrumbs,
  Rating,
  Section,
} from "@/components/ui/primitives";
import { getCategory } from "@/lib/data/categories";
import { testimonials } from "@/lib/data/content";
import {
  completeTheLook,
  getProduct,
  products,
  relatedProducts,
} from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { availabilityLabel, formatDate, formatPrice } from "@/lib/utils/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.brand}`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} · ${site.name}`,
      description: product.summary,
      images: [{ url: product.images[0], width: 1400, height: 1750, alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(product, 8);
  const complete = completeTheLook(product, 4);
  const inProjects = projects.filter((p) => p.productSlugs.includes(product.slug));
  const reviews = testimonials.slice(0, 3);

  const crumbs = [
    { label: "Products", href: "/products" },
    ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
    { label: product.name },
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: product.brand },
    category: category?.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : product.availability === "low-stock"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/PreOrder",
      url: `${site.url}/products/${product.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <BreadcrumbJsonLd items={crumbs} baseUrl={site.url} />

      <div className="container-page pt-6">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="container-page grid gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <ProductGallery images={product.images} name={product.name} />
        <ProductPanel product={product} />
      </section>

      {/* Detail: description, features, specs */}
      <Section tone="muted" className="!py-16">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl text-ink-900">About this product</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-700">
              {product.description}
            </p>

            <h3 className="mt-10 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink-500">
              What makes it worth the money
            </h3>
            <ul className="mt-4 grid gap-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                  <Check width={18} height={18} className="mt-0.5 shrink-0 text-brass-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <DetailTile label="Finishes" value={product.finishes.join(", ")} />
              <DetailTile label="Materials" value={product.materials.join(", ")} />
              <DetailTile label="Best suited to" value={product.rooms.join(", ")} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-2xl text-ink-900">Specifications</h2>
            <dl className="mt-5 overflow-hidden rounded-[14px] border border-ink-200 bg-white">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-baseline justify-between gap-6 px-5 py-3.5 text-[0.875rem] ${
                    i % 2 ? "bg-ink-50/60" : ""
                  }`}
                >
                  <dt className="text-ink-500">{spec.label}</dt>
                  <dd className="text-right font-medium text-ink-900">{spec.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 border-t border-ink-200 px-5 py-3.5 text-[0.875rem]">
                <dt className="text-ink-500">Warranty</dt>
                <dd className="text-right font-medium text-ink-900">
                  {product.warrantyYears} years
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 px-5 py-3.5 text-[0.875rem]">
                <dt className="text-ink-500">Availability</dt>
                <dd className="text-right font-medium text-ink-900">
                  {availabilityLabel[product.availability]}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-[14px] border border-ink-200 bg-white p-6">
              <h3 className="font-sans text-[0.9375rem] font-semibold text-ink-900">
                Need it specified into a room?
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                Our designers will check this works with your pressure, your rough-in and the rest
                of your selections before you buy.
              </p>
              <ButtonLink
                href={`/quote?product=${encodeURIComponent(product.name)}`}
                className="mt-4 w-full"
              >
                Ask a designer
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Used in these projects */}
      {inProjects.length > 0 ? (
        <Section className="!py-16">
          <div className="container-page">
            <h2 className="text-2xl text-ink-900">Used in these projects</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {inProjects.slice(0, 3).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block overflow-hidden rounded-[16px] border border-ink-200 transition-all duration-400 hover:-translate-y-1 hover:shadow-soft"
                  >
                    <span className="relative block aspect-16/10 overflow-hidden bg-ink-100">
                      <Image
                        src={project.afterImage}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="(min-width:1024px) 30vw, 92vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span className="block p-5">
                      <span className="block font-display text-lg text-ink-900">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-ink-500">
                        {project.location} · {project.style}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Reviews */}
      <Section tone="sand" className="!py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl text-ink-900">What owners say</h2>
              <div className="mt-2 flex items-center gap-3">
                <Rating value={product.rating} count={product.reviewCount} size={16} />
              </div>
            </div>
            <p className="text-[0.8125rem] text-ink-600">
              Verified after delivery · {formatPrice(product.price)} at time of review
            </p>
          </div>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-[16px] border border-ink-200 bg-white p-6"
              >
                <Rating value={review.rating} showValue={false} size={14} />
                <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  “{review.quote}”
                </blockquote>
                <p className="mt-4 text-[0.8125rem] font-medium text-ink-900">{review.name}</p>
                <p className="text-[0.75rem] text-ink-500">
                  {review.location} · {formatDate(review.date)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Related + complete the look */}
      <Section className="!py-16">
        <div className="container-page grid gap-16">
          {related.length > 0 ? (
            <ProductRail products={related} label="You might also consider" />
          ) : null}
          {complete.length > 0 ? (
            <ProductRail products={complete} label="Complete the room" />
          ) : null}
          <RecentlyViewed excludeSlug={product.slug} />
        </div>
      </Section>
    </>
  );
}

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-ink-200 bg-white p-4">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
        {label}
      </p>
      <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-800">{value}</p>
    </div>
  );
}
