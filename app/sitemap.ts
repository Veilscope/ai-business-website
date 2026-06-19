import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";
import { getArticleSlugs, getCategories } from "@/sanity/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/services", "/about", "/insights", "/contact", "/privacy", "/terms"];
  const [articles, categories] = await Promise.all([
    getArticleSlugs(),
    getCategories(),
  ]);

  return [
    ...routes.map((route) => ({
      url: `${brand.seo.siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...articles.map((article) => ({
      url: `${brand.seo.siteUrl}/insights/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || Date.now()),
    })),
    ...categories.map((category) => ({
      url: `${brand.seo.siteUrl}/insights/category/${category.slug}`,
      lastModified: new Date(),
    })),
  ];
}
