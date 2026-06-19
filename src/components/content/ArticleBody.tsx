import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

import { urlForImage } from "@/sanity/lib/image";

type SanityImageBlock = {
  _type: "image";
  alt?: string;
  caption?: string;
  asset?: {
    _ref?: string;
  };
};

type CalloutBlock = {
  _type: "callout";
  tone?: "note" | "tip" | "caution";
  title?: string;
  body?: string;
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 text-3xl font-semibold tracking-normal text-slate-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-2xl font-semibold tracking-normal text-slate-950">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-8 text-slate-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-blue-600 pl-5 text-lg font-medium leading-8 text-slate-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-slate-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-slate-700">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");

      if (!isExternal) {
        return (
          <Link className="font-semibold text-blue-700 underline" href={href}>
            {children}
          </Link>
        );
      }

      return (
        <a
          className="font-semibold text-blue-700 underline"
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImageBlock;

      if (!image.asset?._ref) return null;

      const imageUrl = urlForImage(image).width(1200).height(720).fit("crop").url();

      return (
        <figure className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
            <Image
              alt={image.alt || ""}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              src={imageUrl}
            />
          </div>
          {image.caption ? (
            <figcaption className="mt-3 text-sm leading-6 text-slate-500">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    callout: ({ value }) => {
      const callout = value as CalloutBlock;
      const toneClasses = {
        note: "border-blue-100 bg-blue-50 text-blue-950",
        tip: "border-emerald-100 bg-emerald-50 text-emerald-950",
        caution: "border-amber-100 bg-amber-50 text-amber-950",
      };

      return (
        <aside
          className={`mt-8 rounded-lg border p-5 ${
            toneClasses[callout.tone || "note"]
          }`}
        >
          {callout.title ? (
            <h3 className="text-base font-semibold">{callout.title}</h3>
          ) : null}
          {callout.body ? (
            <p className="mt-2 text-sm leading-6">{callout.body}</p>
          ) : null}
        </aside>
      );
    },
  },
};

export function ArticleBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return (
      <p className="text-base leading-8 text-slate-700">
        This article is being prepared. Check back soon for the full post.
      </p>
    );
  }

  return <PortableText components={components} value={value} />;
}
