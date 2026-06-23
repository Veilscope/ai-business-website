import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand } from "@/config/brand";
import { createSeoMetadata } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createSeoMetadata({
    title: brand.seo.defaultTitle,
    description: brand.seo.defaultDescription,
    path: "/",
  }),
  metadataBase: new URL(brand.seo.siteUrl),
  title: {
    default: brand.seo.defaultTitle,
    template: brand.seo.titleTemplate,
  },
  keywords: [...brand.seo.keywords],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/aitd-logo-mark-192.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-950">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
