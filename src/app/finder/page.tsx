import type { Metadata } from "next";
import { ProductFinder } from "@/components/finder/product-finder";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Find the right product",
  description:
    "Six questions about your room, style and budget, and we'll build a shortlist across the whole catalogue — with the collection that matches.",
  alternates: { canonical: "/finder" },
};

export default function FinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Guided selector"
        title="Six questions. One shortlist."
        intro="Rather than scrolling 40 products hoping something clicks, tell us about the room and we'll weight the catalogue towards what actually fits it."
        crumbs={[{ label: "Product finder", href: "/finder" }]}
      />

      <Section className="!py-14">
        <div className="container-page">
          <ProductFinder />
        </div>
      </Section>
    </>
  );
}
