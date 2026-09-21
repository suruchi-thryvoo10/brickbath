import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { SavedProducts } from "@/components/shared/saved-products";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Saved products",
  description: "Your saved bathroom products, kept on this device and ready to send as one enquiry.",
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Wishlist"
        title="The shortlist you're building"
        intro="Saved on this device only — no account, no email capture. When you're ready, send the whole list to a designer as a single enquiry."
        crumbs={[{ label: "Wishlist", href: "/wishlist" }]}
      />

      <div className="container-page py-12 md:py-16">
        <SavedProducts />
      </div>

      <Section tone="muted" className="!py-14">
        <div className="container-page">
          <RecentlyViewed />
        </div>
      </Section>
    </>
  );
}
