import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { brand } from "@/config/brand";
import { legalPages } from "@/content/pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy placeholder for ${brand.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow={legalPages.privacy.eyebrow}
        intro={legalPages.privacy.copy}
        title={legalPages.privacy.headline}
      />
      <section className="bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-base leading-8 text-slate-700 sm:px-6 lg:px-8">
          <p>
            Add details about what personal information is collected, how form
            submissions are handled, what analytics tools are used, how long
            data is retained, and how people can request changes or deletion.
          </p>
          <p className="mt-5">
            This page is intentionally simple until final legal language is
            prepared for the business.
          </p>
        </div>
      </section>
    </>
  );
}
