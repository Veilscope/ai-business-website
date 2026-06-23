import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";
import { servicesPage } from "@/content/pages";
import { services } from "@/content/services";
import { createSeoMetadata } from "@/lib/seo";
import { serviceListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = createSeoMetadata(site.metadata.services);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceListJsonLd()} />
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        intro={servicesPage.intro}
        title={servicesPage.headline}
      />

      <section className="bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {services.map((service) => (
              <article
                className="motion-surface scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 lg:p-8"
                id={service.slug}
                key={service.slug}
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="text-sm font-semibold text-blue-700">
                      {service.category}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {service.description}
                    </p>
                    <Button className="mt-6" href="/contact" showArrow>
                      {service.cta}
                    </Button>
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    <DetailList title="Best for" items={service.bestFor} />
                    <DetailList title="Included" items={service.included} />
                    <DetailList title="Outcomes" items={service.outcomes} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            description="The right first step depends on team confidence, leadership clarity, and whether your workflows are ready to change."
            eyebrow="How to choose"
            title={servicesPage.comparison.headline}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {servicesPage.comparison.items.map((item) => (
              <div
                className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                key={item.title}
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs.slice(0, 6)} />
      <CTASection
        copy="Bring a few details about your team, your workflows, and what has already been tried. We will help you identify the most practical next step."
        headline="Not sure which service fits yet?"
      />
    </>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
