import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-blue-700">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
          This page could not be found.
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          The page may have moved, or the link may no longer be active. Use the
          main navigation or start with the AI training services page.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/services" showArrow>
            View services
          </Button>
          <Link
            className="text-sm font-semibold text-slate-700 hover:text-slate-950"
            href="/"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
