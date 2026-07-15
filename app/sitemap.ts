import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";
import { getArticleSlugs, getCategories } from "@/sanity/lib/articles";

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/insights", priority: 0.75, changeFrequency: "weekly" },
  { path: "/quiz", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    getArticleSlugs(),
    getCategories(),
  ]);

  return [
    ...routes.map((route) => ({
      url: `${brand.seo.siteUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...articles.map((article) => ({
      url: `${brand.seo.siteUrl}/insights/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...categories.map((category) => ({
      url: `${brand.seo.siteUrl}/insights/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.55,
    })),
  ];
}
