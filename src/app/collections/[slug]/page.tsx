import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { ProductRail } from "@/components/product/product-rail";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Check, Clock, Ruler, Sparkle } from "@/components/ui/icons";
import { BreadcrumbJsonLd, Section } from "@/components/ui/primitives";
import { collections, getCollection } from "@/lib/data/collections";
import { processSteps } from "@/lib/data/content";
import { getProducts } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { formatPriceShort } from "@/lib/utils/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };

  return {
    title: `${collection.name} Collection — ${collection.positioning}`,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} Collection · ${site.name}`,
      description: collection.description,
      images: [{ url: collection.image, width: 1400, height: 1750, alt: collection.name }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProducts(collection.productSlugs);
  const built = projects.filter((p) => p.collection === collection.slug);
  const others = collections.filter((c) => c.slug !== collection.slug);

  const crumbs = [
    { label: "Collections", href: "/collections" },
    { label: collection.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} baseUrl={site.url} />

      <PageHero
        eyebrow={collection.subtitle}
        title={`${collection.name} Collection`}
        intro={collection.description}
        crumbs={crumbs}
        image={collection.image}
        actions={
          <>
            <ButtonLink href="/quote" variant="secondary" size="lg">
              Quote me this collection
            </ButtonLink>
            <ButtonLink
              href="/collections"
              variant="outline"
              size="lg"
              className="border-ink-500 text-ink-100 hover:border-ink-100 hover:bg-ink-800"
            >
              Compare all four
            </ButtonLink>
          </>
        }
        aside={
          <dl className="grid gap-4 rounded-[16px] border border-ink-700/60 bg-ink-950/40 p-6 backdrop-blur-sm sm:w-72">
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                Typical range
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink-50">
                {formatPriceShort(collection.priceFrom)} – {formatPriceShort(collection.priceTo)}
              </dd>
            </div>
            <div className="flex items-center gap-2 text-[0.875rem] text-ink-200">
              <Clock width={15} height={15} className="text-brass-400" />
              {collection.durationDays} on site
            </div>
            <div className="flex items-start gap-2 text-[0.875rem] text-ink-200">
              <Ruler width={15} height={15} className="mt-0.5 shrink-0 text-brass-400" />
              {collection.idealFor}
            </div>
          </dl>
        }
      />

      {/* Inclusions & upgrades */}
      <Section className="!py-16">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl text-ink-900">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3">
              {collection.inclusions.map((inclusion) => (
                <li
                  key={inclusion}
                  className="flex items-start gap-3 border-b border-ink-100 pb-3 text-[0.9375rem] text-ink-700 last:border-b-0"
                >
                  <Check width={18} height={18} className="mt-0.5 shrink-0 text-brass-600" />
                  {inclusion}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[16px] border border-ink-200 bg-ink-50 p-7">
              <h3 className="flex items-center gap-2 font-sans text-[0.9375rem] font-semibold text-ink-900">
                <Sparkle width={17} height={17} className="text-brass-600" />
                Common upgrades
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {collection.upgrades.map((upgrade) => (
                  <li key={upgrade} className="text-[0.875rem] text-ink-700">
                    · {upgrade}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-600">
                Upgrades are priced as line items on your quote, so you can add or remove them
                without renegotiating the whole job.
              </p>
            </div>

            <div className="mt-6 rounded-[16px] border border-ink-200 p-7">
              <h3 className="font-sans text-[0.9375rem] font-semibold text-ink-900">
                What isn&apos;t included — in any collection
              </h3>
              <ul className="mt-4 grid gap-2.5 text-[0.875rem] leading-relaxed text-ink-600">
                <li>· Structural work, if the engineer flags it</li>
                <li>· Relocating a soil stack</li>
                <li>· Electrical work beyond the bathroom&apos;s own circuit</li>
              </ul>
              <p className="mt-4 text-[0.8125rem] text-ink-500">
                We call these out at survey, before you sign — never mid-build.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section tone="muted" className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">The look</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collection.gallery.map((src, i) => (
              <li
                key={src}
                className="reveal relative aspect-4/5 overflow-hidden rounded-[14px] bg-ink-100"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <Image
                  src={src}
                  alt={`${collection.name} collection detail ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="(min-width:1024px) 23vw, (min-width:640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Products */}
      {products.length > 0 ? (
        <Section className="!py-16">
          <div className="container-page">
            <ProductRail
              products={products}
              label={`Specified in ${collection.name}`}
              action={
                <Link
                  key="collection-browse-all"
                  href="/products"
                  className="hidden text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4 sm:inline"
                >
                  Browse all
                </Link>
              }
            />
          </div>
        </Section>
      ) : null}

      {/* Projects built in this collection */}
      {built.length > 0 ? (
        <Section tone="sand" className="!py-16">
          <div className="container-page">
            <h2 className="text-2xl text-ink-900">Built in {collection.name}</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {built.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block overflow-hidden rounded-[16px] bg-white transition-all duration-400 hover:-translate-y-1 hover:shadow-soft"
                  >
                    <span className="relative block aspect-16/10 overflow-hidden bg-ink-100">
                      <Image
                        src={project.afterImage}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="(min-width:768px) 30vw, 92vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span className="block p-5">
                      <span className="block font-display text-lg text-ink-900">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-ink-500">
                        {project.location} · {project.durationDays} days
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Process reminder */}
      <Section className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">How a {collection.name} build runs</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.step} className="rounded-[14px] border border-ink-200 p-5">
                <span className="font-display text-2xl text-brass-500">{step.step}</span>
                <h3 className="mt-2 font-sans text-[0.9375rem] font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-600">
                  {step.duration}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Other collections */}
      <Section tone="dark" className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-50">Other collections</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/collections/${other.slug}`}
                  className="group flex h-full flex-col rounded-[16px] border border-ink-700/60 bg-ink-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50"
                >
                  <span className="font-display text-xl text-ink-50">{other.name}</span>
                  <span className="mt-1 text-[0.75rem] uppercase tracking-[0.12em] text-brass-400">
                    {other.subtitle}
                  </span>
                  <span className="mt-4 flex-1 text-[0.875rem] text-ink-400">
                    {other.positioning}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-200">
                    From {formatPriceShort(other.priceFrom)}
                    <ArrowRight
                      width={14}
                      height={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
