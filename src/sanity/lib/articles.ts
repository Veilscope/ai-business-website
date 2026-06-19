import { articles as fallbackArticles } from "@/content/articles";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/client";
import {
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_BY_CATEGORY_QUERY,
  ARTICLES_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_QUERY,
  FEATURED_ARTICLE_QUERY,
} from "@/sanity/lib/queries";
import type {
  ArticleCategory,
  ArticleDetail,
  ArticleListItem,
} from "@/sanity/lib/types";

function fallbackToListItem(article: (typeof fallbackArticles)[number]): ArticleDetail {
  return {
    _id: article.slug,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    category: {
      title: article.category,
      slug: article.category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    },
    publishedAt: article.date,
    updatedAt: article.date,
    readTime: article.readTime,
    author: {
      name: article.author,
    },
    body: article.body.flatMap((section) => [
      {
        _type: "block",
        _key: `${article.slug}-${section.heading}`,
        style: "h2",
        children: [
          {
            _type: "span",
            _key: `${article.slug}-${section.heading}-text`,
            text: section.heading,
            marks: [],
          },
        ],
        markDefs: [],
      },
      ...section.paragraphs.map((paragraph, index) => ({
        _type: "block",
        _key: `${article.slug}-${section.heading}-${index}`,
        style: "normal",
        children: [
          {
            _type: "span",
            _key: `${article.slug}-${section.heading}-${index}-text`,
            text: paragraph,
            marks: [],
          },
        ],
        markDefs: [],
      })),
    ]),
  };
}

const fallbackArticleDetails = fallbackArticles.map(fallbackToListItem);

export async function getArticles() {
  if (!isSanityConfigured) {
    return fallbackArticleDetails;
  }

  return sanityFetch<ArticleListItem[]>({
    query: ARTICLES_QUERY,
    tags: ["articles"],
  });
}

export async function getFeaturedArticle() {
  if (!isSanityConfigured) {
    return fallbackArticleDetails[0] ?? null;
  }

  return sanityFetch<ArticleListItem | null>({
    query: FEATURED_ARTICLE_QUERY,
    tags: ["articles"],
  });
}

export async function getArticleBySlug(slug: string) {
  if (!isSanityConfigured) {
    return fallbackArticleDetails.find((article) => article.slug === slug) ?? null;
  }

  return sanityFetch<ArticleDetail | null>({
    query: ARTICLE_QUERY,
    params: { slug },
    tags: ["articles", `article:${slug}`],
  });
}

export async function getArticleSlugs() {
  if (!isSanityConfigured) {
    return fallbackArticleDetails.map((article) => ({
      slug: article.slug,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
    }));
  }

  return sanityFetch<Array<{ slug: string; publishedAt?: string; updatedAt?: string }>>({
    query: ARTICLE_SLUGS_QUERY,
    tags: ["articles"],
  });
}

export async function getCategories() {
  if (!isSanityConfigured) {
    const categories = new Map<string, ArticleCategory>();

    fallbackArticleDetails.forEach((article) => {
      if (article.category) {
        categories.set(article.category.slug, article.category);
      }
    });

    return Array.from(categories.values()).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  return sanityFetch<ArticleCategory[]>({
    query: CATEGORIES_QUERY,
    tags: ["categories"],
  });
}

export async function getCategoryBySlug(slug: string) {
  if (!isSanityConfigured) {
    const categories = await getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  }

  return sanityFetch<ArticleCategory | null>({
    query: CATEGORY_QUERY,
    params: { slug },
    tags: ["categories"],
  });
}

export async function getArticlesByCategory(slug: string) {
  if (!isSanityConfigured) {
    return fallbackArticleDetails.filter(
      (article) => article.category?.slug === slug,
    );
  }

  return sanityFetch<ArticleListItem[]>({
    query: ARTICLES_BY_CATEGORY_QUERY,
    params: { slug },
    tags: ["articles", "categories", `category:${slug}`],
  });
}
