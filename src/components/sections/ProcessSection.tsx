import { SectionHeader } from "@/components/ui/SectionHeader";
import { homePage } from "@/content/pages";

export function ProcessSection() {
  return (
    <section className="bg-slate-950 py-18 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          description="The process starts with context, then turns training into habits and next steps your team can actually use."
          eyebrow={homePage.process.eyebrow}
          title={homePage.process.headline}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {homePage.process.steps.map((step, index) => (
            <div
              className="motion-surface relative rounded-lg border border-white/10 bg-white/[0.06] p-6"
              key={step.title}
            >
              <div className="grid h-10 w-10 place-items-center rounded-md bg-cyan-300 text-sm font-bold text-slate-950">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
