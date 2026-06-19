"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/content/ArticleCard";
import { cn } from "@/lib/utils";
import type { ArticleCategory, ArticleListItem } from "@/sanity/lib/types";

type ContentHubProps = {
  articles: ArticleListItem[];
  categories: ArticleCategory[];
  featuredArticle?: ArticleListItem | null;
};

export function ContentHub({
  articles,
  categories,
  featuredArticle,
}: ContentHubProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categoryOptions = [
    { title: "All", slug: "All" },
    ...categories.map((item) => ({ title: item.title, slug: item.slug })),
  ];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        category === "All" || article.category?.slug === category;
      const matchesQuery =
        !normalizedQuery ||
        `${article.title} ${article.excerpt} ${article.category?.title || ""}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
      {featuredArticle ? (
        <article className="motion-surface mb-8 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-950/5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-semibold text-cyan-200">Featured</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              <Link href={`/insights/${featuredArticle.slug}`}>
                {featuredArticle.title}
              </Link>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {featuredArticle.excerpt}
            </p>
            <Link
              className="mt-6 inline-flex text-sm font-semibold text-cyan-200 hover:text-white"
              href={`/insights/${featuredArticle.slug}`}
            >
              Read featured article <span aria-hidden="true" className="ml-1">-&gt;</span>
            </Link>
          </div>
          <div className="grid content-center gap-4 bg-white p-6 sm:p-8">
            <p className="text-sm font-semibold text-blue-700">
              {featuredArticle.category?.title || "Insight"} ·{" "}
              {featuredArticle.readTime || "4 min read"}
            </p>
            <p className="text-sm leading-6 text-slate-600">
              Latest thinking from the content library, pulled from the CMS and
              ready to update without a deployment.
            </p>
          </div>
        </article>
      ) : null}

      <div className="motion-surface rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
        <label className="text-sm font-semibold text-slate-900" htmlFor="search">
          Search insights
        </label>
        <input
          className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
          id="search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics, categories, or keywords"
          type="search"
          value={query}
        />
        <div className="mt-4 flex flex-wrap gap-2" role="list">
          {categoryOptions.map((item) => (
            <button
              className={cn(
                "rounded-md border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                item.slug === category
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
              )}
              key={item.slug}
              onClick={() => setCategory(item.slug)}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
          {categories.map((item) => (
            <Link
              className="font-semibold text-blue-700 hover:text-blue-900"
              href={`/insights/category/${item.slug}`}
              key={item.slug}
            >
              {item.title} archive
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
          No articles match that search. Try a broader term or choose another
          category.
        </p>
      ) : null}
    </div>
  );
}
