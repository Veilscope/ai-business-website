import Link from "next/link";

import type { Service } from "@/content/services";

type ServiceCardProps = {
  service: Service;
  compact?: boolean;
};

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <article className="motion-surface flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 hover:border-blue-200">
      <p className="text-sm font-semibold text-blue-700">{service.category}</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {compact ? service.summary : service.description}
      </p>
      <ul className="mt-5 space-y-2 text-sm text-slate-700">
        {service.bullets.slice(0, compact ? 3 : 5).map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        className="mt-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
        href={`/services#${service.slug}`}
      >
        Learn more <span aria-hidden="true" className="ml-1">-&gt;</span>
      </Link>
    </article>
  );
}
