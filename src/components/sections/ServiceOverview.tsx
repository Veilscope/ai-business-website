import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { site } from "@/config/site";
import { services } from "@/content/services";

type ServiceOverviewProps = {
  compact?: boolean;
};

export function ServiceOverview({ compact = true }: ServiceOverviewProps) {
  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Start with training, then add use case discovery or workflow support where it makes sense."
            eyebrow="Services"
            title="Practical support for AI adoption."
          />
          <Button href="/services" variant="outline">
            View all services
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard compact={compact} key={service.slug} service={service} />
          ))}
        </div>
        <div className="motion-surface mt-10 rounded-lg border border-blue-100 bg-blue-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-sm font-semibold text-blue-800">
              For teams that want clarity before investing heavily.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              A strategy call helps determine whether training, discovery, or a
              lightweight workflow system is the best first step.
            </p>
          </div>
          <Button className="mt-5 shrink-0 sm:mt-0" href={site.primaryCta.href}>
            {site.primaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
