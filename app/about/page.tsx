import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/config/site";
import { aboutPage } from "@/content/pages";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(site.metadata.about);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutPage.eyebrow}
        intro={aboutPage.intro}
        title={aboutPage.headline}
      />

      <section className="bg-white py-18 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeader
              description={aboutPage.mission.copy}
              eyebrow="Mission"
              title={aboutPage.mission.headline}
            />
            <p className="motion-surface mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5 text-base leading-7 text-slate-700">
              {aboutPage.local}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutPage.philosophy.map((item) => (
              <div
                className="motion-surface rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                key={item}
              >
                <div className="h-1.5 w-12 rounded-full bg-cyan-500" />
                <p className="mt-4 text-base font-semibold leading-7 text-slate-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            description="These values shape the way training, discovery, and workflow support are designed."
            eyebrow="Values"
            title="A practical approach for skeptical teams."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {aboutPage.values.map((value) => (
              <div
                className="motion-surface rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm shadow-slate-950/5"
                key={value}
              >
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            description="The work is split between practical systems thinking and the client-facing experience needed to make AI adoption clear."
            eyebrow="Co-founders"
            title="Built by operators with complementary focus."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {aboutPage.team.map((member) => (
              <article
                className="motion-surface rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                key={member.name}
              >
                <div className="grid h-14 w-14 place-items-center rounded-md bg-slate-950 text-sm font-bold text-white">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-950">
                  {member.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        copy="Start by clarifying what your team needs to understand, where AI could help, and what responsible adoption should look like for your organization."
        headline="Build practical AI capability before chasing tools."
      />
    </>
  );
}
