import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { ArticleListItem } from "@/sanity/lib/types";

export function ArticleCard({ article }: { article: ArticleListItem }) {
  const imageUrl = article.featuredImage?.asset?._ref
    ? urlForImage(article.featuredImage).width(900).height(520).fit("crop").url()
    : null;

  return (
    <article className="motion-surface flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
      {imageUrl ? (
        <div className="relative aspect-[16/9] bg-slate-100">
          <Image
            alt={article.featuredImage?.alt || ""}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={imageUrl}
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-blue-700">
          {article.category?.title || "Insight"} · {article.readTime || "4 min read"}
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
      </div>
    </article>
  );
}
