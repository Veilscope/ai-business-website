import Image from "next/image";
import Link from "next/link";

import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { services } from "@/content/services";

export function Footer() {
  const textNumber: string = brand.contact.textNumber;

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            className="inline-flex items-center gap-3 text-sm font-semibold"
            href="/"
          >
            <Image
              alt={brand.name}
              className="h-10 w-auto"
              height={50}
              src="/brand/aitd-logo-horizontal-white.svg"
              width={180}
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
            {site.footerDescription}
          </p>
          <p className="mt-5 text-sm text-slate-400">
            Serving {brand.market.city}, the {brand.market.region}, and remote
            Colorado teams.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Navigation</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Services</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  className="hover:text-white"
                  href={`/services#${service.slug}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>
              <a className="hover:text-white" href={`mailto:${brand.contact.email}`}>
                {brand.contact.email}
              </a>
            </li>
            {textNumber ? (
              <li>
                <a
                  className="hover:text-white"
                  href={`sms:${textNumber.replace(/\D/g, "")}`}
                >
                  Text: {textNumber}
                </a>
              </li>
            ) : null}
            <li>{brand.market.region} support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            Copyright {new Date().getFullYear()} {brand.name}. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <Link className="hover:text-white" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-white" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
