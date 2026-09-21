import type { Metadata } from "next";
import { CompareTable } from "@/components/compare/compare-table";
import { PageHero } from "@/components/layout/page-hero";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Compare products",
  description:
    "Line up to four bathroom products side by side — price, rating, warranty, finishes and the full specification table.",
  alternates: { canonical: "/compare" },
  robots: { index: false, follow: true },
};

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Four products, one specification table"
        intro="Specs line up row for row, and anything that differs can be isolated with a single checkbox — which is usually where the decision actually lives."
        crumbs={[{ label: "Compare", href: "/compare" }]}
      />

      <div className="container-page py-12 md:py-16">
        <CompareTable />
      </div>

      <Section tone="muted" className="!py-14">
        <div className="container-page">
          <RecentlyViewed label="Add one of these to the comparison" />
        </div>
      </Section>
    </>
  );
}
