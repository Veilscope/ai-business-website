import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { brand } from "@/config/brand";
import { legalPages } from "@/content/pages";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Privacy Policy",
  description: `How ${brand.name} handles contact form submissions, email communication, and site privacy for AI training inquiries.`,
  path: "/privacy",
});

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
            {brand.name} collects the information you choose to submit through
            the contact form, including your name, email address, organization
            details, preferred contact method, and message. This information is
            used to respond to your inquiry and discuss relevant AI training or
            workflow support options.
          </p>
          <p className="mt-5">
            Contact form submissions are delivered by email to the business.
            Basic technical details, such as source IP address and submission
            timing, may be used to reduce spam and protect the form from abuse.
            Do not include confidential client data, passwords, protected health
            information, payment details, or other sensitive information in the
            form.
          </p>
          <p className="mt-5">
            The site may use hosting logs and service-provider records needed
            to operate, secure, and maintain the website. If analytics or
            advertising tools are added later, this policy should be updated to
            describe those tools before they are enabled.
          </p>
          <p className="mt-5">
            To ask about information you submitted, request an update, or ask
            for deletion of a prior inquiry, email{" "}
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
