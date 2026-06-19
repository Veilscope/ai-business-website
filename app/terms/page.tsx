import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { legalPages } from "@/content/pages";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms placeholder for Denver AI Enablement.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow={legalPages.terms.eyebrow}
        intro={legalPages.terms.copy}
        title={legalPages.terms.headline}
      />
      <section className="bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-base leading-8 text-slate-700 sm:px-6 lg:px-8">
          <p>
            Add details about service scope, delivery process, payment terms,
            cancellations, intellectual property, disclaimers, and limits of
            liability once the business model is finalized.
          </p>
          <p className="mt-5">
            This page is intentionally simple and should be replaced with
            reviewed legal language before launch.
          </p>
        </div>
      </section>
    </>
  );
}
