import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/insights", "/contact", "/privacy", "/terms"];

  return [
    ...routes.map((route) => ({
      url: `${brand.seo.siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...articles.map((article) => ({
      url: `${brand.seo.siteUrl}/insights/${article.slug}`,
      lastModified: new Date(article.date),
    })),
  ];
}
