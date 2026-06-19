import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/content/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getArticlesByCategory,
  getCategories,
  getCategoryBySlug,
} from "@/sanity/lib/articles";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category not found",
    };
  }

  return {
    title: `${category.title} Articles`,
    description:
      category.seoDescription ||
      category.description ||
      `Articles about ${category.title} from Denver AI Enablement.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, articles] = await Promise.all([
    getCategoryBySlug(slug),
    getArticlesByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Insight category"
        intro={
          category.description ||
          "Browse practical articles from this topic area."
        }
        title={`${category.title} Articles`}
      />
      <section className="bg-slate-50 py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
          {articles.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
              No published articles are in this category yet.
            </p>
          ) : null}
        </div>
      </section>
      <CTASection
        copy="Use these articles for context, then send a note when you want practical help applying AI to your team."
        headline="Want help turning this into action?"
      />
    </>
  );
}
