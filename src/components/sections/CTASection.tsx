import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { homePage } from "@/content/pages";

type CTASectionProps = {
  headline?: string;
  copy?: string;
};

export function CTASection({ headline, copy }: CTASectionProps) {
  return (
    <section className="bg-slate-950 py-18 text-white sm:py-24">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
          {headline ?? homePage.finalCta.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          {copy ?? homePage.finalCta.copy}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={site.primaryCta.href} showArrow size="lg">
            {site.primaryCta.label}
          </Button>
          <Button href="/services" size="lg" variant="secondary">
            {site.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
