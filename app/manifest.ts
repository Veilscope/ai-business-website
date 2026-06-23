import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: "AI Training Denver",
    description: brand.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#0B1220",
    icons: [
      {
        src: "/brand/aitd-logo-mark-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/aitd-logo-mark-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
