import type { Metadata } from "next";

import { brand } from "@/config/brand";

type SeoMetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

const defaultOgImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${brand.name} logo and brand preview`,
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, brand.seo.siteUrl).toString();
}

export function createSeoMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  type = "website",
}: SeoMetadataInput): Metadata {
  const canonical = path;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      type,
      locale: "en_US",
      siteName: brand.name,
      url: canonical,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}
