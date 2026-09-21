import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/layout/page-hero";
import { Check, Clock, Shield, Sparkle } from "@/components/ui/icons";
import { Section, Skeleton } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { collections } from "@/lib/data/collections";
import { formatPriceShort } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us about the bathroom and get an indicative range within one working day, then a free site survey and an itemised quote naming every material.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a quote"
        title="A real number, not a call-us-to-find-out"
        intro="Answer a few questions and you'll have an indicative range within one working day. Nothing is committed until you've seen an itemised quote with every material named."
        crumbs={[{ label: "Get a quote", href: "/quote" }]}
      />

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 md:py-16">
        <div className="lg:col-span-7">
          <Suspense fallback={<Skeleton className="h-[40rem]" />}>
            <EnquiryForm variant="quote" />
          </Suspense>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 grid gap-6">
            <div className="rounded-[18px] border border-ink-200 bg-ink-50 p-7">
              <h2 className="flex items-center gap-2 font-sans text-[0.9375rem] font-semibold text-ink-900">
                <Clock width={17} height={17} className="text-brass-600" />
                What happens next
              </h2>
              <ol className="mt-4 grid gap-3.5">
                {[
                  "A designer calls you within one working day",
                  "We agree an indicative range from your photos",
                  "Free site survey, with a written condition note",
                  "Itemised quote — membrane, tile SKU, fitting model",
                  "Two revision rounds before anything is signed",
                ].map((line, i) => (
                  <li key={line} className="flex items-start gap-3 text-[0.875rem] text-ink-700">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink-900 text-[0.625rem] font-semibold text-ink-50">
                      {i + 1}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[18px] border border-ink-200 p-7">
              <h2 className="flex items-center gap-2 font-sans text-[0.9375rem] font-semibold text-ink-900">
                <Shield width={17} height={17} className="text-brass-600" />
                Indicative ranges
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {collections.map((c) => (
                  <li
                    key={c.slug}
                    className="flex items-baseline justify-between gap-4 border-b border-ink-100 pb-2.5 text-[0.875rem] last:border-b-0"
                  >
                    <span className="text-ink-700">{c.name}</span>
                    <span className="font-medium text-ink-900">
                      {formatPriceShort(c.priceFrom)} – {formatPriceShort(c.priceTo)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-500">
                Ranges cover a full renovation back to slab. Product-only supply is quoted
                separately at project pricing.
              </p>
            </div>

            <div className="rounded-[18px] bg-ink-900 p-7 text-ink-100">
              <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brass-400">
                <Sparkle width={14} height={14} />
                Not sure what you need?
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">
                The guided finder builds a shortlist from six questions about the room, the style
                and the budget. Takes about forty seconds.
              </p>
              <ButtonLink href="/finder" variant="secondary" className="mt-5 w-full">
                Try the finder
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>

      <Section tone="muted" className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">What we&apos;ll never do</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Quote without seeing the room",
                body: "A number given over the phone is a number that changes. The survey is free precisely so the quote can be firm.",
              },
              {
                title: "Discover extra work mid-build",
                body: "Structural issues, soil stacks and electrical scope are checked at survey and priced before you sign — or excluded in writing.",
              },
              {
                title: "Compress the waterproofing cure",
                body: "Three days, and a 24-hour ponding test. Anyone offering to speed that up is selling you a leak in year three.",
              },
            ].map((item) => (
              <li key={item.title} className="rounded-[16px] border border-ink-200 bg-white p-6">
                <h3 className="flex items-start gap-2.5 font-sans text-[0.9375rem] font-semibold text-ink-900">
                  <Check width={17} height={17} className="mt-0.5 shrink-0 text-brass-600" />
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
