import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductRail } from "@/components/product/product-rail";
import { BeforeAfter } from "@/components/projects/before-after";
import { TestimonialGrid } from "@/components/shared/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Check, Clock, Ruler, Shield, Sparkle } from "@/components/ui/icons";
import { categoryIcons } from "@/components/ui/icons";
import { Badge, Section, SectionHeading, Stat } from "@/components/ui/primitives";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { partnerBrands, processSteps, trustStats } from "@/lib/data/content";
import { img, photo, wide } from "@/lib/data/images";
import { bestSellers, featuredProducts, newArrivals } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { formatPriceShort } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Brick & Bath — Premium bathroom products & renovation in India",
  description:
    "Faucets, sanitaryware, tiles, vanities and wellness from a team that also builds the bathroom. Firm quotes, named materials, a 10-year workmanship warranty.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = featuredProducts(8);
  const sellers = bestSellers(8);
  const fresh = newArrivals(6);
  const showcase = projects.slice(0, 3);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryGrid />
      <FeaturedProducts featured={featured} />
      <CollectionsBand />
      <ProjectShowcase project={showcase[0]} />
      <ProcessSection />
      <BestSellers sellers={sellers} fresh={fresh} />
      <ProjectsTeaser />
      <TestimonialSection />
      <ClosingCta />
    </>
  );
}

