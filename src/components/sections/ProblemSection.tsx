import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homePage } from "@/content/pages";

export function ProblemSection() {
  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          description={homePage.problem.copy}
          eyebrow={homePage.problem.eyebrow}
          title={homePage.problem.headline}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homePage.problem.items.map((item) => (
            <Card className="h-full" key={item.title}>
              <div className="h-10 w-10 rounded-md bg-blue-50 ring-1 ring-blue-100" />
              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
