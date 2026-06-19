"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Article } from "@/content/articles";
import { articleCategories } from "@/content/articles";
import { cn } from "@/lib/utils";

type ContentHubProps = {
  articles: Article[];
};

export function ContentHub({ articles }: ContentHubProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${article.title} ${article.excerpt} ${article.category}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
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
          {articleCategories.map((item) => (
            <button
              className={cn(
                "rounded-md border px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                item === category
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
              )}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <article
            className="motion-surface flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
            key={article.slug}
          >
            <p className="text-sm font-semibold text-blue-700">
              {article.category} · {article.readTime}
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-7 text-slate-950">
              <Link href={`/insights/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
              {article.excerpt}
            </p>
            <Link
              className="mt-6 text-sm font-semibold text-blue-700 hover:text-blue-900"
              href={`/insights/${article.slug}`}
            >
              Read article <span aria-hidden="true">-&gt;</span>
            </Link>
          </article>
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
