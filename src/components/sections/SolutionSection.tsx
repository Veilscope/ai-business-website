import { SectionHeader } from "@/components/ui/SectionHeader";
import { homePage } from "@/content/pages";

export function SolutionSection() {
  return (
    <section className="bg-slate-50 py-18 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:px-8">
        <SectionHeader
          description={homePage.solution.copy}
          eyebrow={homePage.solution.eyebrow}
          title={homePage.solution.headline}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {homePage.solution.items.map((item) => (
            <div
              className="motion-surface flex min-h-16 items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5"
              key={item}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
              <p className="text-sm font-semibold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
