"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
        href="#main-content"
      >
        Skip to main content
      </a>
      <Navbar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
