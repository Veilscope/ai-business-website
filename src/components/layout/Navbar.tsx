"use client";

import Image from "next/image";
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
          <Image
            alt={brand.logoText}
            className="h-9 w-auto"
            height={50}
            priority
            src="/brand/aitd-logo-horizontal.svg"
            width={180}
          />
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
            <span
              className={
                isOpen
                  ? "h-0.5 w-5 translate-y-1.5 rotate-45 bg-current transition duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)]"
                  : "h-0.5 w-5 bg-current transition duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)]"
              }
            />
            <span
              className={
                isOpen
                  ? "h-0.5 w-5 bg-current opacity-0 transition duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)]"
                  : "h-0.5 w-5 bg-current transition duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)]"
              }
            />
            <span
              className={
                isOpen
                  ? "h-0.5 w-5 -translate-y-1.5 -rotate-45 bg-current transition duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)]"
                  : "h-0.5 w-5 bg-current transition duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)]"
              }
            />
          </span>
        </button>
      </nav>

      <div
        aria-hidden={!isOpen}
        className={
          isOpen
            ? "max-h-[32rem] overflow-hidden border-t border-slate-200 bg-white opacity-100 shadow-lg shadow-slate-950/5 transition-[max-height,opacity,border-color] duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)] lg:hidden"
            : "max-h-0 overflow-hidden border-t border-transparent bg-white opacity-0 shadow-lg shadow-slate-950/5 transition-[max-height,opacity,border-color] duration-[var(--site-transition-duration)] ease-[var(--site-transition-timing)] lg:hidden"
        }
        id="mobile-menu"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5">
          {site.navLinks.map((link) => (
            <Link
              className="rounded-md px-3 py-3 text-base font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={link.href}
              key={link.href}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-center text-base font-semibold leading-none text-white shadow-sm shadow-blue-950/20 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href={site.primaryCta.href}
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
          >
            <span>{site.primaryCta.label}</span>
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
