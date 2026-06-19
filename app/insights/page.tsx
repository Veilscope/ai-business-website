import type { Metadata } from "next";

import { ContentHub } from "@/components/content/ContentHub";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/config/site";
import {
  getArticles,
  getCategories,
  getFeaturedArticle,
} from "@/sanity/lib/articles";

export const metadata: Metadata = site.metadata.insights;

export default async function InsightsPage() {
  const [articles, categories, featuredArticle] = await Promise.all([
    getArticles(),
    getCategories(),
    getFeaturedArticle(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        intro="Practical articles for teams exploring AI training, use case discovery, workflow adoption, and responsible implementation."
        title="AI adoption guidance for small teams and Denver businesses."
      />
      <section className="bg-slate-50 py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <ContentHub
            articles={articles}
            categories={categories}
            featuredArticle={featuredArticle}
          />
        </div>
      </section>
      <CTASection
        copy="Use the articles for context, then send a note when you want to map AI training to your actual team and workflows."
        headline="Want help applying this to your team?"
      />
    </>
  );
}
