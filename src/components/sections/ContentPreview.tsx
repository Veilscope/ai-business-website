import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { articles } from "@/content/articles";

export function ContentPreview() {
  return (
    <section className="bg-slate-50 py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Practical thinking on AI training, adoption, workflows, and responsible use for small teams."
            eyebrow="Insights"
            title="Useful context before you choose a path."
          />
          <Button href="/insights" variant="outline">
            View all insights
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <article
              className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              key={article.slug}
            >
              <p className="text-sm font-semibold text-blue-700">
                {article.category} · {article.readTime}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-7 text-slate-950">
                <Link href={`/insights/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
