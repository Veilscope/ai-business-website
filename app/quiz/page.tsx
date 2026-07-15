import type { Metadata } from "next";

import { QuizForm } from "@/components/forms/QuizForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/config/site";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(site.metadata.quiz);

export default function QuizPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI readiness quiz"
        intro="Answer 8 practical questions and receive a workplace AI readiness result across practical use, prompting, review, and workflow habits."
        title="Workplace AI Readiness Quiz"
      />
      <section className="bg-slate-50 py-18 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <QuizForm />
        </div>
      </section>
    </>
  );
}
