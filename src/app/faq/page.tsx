import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Phone, WhatsApp } from "@/components/ui/icons";
import { Section } from "@/components/ui/primitives";
import { faqTopics, faqs } from "@/lib/data/content";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Costs, timelines, waterproofing, warranty, delivery, returns and coverage — answered properly, with numbers.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Help centre"
        title="The questions people actually ask"
        intro="Including the awkward ones about cost overruns and what isn't included. If something here isn't clear, call and ask — we'd rather answer it now than at snagging."
        crumbs={[{ label: "FAQ", href: "/faq" }]}
      />

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 md:py-16">
        <nav aria-label="FAQ topics" className="lg:col-span-3">
          <div className="sticky top-28">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              Jump to
            </p>
            <ul className="mt-4 grid gap-1">
              {faqTopics.map((topic) => (
                <li key={topic}>
                  <a
                    href={`#topic-${topic.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block rounded-[8px] px-3 py-2 text-[0.875rem] text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-9">
          {faqTopics.map((topic) => {
            const items = faqs.filter((f) => f.topic === topic);
            return (
              <section
                key={topic}
                id={`topic-${topic.toLowerCase().replace(/\s+/g, "-")}`}
                className="mb-12 scroll-mt-28 last:mb-0"
              >
                <h2 className="mb-4 text-xl text-ink-900">{topic}</h2>
                <Accordion
                  allowMultiple
                  items={items.map((f) => ({
                    id: f.id,
                    question: f.question,
                    answer: f.answer,
                  }))}
                />
              </section>
            );
          })}
        </div>
      </div>

      <Section tone="dark" className="!py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl text-ink-50 md:text-3xl">Still unanswered?</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-300">
              Ask a designer directly. We answer specification questions even when you are not
              buying from us — it is a reasonable way to earn the next job.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`tel:${site.phone}`} variant="secondary" external>
              <Phone width={16} height={16} />
              {site.phoneDisplay}
            </ButtonLink>
            <ButtonLink
              href={whatsappLink("Hi Brick & Bath — I have a question about a bathroom.")}
              variant="whatsapp"
              external
            >
              <WhatsApp width={16} height={16} />
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
