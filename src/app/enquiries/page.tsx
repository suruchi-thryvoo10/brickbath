import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { EnquiryTracker } from "@/components/shared/enquiry-tracker";
import { ButtonLink } from "@/components/ui/button";
import { Phone } from "@/components/ui/icons";
import { Section } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Track your enquiry",
  description:
    "Follow an enquiry from received to quote sent, with the products you selected and every update in one place.",
  alternates: { canonical: "/enquiries" },
  robots: { index: false, follow: true },
};

export default function EnquiriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Enquiry tracking"
        title="Where your enquiry has got to"
        intro="Four stages, and you can see which one you're in without calling to ask. Enquiries sent from this browser appear here automatically."
        crumbs={[{ label: "Track enquiry", href: "/enquiries" }]}
        actions={
          <ButtonLink href={`tel:${site.phone}`} variant="outline" external>
            <Phone width={16} height={16} />
            {site.phoneDisplay}
          </ButtonLink>
        }
      />

      <div className="container-page py-12 md:py-16">
        <EnquiryTracker />
      </div>

      <Section tone="muted" className="!py-14">
        <div className="container-page grid gap-6 rounded-[18px] border border-ink-200 bg-white p-8 md:grid-cols-3">
          {[
            {
              title: "Reply within 4 working hours",
              body: "During business hours. Outside them, first thing the next working morning.",
            },
            {
              title: "Site survey within 3 days",
              body: "Free across Bhubaneswar, Cuttack and Puri — and you keep the condition note either way.",
            },
            {
              title: "One person, start to finish",
              body: "The designer who quotes your project is the one who manages the build.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="font-sans text-[0.9375rem] font-semibold text-ink-900">
                {item.title}
              </h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
