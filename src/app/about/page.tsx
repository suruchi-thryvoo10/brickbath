import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { TestimonialGrid } from "@/components/shared/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { Check, Shield, Sparkle } from "@/components/ui/icons";
import { Section, SectionHeading, Stat } from "@/components/ui/primitives";
import { processSteps, trustStats } from "@/lib/data/content";
import { img, photo, wide } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who Brick & Bath are, how we price, what we guarantee, and what we do when a project goes wrong.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Specify, then sell",
    body: "Our designers are not on product commission. If the ₹2,450 pillar tap is right for your utility bathroom, that is what goes on the quote — and we will tell you why the ₹16,800 one would be wasted there.",
  },
  {
    title: "Publish the boring numbers",
    body: "Membrane thickness, slip rating, flow rate, rough-in depth, cartridge size. The things that decide whether you are happy in year five are the things most showrooms will not put in writing.",
  },
  {
    title: "One person, start to finish",
    body: "The designer who quotes your bathroom manages its build. No handover to a site team who never heard the brief, and no phone tree when something needs a decision.",
  },
  {
    title: "Own the mistakes loudly",
    body: "Things go wrong on about one project in six — a cracked slab at the fabricator, a stack that cannot move. We tell you the same day, with options, rather than the week the deadline slips.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A supplier that has to live with what it specifies"
        intro="Most bathroom companies either sell product or build rooms. Doing both means we cannot recommend a fitting we would hate to install, and cannot blame a supplier when a finish fails."
        crumbs={[{ label: "About", href: "/about" }]}
        image={wide(img.craftTeam, 1920, 900)}
      />

      <section className="container-page py-12 md:py-16">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <Stat value={stat.value} label={stat.label} />
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      <Section tone="muted">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.6rem)] leading-tight text-ink-900">
              We started because of a leak
            </h2>
            <div className="mt-6 grid gap-4 text-[1.0625rem] leading-relaxed text-ink-700">
              <p>
                In 2016 we were a materials supplier in Bhubaneswar. A customer came back eighteen
                months after buying a full bathroom&apos;s worth of product from us, with water
                coming through the ceiling of the flat below. The tiles were ours. The fittings were
                ours. The waterproofing — a single thin coat, no ponding test — was someone
                else&apos;s.
              </p>
              <p>
                We could have pointed at the contractor, and technically we would have been right.
                Instead we paid to strip and redo the room. It cost us about four months of margin,
                and it changed the business: if our name is on the products, we want our name on the
                build.
              </p>
              <p>
                Nine years and fourteen hundred bathrooms later, the waterproofing spec is the part
                of the quote we are proudest of, and it is the part nobody asks about.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-4/5 overflow-hidden rounded-[16px] bg-ink-100">
                <Image
                  src={photo(img.craftTile, 700, 875)}
                  alt="A tiler setting large-format porcelain"
                  fill
                  loading="lazy"
                  sizes="(min-width:1024px) 23vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-4/5 overflow-hidden rounded-[16px] bg-ink-100">
                <Image
                  src={photo(img.craftMeasure, 700, 875)}
                  alt="A designer measuring a bathroom during survey"
                  fill
                  loading="lazy"
                  sizes="(min-width:1024px) 23vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-4/5 overflow-hidden rounded-[16px] bg-ink-100">
                <Image
                  src={photo(img.craftFinish, 700, 875)}
                  alt="Final finishing work on a completed bathroom"
                  fill
                  loading="lazy"
                  sizes="(min-width:1024px) 23vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-4/5 overflow-hidden rounded-[16px] bg-ink-100">
                <Image
                  src={photo(img.craftInstall, 700, 875)}
                  alt="Installing a concealed shower valve"
                  fill
                  loading="lazy"
                  sizes="(min-width:1024px) 23vw, 46vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission / vision */}
      <Section>
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-ink-200 p-8 md:p-10">
            <p className="eyebrow">Our mission</p>
            <p className="mt-4 font-display text-[1.375rem] leading-snug text-ink-900 md:text-[1.6rem]">
              Make a well-built bathroom the default rather than the exception — by publishing what
              goes into one, pricing it honestly, and standing behind it for a decade.
            </p>
          </div>
          <div className="rounded-[20px] bg-ink-900 p-8 text-ink-100 md:p-10">
            <p className="eyebrow text-brass-400">Our vision</p>
            <p className="mt-4 font-display text-[1.375rem] leading-snug text-ink-50 md:text-[1.6rem]">
              To be the company Indian homeowners think of first when a bathroom needs doing
              properly — and the one contractors quietly copy their specifications from.
            </p>
          </div>
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="Four things we will not trade away"
            intro="These cost us jobs, fairly regularly, to companies willing to quote lower by leaving things out."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className="reveal rounded-[18px] border border-ink-200 bg-white p-7"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <h3 className="flex items-start gap-2.5 font-display text-xl text-ink-900">
                  <Sparkle width={18} height={18} className="mt-1 shrink-0 text-brass-600" />
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="The process"
            title="What the five stages actually involve"
          />
          <ol className="mt-12 grid gap-5 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li
                key={step.step}
                className="reveal flex flex-col overflow-hidden rounded-[16px] border border-ink-200"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <span className="relative block aspect-4/3 bg-ink-100">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width:1024px) 19vw, 92vw"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display text-2xl text-brass-500">{step.step}</span>
                  <span className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    {step.duration}
                  </span>
                  <h3 className="mt-2 font-sans text-[0.9375rem] font-semibold text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-ink-600">
                    {step.body}
                  </p>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Guarantees */}
      <Section tone="dark" id="reviews">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brass-400">When it goes wrong</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.6rem)] leading-tight text-ink-50">
              About one project in six hits a problem
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-300">
              A slab cracks at the fabricator. A soil stack turns out to be shared. A shipment of
              imported tile clears customs two weeks late. We cannot promise it will not happen —
              only what we do when it does.
            </p>
          </div>

          <ul className="grid gap-4 lg:col-span-7">
            {[
              {
                title: "You hear it the same day",
                body: "Not at the end of the week, and not when the deadline has already slipped. Same day, with what it means for the date.",
              },
              {
                title: "Three options, priced",
                body: "Wait, substitute, or change the design. Each with its cost and date impact written down so you can choose rather than be told.",
              },
              {
                title: "Our mistakes are ours",
                body: "If we specified it, measured it or installed it wrong, we fix it at our cost. That is not goodwill — it is what the ten-year workmanship warranty means.",
              },
              {
                title: "The review stays up",
                body: "We publish the three-star reviews. The one about the stone vanity that ran two weeks late is on this site, because the useful part is what happened next.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-[16px] border border-ink-700/60 bg-ink-800/40 p-6"
              >
                <Check width={20} height={20} className="mt-0.5 shrink-0 text-brass-400" />
                <div>
                  <h3 className="font-sans text-[0.9375rem] font-semibold text-ink-50">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-400">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="In their words"
            title="What clients say, unedited"
            action={
              <ButtonLink href="/projects" variant="outline">
                See the projects
              </ButtonLink>
            }
          />
          <div className="mt-12">
            <TestimonialGrid />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="muted" className="!py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 rounded-[20px] border border-ink-200 bg-white p-8 md:flex-row md:items-center md:p-10">
          <div className="max-w-xl">
            <h2 className="flex items-center gap-2.5 font-display text-2xl text-ink-900">
              <Shield width={22} height={22} className="text-brass-600" />
              Ten-year workmanship warranty
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
              Registered against the address, not the buyer — so it survives a sale. Product
              warranties run alongside, from one year on textiles to fifteen on sanitaryware.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/quote" size="lg">
              Get a quote
            </ButtonLink>
            <ButtonLink href="/faq#warranty" variant="outline" size="lg">
              Read the terms
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
