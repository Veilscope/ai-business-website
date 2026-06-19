"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "denver_ai_enablement",
  title: "Denver AI Enablement",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    productionUrl: async (prev, context) => {
      const { document } = context;

      if (document._type === "article" && document.slug) {
        const slug = document.slug as { current?: string };

        if (slug.current) {
          return `/insights/${slug.current}`;
        }
      }

      return prev;
    },
  },
});
