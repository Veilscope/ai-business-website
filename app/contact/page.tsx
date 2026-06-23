import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/config/site";
import { brand } from "@/config/brand";
import { contactPage } from "@/content/pages";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(site.metadata.contact);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={contactPage.eyebrow}
        intro={contactPage.intro}
        title={contactPage.headline}
      />
      <section className="bg-slate-50 py-18 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <aside className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
            <h2 className="text-2xl font-semibold text-slate-950">
              Contact details
            </h2>
            <div className="mt-6 space-y-5">
              {contactPage.details.map((detail) => (
                <div key={detail.label}>
                  <p className="text-sm font-semibold text-slate-500">
                    {detail.label}
                  </p>
                  {detail.value === brand.contact.email ? (
                    <a
                      className="mt-1 inline-block text-base font-medium text-blue-700 hover:text-blue-900"
                      href={`mailto:${brand.contact.email}`}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base font-medium text-slate-950">
                      {detail.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="motion-surface mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
              <h3 className="text-base font-semibold text-slate-950">
                Communication preference
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Email is the primary contact path. If you prefer text, include
                a mobile number in your request.
              </p>
            </div>
          </aside>

          <div className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              Tell us about your team
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Share a few details and the message will be sent directly to AI
              Training Denver.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
