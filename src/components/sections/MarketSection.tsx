import { SectionHeader } from "@/components/ui/SectionHeader";
import { homePage } from "@/content/pages";

export function MarketSection() {
  return (
    <section className="bg-slate-50 py-18 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <SectionHeader
          description={homePage.market.copy}
          eyebrow={homePage.market.eyebrow}
          title={homePage.market.headline}
        />
        <div className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
          <div className="grid gap-4">
            {homePage.market.points.map((point) => (
              <div className="flex gap-3" key={point}>
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-blue-600 text-xs font-bold text-white">
                  +
                </span>
                <p className="text-base font-medium leading-7 text-slate-800">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
