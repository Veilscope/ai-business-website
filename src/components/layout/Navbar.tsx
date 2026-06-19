"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { site } from "@/config/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        <Link
          className="flex items-center gap-3 text-sm font-semibold text-slate-950 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-sm font-bold text-white">
            AI
          </span>
          <span>{brand.logoText}</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {site.navLinks.map((link) => (
            <Link
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href={site.primaryCta.href} showArrow size="sm">
            {site.primaryCta.label}
          </Button>
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
          </span>
        </button>
      </nav>

      {isOpen ? (
        <div
          className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg shadow-slate-950/5 lg:hidden"
          id="mobile-menu"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {site.navLinks.map((link) => (
              <Link
                className="rounded-md px-3 py-3 text-base font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="mt-3 w-full"
              href={site.primaryCta.href}
              showArrow
              size="lg"
            >
              {site.primaryCta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
