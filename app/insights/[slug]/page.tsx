import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/content/ArticleBody";
import { ArticleCard } from "@/components/content/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { brand } from "@/config/brand";
import { createSeoMetadata } from "@/lib/seo";
import { getArticleBySlug, getArticleSlugs } from "@/sanity/lib/articles";
import { urlForImage } from "@/sanity/lib/image";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticleSlugs();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return createSeoMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return createSeoMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/insights/${slug}`,
    noIndex: Boolean(article.noIndex),
    type: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();
  const imageUrl = article.featuredImage?.asset?._ref
    ? urlForImage(article.featuredImage).width(1400).height(780).fit("crop").url()
    : null;

  return (
    <>
      <article>
        <header className="bg-slate-950 py-18 text-white sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <Link
              className="text-sm font-semibold text-cyan-200 hover:text-white"
              href="/insights"
            >
              &lt;- Back to insights
            </Link>
            <p className="mt-8 text-sm font-semibold text-cyan-200">
              {article.category?.title || "Insight"} ·{" "}
              {article.readTime || "4 min read"}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              {article.excerpt}
            </p>
            <p className="mt-6 text-sm text-slate-300">
              {article.publishedAt
                ? new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                  }).format(new Date(article.publishedAt))
                : "Draft date"}{" "}
              · {article.author?.name || brand.name}
            </p>
          </div>
        </header>

        <div className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-6 lg:px-8">
            {imageUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  alt={article.featuredImage?.alt || ""}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  src={imageUrl}
                />
              </div>
            ) : null}

            <ArticleBody value={article.body} />

            <div className="motion-surface rounded-lg border border-blue-100 bg-blue-50 p-6">
              <h2 className="text-xl font-semibold text-slate-950">
                Bring the idea back to your team.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {brand.name} helps Denver metro organizations turn AI concepts
                into practical training, standards, and workflow habits.
              </p>
            </div>
          </div>
        </div>
      </article>
      {article.relatedArticles?.length ? (
        <section className="bg-slate-50 py-18 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950">
              Related insights
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {article.relatedArticles.map((related) => (
                <ArticleCard article={related} key={related.slug} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CTASection
        copy="Talk through where your team is today, what you have already tried, and what a practical training path could look like."
        headline="Need a practical starting point?"
      />
    </>
  );
}
