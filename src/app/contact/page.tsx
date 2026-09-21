import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Mail, Phone, Pin, WhatsApp } from "@/components/ui/icons";
import { Section, Skeleton } from "@/components/ui/primitives";
import { showrooms } from "@/lib/data/content";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to a Brick & Bath designer — phone, WhatsApp, email, or drop into one of five showrooms across Odisha.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to someone who has built one"
        intro="Every enquiry goes to a designer, not a call centre. Typical reply is under four working hours."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 md:py-16">
        <div className="lg:col-span-7">
          <h2 className="text-2xl text-ink-900">Send us a message</h2>
          <p className="mt-2 text-[0.9375rem] text-ink-600">
            Fields marked <span className="text-brass-700">*</span> are required.
          </p>
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-[34rem]" />}>
              <EnquiryForm variant="contact" />
            </Suspense>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 grid gap-6">
            <div className="rounded-[18px] border border-ink-200 p-7">
              <h2 className="font-sans text-[0.9375rem] font-semibold text-ink-900">
                Faster than a form
              </h2>
              <ul className="mt-5 grid gap-4 text-[0.9375rem]">
                <li>
                  <a
                    href={`tel:${site.phone}`}
                    className="flex items-center gap-3 text-ink-800 transition-colors hover:text-brass-700"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brass-100 text-brass-700">
                      <Phone width={16} height={16} />
                    </span>
                    <span>
                      <span className="block font-medium">{site.phoneDisplay}</span>
                      <span className="block text-[0.75rem] text-ink-500">{site.hours}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink("Hi Brick & Bath — I'd like to talk about my bathroom.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink-800 transition-colors hover:text-brass-700"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C4B]">
                      <WhatsApp width={16} height={16} />
                    </span>
                    <span>
                      <span className="block font-medium">WhatsApp</span>
                      <span className="block text-[0.75rem] text-ink-500">
                        Send photos — the quickest route to a number
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 text-ink-800 transition-colors hover:text-brass-700"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700">
                      <Mail width={16} height={16} />
                    </span>
                    <span>
                      <span className="block font-medium">{site.email}</span>
                      <span className="block text-[0.75rem] text-ink-500">
                        For drawings, tenders and trade accounts
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-[18px] border border-ink-200 p-7">
              <h2 className="flex items-center gap-2 font-sans text-[0.9375rem] font-semibold text-ink-900">
                <Pin width={16} height={16} className="text-brass-600" />
                Or come and see it
              </h2>
              <ul className="mt-4 grid gap-3">
                {showrooms.slice(0, 3).map((showroom) => (
                  <li key={showroom.id} className="border-b border-ink-100 pb-3 last:border-b-0">
                    <p className="text-[0.875rem] font-medium text-ink-900">{showroom.name}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-600">
                      {showroom.address}
                    </p>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/showrooms" variant="outline" className="mt-5 w-full">
                All five showrooms
              </ButtonLink>
            </div>

            <div className="rounded-[18px] bg-ink-50 p-7">
              <h2 className="font-sans text-[0.9375rem] font-semibold text-ink-900">
                Looking for something else?
              </h2>
              <ul className="mt-4 grid gap-2.5 text-[0.875rem]">
                {[
                  { label: "Track an existing enquiry", href: "/enquiries" },
                  { label: "Warranty, delivery and returns", href: "/faq" },
                  { label: "Become a dealer or trade partner", href: "/contact?topic=dealer" },
                  { label: "Careers at Brick & Bath", href: "/contact?topic=careers" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brass-700 underline underline-offset-4 transition-colors hover:text-brass-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <Section tone="muted" className="!py-14">
        <div className="container-page">
          <h2 className="text-2xl text-ink-900">Where we work</h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] text-ink-600">
            Full design-and-build with free surveys across Bhubaneswar, Cuttack and Puri. Selected
            projects elsewhere in Odisha, Kolkata and Visakhapatnam. Product ships nationwide.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              "Bhubaneswar",
              "Cuttack",
              "Puri",
              "Rourkela",
              "Sambalpur",
              "Berhampur",
              "Kolkata",
              "Visakhapatnam",
            ].map((city) => (
              <li
                key={city}
                className="rounded-full border border-ink-200 bg-white px-4 py-2 text-[0.8125rem] text-ink-700"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
