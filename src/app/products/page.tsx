import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/catalog/product-catalog";
import { PageHero } from "@/components/layout/page-hero";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { ButtonLink } from "@/components/ui/button";
import { Sparkle } from "@/components/ui/icons";
import { ProductCardSkeleton, Section } from "@/components/ui/primitives";
import { products } from "@/lib/data/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Search, filter and compare the full Brick & Bath catalogue — faucets, sanitaryware, tiles, vanities, bathtubs, mirrors, accessories and glass.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `All products · ${site.name}`,
    description: "The full catalogue, with real specifications and honest availability.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The catalogue"
        title="Every product, properly specified"
        intro={
          <>
            {products.length} products with real spec tables — flow rates, slip ratings, rough-in
            depths and load ratings — so you can compare like with like instead of guessing from
            a photograph.
          </>
        }
        crumbs={[{ label: "Products", href: "/products" }]}
        actions={
          <ButtonLink href="/finder" variant="outline">
            <Sparkle width={16} height={16} />
            Not sure? Try the guided finder
          </ButtonLink>
        }
      />

      <div className="container-page py-12 md:py-16">
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog products={products} />
        </Suspense>
      </div>

      <Section tone="muted" className="!py-14">
        <div className="container-page">
          <RecentlyViewed />
        </div>
      </Section>
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
      <div className="hidden lg:block">
        <div className="skeleton h-96 rounded-[12px]" />
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
