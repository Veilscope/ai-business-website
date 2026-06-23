import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { brand } from "@/config/brand";
import { legalPages } from "@/content/pages";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Terms",
  description: `Basic website terms for using ${brand.name} information, contact forms, and service inquiry pages.`,
  path: "/terms",
});

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
            This website provides general information about {brand.name},
            practical AI training, use case discovery, workflow support, and
            related services. Website content is informational and does not
            create a client relationship or guarantee a specific business
            result.
          </p>
          <p className="mt-5">
            Service scope, deliverables, scheduling, payment terms,
            cancellations, and ownership of client-specific materials should be
            confirmed in a written agreement or proposal before work begins.
          </p>
          <p className="mt-5">
            Do not misuse the contact form, attempt to interfere with the site,
            or submit unlawful, confidential, or sensitive third-party
            information. The business may decline inquiries that are abusive,
            unrelated, or not a fit for the services offered.
          </p>
          <p className="mt-5">
            Questions about these terms can be sent to{" "}
            <a className="font-semibold text-blue-700" href={`mailto:${brand.contact.email}`}>
              {brand.contact.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
