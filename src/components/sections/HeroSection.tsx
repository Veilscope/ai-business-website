import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { homePage } from "@/content/pages";
import { site } from "@/config/site";

function HeroVisual() {
  const stages = [
    { label: "Train", detail: "Shared AI fundamentals" },
    { label: "Apply", detail: "Role-specific workflows" },
    { label: "Improve", detail: "Standards and support" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 via-cyan-300/10 to-violet-400/20 blur-2xl" />
      <div className="relative rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
        <div className="rounded-lg border border-white/15 bg-slate-950/80 p-4">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan-200">
                Adoption dashboard
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Team readiness snapshot
              </p>
            </div>
            <div className="rounded-md bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
              Practical
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {stages.map((stage, index) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
                key={stage.label}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-cyan-300 text-xs font-bold text-slate-950">
                    {index + 1}
                  </span>
                  <p className="font-semibold text-white">{stage.label}</p>
                </div>
                <p className="mt-3 text-sm leading-5 text-slate-300">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div>
                <p className="text-sm font-semibold text-white">
                  Workflow examples
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Sales follow-up, SOP drafts, meeting summaries, client
                  research
                </p>
              </div>
              <div className="hidden h-px w-14 bg-cyan-200/50 sm:block" />
              <div className="rounded-md bg-white p-3 text-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-700">
                  Next step
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Repeatable team prompts
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {["Safe use", "Prompting", "Review"].map((item) => (
              <div
                className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-center text-xs font-semibold text-slate-200"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.38),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(8,145,178,0.3),transparent_25%),radial-gradient(circle_at_20%_90%,rgba(124,58,237,0.22),transparent_22%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <Badge className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
            {homePage.hero.eyebrow}
          </Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
            {homePage.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
            {homePage.hero.subheadline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            {homePage.hero.supportingCopy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={site.primaryCta.href} showArrow size="lg">
              {site.primaryCta.label}
            </Button>
            <Button href={site.secondaryCta.href} size="lg" variant="secondary">
              {site.secondaryCta.label}
            </Button>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
