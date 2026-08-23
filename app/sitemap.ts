import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://johannamarie-star.github.io/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
