import type { FAQ } from "@/content/faqs";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FAQSectionProps = {
  faqs: FAQ[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="bg-slate-50 py-18 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          description="Straight answers for teams that want practical value without inflated claims."
          eyebrow="FAQ"
          title="Common questions before teams start."
        />
          <div className="motion-surface mt-10 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {faqs.map((item) => (
            <details className="group p-6" key={item.question}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left text-base font-semibold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                {item.question}
                <span className="mt-1 text-blue-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
