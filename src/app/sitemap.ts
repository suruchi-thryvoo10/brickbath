import type { MetadataRoute } from "next";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { products } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: url("/"), priority: 1, changeFrequency: "weekly" },
    { url: url("/products"), priority: 0.9, changeFrequency: "daily" },
    { url: url("/categories"), priority: 0.8, changeFrequency: "weekly" },
    { url: url("/collections"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/projects"), priority: 0.8, changeFrequency: "weekly" },
    { url: url("/about"), priority: 0.6, changeFrequency: "monthly" },
    { url: url("/contact"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/quote"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/finder"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/showrooms"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/faq"), priority: 0.6, changeFrequency: "monthly" },
  ] satisfies MetadataRoute.Sitemap).map((entry) => ({ ...entry, lastModified: now }));

  return [
    ...staticRoutes,
    ...categories.map((c) => ({
      url: url(`/categories/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...collections.map((c) => ({
      url: url(`/collections/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: url(`/products/${p.slug}`),
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: url(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
