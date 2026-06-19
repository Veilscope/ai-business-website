import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { brand } from "@/config/brand";
import { getArticleBySlug, articles } from "@/content/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

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
              {article.category} · {article.readTime}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              {article.excerpt}
            </p>
            <p className="mt-6 text-sm text-slate-300">
              {article.date} · {article.author}
            </p>
          </div>
        </header>

        <div className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-6 lg:px-8">
            {article.body.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-5 text-base leading-8 text-slate-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

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
      <CTASection
        copy="Talk through where your team is today, what you have already tried, and what a practical training path could look like."
        headline="Need a practical starting point?"
      />
    </>
  );
}
