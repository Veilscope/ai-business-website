import { SectionHeader } from "@/components/ui/SectionHeader";
import { homePage } from "@/content/pages";

export function PrinciplesSection() {
  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow={homePage.principles.eyebrow}
          title={homePage.principles.headline}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homePage.principles.items.map((principle) => (
            <div
              className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              key={principle}
            >
              <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500" />
              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                {principle}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
