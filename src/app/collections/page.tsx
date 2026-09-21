import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Check, Clock } from "@/components/ui/icons";
import { Section } from "@/components/ui/primitives";
import { collections } from "@/lib/data/collections";
import { formatPriceShort } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Renovation collections",
  description:
    "Four fixed-scope bathroom renovation packages — Aura, Prestige, Elite and Signature — with real inclusion lists, timelines and price ranges.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Renovation collections"
        title="Four scopes, priced before anyone picks up a hammer"
        intro="Each collection is a defined list of work and materials, not a vague tier. Read what is in it, what is deliberately not, and what it costs at the low and high end."
        crumbs={[{ label: "Collections", href: "/collections" }]}
        actions={
          <ButtonLink href="/quote" size="lg">
            Get a firm quote
          </ButtonLink>
        }
      />

      <Section className="!py-14">
        <div className="container-page grid gap-8">
          {collections.map((collection, i) => (
            <article
              key={collection.slug}
              className="reveal grid overflow-hidden rounded-[20px] border border-ink-200 lg:grid-cols-12"
            >
              <div className="relative aspect-16/10 lg:col-span-5 lg:aspect-auto">
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-1.5"
                  style={{ background: collection.accent }}
                />
              </div>

              <div className="flex flex-col p-7 md:p-10 lg:col-span-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] text-ink-900">
                      {collection.name}
                    </h2>
                    <p className="mt-1 text-[0.75rem] uppercase tracking-[0.14em] text-brass-700">
                      {collection.subtitle}
                    </p>
                  </div>
                  <p className="text-right">
                    <span className="block font-display text-xl text-ink-900">
                      {formatPriceShort(collection.priceFrom)} –{" "}
                      {formatPriceShort(collection.priceTo)}
                    </span>
                    <span className="mt-0.5 flex items-center justify-end gap-1.5 text-[0.75rem] text-ink-500">
                      <Clock width={13} height={13} />
                      {collection.durationDays}
                    </span>
                  </p>
                </div>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                  {collection.description}
                </p>

                <p className="mt-5 text-[0.8125rem] font-medium text-ink-800">
                  Ideal for: <span className="font-normal text-ink-600">{collection.idealFor}</span>
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {collection.inclusions.slice(0, 6).map((inclusion) => (
                    <li
                      key={inclusion}
                      className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-ink-700"
                    >
                      <Check width={15} height={15} className="mt-0.5 shrink-0 text-brass-600" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
                {collection.inclusions.length > 6 ? (
                  <p className="mt-2 text-[0.75rem] text-ink-500">
                    + {collection.inclusions.length - 6} more inclusions
                  </p>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={`/collections/${collection.slug}`}>
                    See the full scope
                    <ArrowRight width={16} height={16} />
                  </ButtonLink>
                  <ButtonLink href="/quote" variant="outline">
                    Quote me this
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">Side by side</h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] text-ink-600">
            The honest difference between the tiers is design time and material grade — the
            waterproofing, the warranty and the site management are identical across all four.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-[0.875rem]">
              <caption className="sr-only">Comparison of renovation collections</caption>
              <thead>
                <tr className="border-b border-ink-300">
                  <th scope="col" className="py-3 text-left font-medium text-ink-500">
                    &nbsp;
                  </th>
                  {collections.map((c) => (
                    <th key={c.slug} scope="col" className="px-4 py-3 text-left">
                      <Link href={`/collections/${c.slug}`} className="hover:underline">
                        <span className="block font-display text-lg text-ink-900">{c.name}</span>
                        <span className="text-[0.75rem] font-normal text-ink-500">
                          {c.positioning}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {[
                  { label: "Price range", get: (c: (typeof collections)[number]) => `${formatPriceShort(c.priceFrom)} – ${formatPriceShort(c.priceTo)}` },
                  { label: "Duration", get: (c: (typeof collections)[number]) => c.durationDays },
                  { label: "Ideal for", get: (c: (typeof collections)[number]) => c.idealFor },
                  { label: "Inclusions", get: (c: (typeof collections)[number]) => `${c.inclusions.length} line items` },
                  { label: "Popular upgrades", get: (c: (typeof collections)[number]) => c.upgrades.join(", ") },
                ].map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-4 pr-4 text-left font-medium text-ink-500">
                      {row.label}
                    </th>
                    {collections.map((c) => (
                      <td key={c.slug} className="px-4 py-4 align-top text-ink-800">
                        {row.get(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </>
  );
}