/* ---------------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-50">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
        <div className="lg:col-span-5">
          <p className="eyebrow animate-fade-up">Design · Supply · Build</p>
          <h1
            className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] leading-[0.98] text-ink-900 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            The bathroom,
            <br />
            <span className="italic text-brass-700">properly</span> specified.
          </h1>
          <p
            className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Nine hundred products you can actually compare, and a build team that publishes the
            membrane thickness and the ponding-test photos. Buy the fittings, or hand us the whole
            room.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <ButtonLink href="/products" size="lg">
              Browse products
              <ArrowRight width={17} height={17} />
            </ButtonLink>
            <ButtonLink href="/quote" variant="outline" size="lg">
              Get a firm quote
            </ButtonLink>
          </div>

          <ul
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[0.8125rem] text-ink-600 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            {[
              { icon: Shield, label: "10-year workmanship warranty" },
              { icon: Clock, label: "Firm quote in 3 working days" },
              { icon: Ruler, label: "Free site survey in 3 cities" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon width={16} height={16} className="text-brass-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            <div className="relative col-span-8 aspect-4/5 overflow-hidden rounded-[18px] bg-ink-100">
              <Image
                src={photo(img.heroSuite, 1100, 1375)}
                alt="A renovated master bathroom with vein-matched porcelain and a twin vanity"
                fill
                priority
                sizes="(min-width:1024px) 38vw, 64vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-4 flex flex-col gap-3 md:gap-4">
              <div className="relative flex-1 overflow-hidden rounded-[18px] bg-ink-100">
                <Image
                  src={photo(img.faucetBrass, 500, 620)}
                  alt="Brushed brass basin mixer"
                  fill
                  priority
                  sizes="(min-width:1024px) 19vw, 32vw"
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-[18px] bg-ink-100">
                <Image
                  src={photo(img.tubFreestanding, 500, 620)}
                  alt="Freestanding stone-composite bathtub"
                  fill
                  sizes="(min-width:1024px) 19vw, 32vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-[18px] bg-ink-900 p-4 text-ink-100">
                <p className="font-display text-2xl leading-none text-brass-300">4.8</p>
                <p className="mt-1.5 text-[0.6875rem] leading-snug text-ink-400">
                  average from 620 verified reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner marquee */}
      <div className="border-y border-ink-200 bg-white py-5">
        <p className="container-page mb-4 text-center text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-ink-400">
          Stocking and specifying
        </p>
        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-12 px-6">
            {[...partnerBrands, ...partnerBrands].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="font-display text-xl text-ink-300 transition-colors hover:text-ink-600"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Partner brands: {partnerBrands.join(", ")}.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- trust strip */

function TrustStrip() {
  return (
    <section className="container-page py-12 md:py-16">
      <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {trustStats.map((stat) => (
          <div key={stat.label}>
            <Stat value={stat.value} label={stat.label} />
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------- category grid */

function CategoryGrid() {
  return (
    <Section tone="muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="Shop by category"
          title="Eight categories, one coherent room"
          intro="Everything here is cross-checked against everything else — finishes match across ranges, and the spec tables use the same fields so you can compare like with like."
          action={
            <ButtonLink href="/categories" variant="outline">
              All categories
              <ArrowRight width={16} height={16} />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const Icon = categoryIcons[category.icon];
            return (
              <li
                key={category.slug}
                className="reveal"
                style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[16px] bg-white transition-all duration-400 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="relative block aspect-5/4 overflow-hidden bg-ink-100">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(min-width:1024px) 23vw, (min-width:640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent" />
                    {Icon ? (
                      <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/90 text-ink-800 backdrop-blur-sm">
                        <Icon width={18} height={18} />
                      </span>
                    ) : null}
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="font-display text-lg text-ink-900">{category.name}</span>
                    <span className="mt-1 text-[0.8125rem] text-ink-500">{category.tagline}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-brass-700">
                      Explore
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
  );
}

/* --------------------------------------------------------- featured products */

function FeaturedProducts({ featured }: { featured: ReturnType<typeof featuredProducts> }) {
  return (
    <Section>
      <div className="container-page">
        <ProductRail
          products={featured}
          label="Designers' picks"
          action={
            <Link
              key="featured-see-all"
              href="/products?sort=featured"
              className="hidden text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4 sm:inline"
            >
              See all
            </Link>
          }
        />
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- collections band */

function CollectionsBand() {
  return (
    <Section tone="dark">
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow="Renovation collections"
          title="Four ways to hand us the whole room"
          intro="Fixed scopes with real inclusion lists — demolition, waterproofing, tiling, fittings, finishing. You know the number before anyone picks up a hammer."
          action={
            <ButtonLink
              href="/collections"
              variant="outline"
              className="border-ink-600 text-ink-100 hover:border-ink-100 hover:bg-ink-800"
            >
              Compare collections
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection, i) => (
            <li
              key={collection.slug}
              className="reveal"
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-ink-700/60 bg-ink-800/40 transition-all duration-400 hover:-translate-y-1 hover:border-brass-500/50"
              >
                <span className="relative block aspect-16/11 overflow-hidden">
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width:1280px) 23vw, (min-width:768px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="font-display text-2xl text-ink-50">{collection.name}</span>
                  <span className="mt-1 text-[0.75rem] uppercase tracking-[0.12em] text-brass-400">
                    {collection.subtitle}
                  </span>
                  <span className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-400">
                    {collection.positioning}
                  </span>
                  <span className="mt-5 flex items-baseline justify-between border-t border-ink-700/60 pt-4">
                    <span className="text-[0.8125rem] text-ink-400">From</span>
                    <span className="font-display text-lg text-ink-50">
                      {formatPriceShort(collection.priceFrom)}
                    </span>
                  </span>
                  <span className="mt-1 text-[0.75rem] text-ink-500">
                    {collection.durationDays}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- project showcase */

function ProjectShowcase({ project }: { project: (typeof projects)[number] }) {
  return (
    <Section>
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="reveal">
          <BeforeAfter
            before={project.beforeImage}
            after={project.afterImage}
            alt={project.title}
            className="aspect-4/3"
          />
          <p className="mt-3 text-center text-[0.75rem] text-ink-500">
            Drag the handle — or use the arrow keys — to reveal the before
          </p>
        </div>

        <div className="reveal">
          <p className="eyebrow">Real results</p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.85rem)] leading-[1.08] text-ink-900">
            {project.title}
          </h2>
          <p className="mt-2 text-[0.8125rem] text-ink-500">
            {project.location} · {project.areaSqft} sq.ft. · {project.durationDays} days
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-700">{project.brief}</p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">{project.outcome}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} tone="brass">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/projects/${project.slug}`}>
              See the full project
              <ArrowRight width={16} height={16} />
            </ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              All projects
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- how it works */

function ProcessSection() {
  return (
    <Section tone="sand">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="Five steps, no surprises in the middle"
          intro="The stage most renovations go wrong is the one between quote and demolition. We put a written condition note and an itemised scope in between."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] border border-ink-200 bg-ink-200 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <li
              key={step.step}
              className="reveal flex flex-col bg-white p-6"
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <span className="font-display text-3xl text-brass-500">{step.step}</span>
              <span className="mt-3 block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                {step.duration}
              </span>
              <h3 className="mt-2 font-sans text-[1rem] font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[0.8125rem] leading-relaxed text-ink-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/quote" size="lg">
            Start with a free survey
          </ButtonLink>
          <p className="text-[0.8125rem] text-ink-600">
            No obligation, and you keep the condition note either way.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- best sellers */

function BestSellers({
  sellers,
  fresh,
}: {
  sellers: ReturnType<typeof bestSellers>;
  fresh: ReturnType<typeof newArrivals>;
}) {
  return (
    <Section>
      <div className="container-page grid gap-16">
        <ProductRail
          products={sellers}
          label="What people actually buy"
          action={
            <Link
              key="sellers-top-rated"
              href="/products?sort=rating"
              className="hidden text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4 sm:inline"
            >
              Top rated
            </Link>
          }
        />
        {fresh.length > 0 ? (
          <ProductRail
            products={fresh}
            label="New this season"
            action={
              <Link
                key="new-see-all"
                href="/products?sort=newest"
                className="hidden text-[0.8125rem] font-medium text-brass-700 underline underline-offset-4 sm:inline"
              >
                See all new
              </Link>
            }
          />
        ) : null}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ projects teaser */

function ProjectsTeaser() {
  const items = projects.slice(1, 5);
  return (
    <Section tone="muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="Project inspiration"
          title="Browse by the room you're trying to make"
          intro="Every project lists the actual products used, so you can price the look rather than guess at it."
          action={
            <ButtonLink href="/projects" variant="outline">
              All projects
              <ArrowRight width={16} height={16} />
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((project, i) => (
            <li
              key={project.slug}
              className="reveal"
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-[16px] bg-white transition-all duration-400 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="relative block aspect-4/5 overflow-hidden bg-ink-100">
                  <Image
                    src={project.afterImage}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width:1024px) 23vw, (min-width:640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-5 pt-16 text-ink-50">
                    <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-brass-300">
                      {project.style}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-snug">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-[0.75rem] text-ink-300">
                      {project.location}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- testimonials */

function TestimonialSection() {
  return (
    <Section>
      <div className="container-page">
        <SectionHeading
          eyebrow="In their words"
          title="Six hundred and twenty reviews, and the three-star ones too"
          intro="We publish the projects that ran late and what we did about them. A renovation company with only five-star reviews has either done twelve jobs or edited the list."
          action={
            <ButtonLink href="/about#reviews" variant="outline">
              How we handle problems
            </ButtonLink>
          }
        />
        <div className="mt-12">
          <TestimonialGrid />
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- closing cta */

function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <Image
        src={wide(img.heroSpa, 1920, 900)}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="container-page relative grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-brass-400">Start here</p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.04] text-ink-50">
            Send us three photos and a rough width.
          </h2>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-300">
            You get an indicative range back within one working day — a real number, not a
            call-us-to-find-out. If it works for you, the site survey is free.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/quote" variant="secondary" size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink
              href="/finder"
              variant="outline"
              size="lg"
              className="border-ink-600 text-ink-100 hover:border-ink-100 hover:bg-ink-800"
            >
              <Sparkle width={17} height={17} />
              Find the right product
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-3 rounded-[18px] border border-ink-700/60 bg-ink-950/40 p-7 backdrop-blur-sm">
          {[
            "An indicative price range in one working day",
            "A free site survey and written condition note",
            "An itemised quote naming every material and model",
            "Two design revision rounds before anything starts",
            "Photo updates every evening during the build",
            "A handover file with warranties and test photos",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3 text-[0.9375rem] text-ink-200">
              <Check width={18} height={18} className="mt-0.5 shrink-0 text-brass-400" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
