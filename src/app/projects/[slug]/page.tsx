import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductRail } from "@/components/product/product-rail";
import { BeforeAfter } from "@/components/projects/before-after";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Clock, Ruler } from "@/components/ui/icons";
import { Badge, BreadcrumbJsonLd, Breadcrumbs, Section } from "@/components/ui/primitives";
import { getCollection } from "@/lib/data/collections";
import { testimonials } from "@/lib/data/content";
import { getProducts } from "@/lib/data/products";
import { getProject, projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.location}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${site.name}`,
      description: project.summary,
      images: [{ url: project.afterImage, width: 1920, height: 1080, alt: project.title }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const used = getProducts(project.productSlugs);
  const collection = project.collection ? getCollection(project.collection) : undefined;
  const review = testimonials.find((t) => t.project === project.slug);
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const spend = used.reduce((sum, p) => sum + p.price, 0);

  const crumbs = [{ label: "Projects", href: "/projects" }, { label: project.title }];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} baseUrl={site.url} />

      <div className="container-page pt-6">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="container-page py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-3 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.04] text-ink-900">
              {project.title}
            </h1>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} tone="brass">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-[16px] border border-ink-200 bg-ink-50 p-6 lg:col-span-5">
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                Location
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-ink-900">
                {project.location}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">Style</dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-ink-900">{project.style}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                <Ruler width={12} height={12} />
                Area
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-ink-900">
                {project.areaSqft} sq.ft.
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                <Clock width={12} height={12} />
                On site
              </dt>
              <dd className="mt-1 text-[0.9375rem] font-medium text-ink-900">
                {project.durationDays} days
              </dd>
            </div>
            {collection ? (
              <div className="col-span-2 border-t border-ink-200 pt-4">
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
                  Collection
                </dt>
                <dd className="mt-1">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="text-[0.9375rem] font-medium text-brass-700 underline underline-offset-4"
                  >
                    {collection.name} — {collection.subtitle}
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-10">
          <BeforeAfter
            before={project.beforeImage}
            after={project.afterImage}
            alt={project.title}
            className="aspect-16/10"
            priority
          />
          <p className="mt-3 text-center text-[0.75rem] text-ink-500">
            Drag the handle to reveal the room as we found it
          </p>
        </div>
      </section>

      {/* Brief & outcome */}
      <Section tone="muted" className="!py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl text-ink-900">The brief</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-700">{project.brief}</p>
          </div>
          <div>
            <h2 className="text-2xl text-ink-900">What we did</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-700">{project.outcome}</p>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">The finished room</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <li
                key={src}
                className={`reveal relative overflow-hidden rounded-[16px] bg-ink-100 ${
                  i === 0 ? "sm:col-span-2 aspect-16/9" : "aspect-4/3"
                }`}
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <Image
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes={i === 0 ? "(min-width:640px) 92vw, 92vw" : "(min-width:640px) 46vw, 92vw"}
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Review */}
      {review ? (
        <Section tone="sand" className="!py-16">
          <div className="container-page max-w-3xl text-center">
            <blockquote className="font-display text-[clamp(1.35rem,3vw,2rem)] leading-snug text-ink-900">
              “{review.quote}”
            </blockquote>
            <p className="mt-6 text-[0.875rem] font-medium text-ink-900">{review.name}</p>
            <p className="text-[0.8125rem] text-ink-500">{review.location}</p>
          </div>
        </Section>
      ) : null}

      {/* Products used */}
      {used.length > 0 ? (
        <Section className="!py-16">
          <div className="container-page">
            <ProductRail
              products={used}
              label="Every product in this room"
              action={
                <span key="project-spend" className="hidden text-[0.8125rem] text-ink-500 sm:inline">
                  Products shown total {formatPrice(spend)}
                </span>
              }
            />
          </div>
        </Section>
      ) : null}

      {/* More projects */}
      <Section tone="muted" className="!py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl text-ink-900">More transformations</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4"
            >
              All projects
              <ArrowRight width={14} height={14} />
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {more.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/projects/${other.slug}`}
                  className="group block overflow-hidden rounded-[16px] bg-white transition-all duration-400 hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="relative block aspect-16/10 overflow-hidden bg-ink-100">
                    <Image
                      src={other.afterImage}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(min-width:768px) 30vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-5">
                    <span className="block font-display text-lg text-ink-900">{other.title}</span>
                    <span className="mt-1 block text-[0.8125rem] text-ink-500">
                      {other.location} · {other.style}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-4 rounded-[18px] border border-ink-200 bg-white p-8">
            <div className="flex-1">
              <h3 className="font-display text-xl text-ink-900">
                Want this done to your bathroom?
              </h3>
              <p className="mt-2 text-[0.9375rem] text-ink-600">
                Send three photos and a rough width. Indicative price back within a working day.
              </p>
            </div>
            <ButtonLink href="/quote" size="lg">
              Request a quote
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
