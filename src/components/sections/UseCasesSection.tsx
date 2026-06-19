import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCases } from "@/content/useCases";

export function UseCasesSection() {
  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          description="These examples are starting points for training exercises and workflow reviews. Actual fit depends on your team, data, review process, and business context."
          eyebrow="Use cases"
          title="AI training built around real business tasks."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {useCases.map((useCase) => (
            <article
              className="motion-surface rounded-lg border border-slate-200 bg-slate-50 p-5 hover:border-cyan-200 hover:bg-white"
              key={useCase.title}
            >
              <h3 className="text-base font-semibold text-slate-950">
                {useCase.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {useCase.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
