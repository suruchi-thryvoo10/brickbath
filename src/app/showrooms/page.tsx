import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Check, Clock, Phone, Pin } from "@/components/ui/icons";
import { Badge, Section } from "@/components/ui/primitives";
import { showrooms } from "@/lib/data/content";
import { img, wide } from "@/lib/data/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Showrooms & display houses",
  description:
    "Five Brick & Bath showrooms across Bhubaneswar, Cuttack and Puri — with full display bathrooms, material libraries and a live water pressure rig.",
  alternates: { canonical: "/showrooms" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: showrooms.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "HomeAndConstructionBusiness",
      name: s.name,
      telephone: s.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: s.address,
        addressLocality: s.city,
        addressRegion: s.state,
        addressCountry: "IN",
      },
      openingHours: s.hours,
    },
  })),
};

export default function ShowroomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Showrooms"
        title="Turn the tap before you buy it"
        intro="Photographs tell you nothing about how a mixer feels in the hand or how a matte tile reads under warm light. Five showrooms, all with working bathrooms you can actually use."
        crumbs={[{ label: "Showrooms", href: "/showrooms" }]}
        image={wide(img.heroStudio, 1920, 900)}
        actions={
          <ButtonLink href={`tel:${site.phone}`} variant="secondary" external>
            <Phone width={16} height={16} />
            Book a visit — {site.phoneDisplay}
          </ButtonLink>
        }
      />

      <Section className="!py-14">
        <div className="container-page grid gap-6">
          {showrooms.map((showroom, i) => (
            <article
              key={showroom.id}
              className="reveal grid overflow-hidden rounded-[18px] border border-ink-200 lg:grid-cols-12"
            >
              <div className="relative aspect-16/9 lg:col-span-5 lg:aspect-auto">
                <Image
                  src={showroom.image}
                  alt={`${showroom.name} interior`}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col p-7 md:p-9 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl text-ink-900 md:text-2xl">
                    {showroom.name}
                  </h2>
                  {showroom.isFlagship ? <Badge tone="brass">Flagship</Badge> : null}
                </div>

                <ul className="mt-4 grid gap-2.5 text-[0.875rem] text-ink-700">
                  <li className="flex items-start gap-2.5">
                    <Pin width={16} height={16} className="mt-0.5 shrink-0 text-brass-600" />
                    {showroom.address}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock width={16} height={16} className="shrink-0 text-brass-600" />
                    {showroom.hours}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone width={16} height={16} className="shrink-0 text-brass-600" />
                    <a
                      href={`tel:${showroom.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-brass-700"
                    >
                      {showroom.phone}
                    </a>
                  </li>
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {showroom.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1.5 text-[0.75rem] text-ink-700"
                    >
                      <Check width={12} height={12} className="text-brass-600" />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.mapQuery)}`}
                    variant="outline"
                    size="sm"
                    external
                  >
                    Get directions
                  </ButtonLink>
                  <ButtonLink href="/quote" size="sm">
                    Book a design session
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" className="!py-16">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">What to bring to a showroom visit</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              {
                title: "Photos of the room",
                body: "All four walls and the ceiling. More useful than any measurement.",
              },
              {
                title: "Rough dimensions",
                body: "Width, length and ceiling height. A tape measure and two minutes will do.",
              },
              {
                title: "Anything you've saved",
                body: "Your wishlist from this site, or screenshots from anywhere else.",
              },
              {
                title: "A sense of budget",
                body: "Even a wide range. It stops us showing you things that aren't for you.",
              },
            ].map((item) => (
              <li key={item.title} className="rounded-[16px] border border-ink-200 bg-white p-6">
                <h3 className="font-sans text-[0.9375rem] font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
