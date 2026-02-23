import type { MetadataRoute } from "next";
import { getAllPhoneSlugs, getAllBrandSlugs } from "@/lib/phones";
import { getAllGuideSlugs, getGuideTypeSlugs } from "@/lib/guides";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const phoneSlugs = getAllPhoneSlugs();
  const brandSlugs = getAllBrandSlugs();
  const guideSlugs = getAllGuideSlugs();
  const guideTypeSlugs = getGuideTypeSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/phones`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const brandPages: MetadataRoute.Sitemap = brandSlugs.map((brand) => ({
    url: `${SITE_URL}/phones/${brand}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const phonePages: MetadataRoute.Sitemap = phoneSlugs.map(({ brand, slug }) => ({
    url: `${SITE_URL}/phones/${brand}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guideTypePages: MetadataRoute.Sitemap = guideTypeSlugs.map((type) => ({
    url: `${SITE_URL}/guides/${type}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map(({ type, phone }) => ({
    url: `${SITE_URL}/guides/${type}/${phone}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...phonePages,
    ...guideTypePages,
    ...guidePages,
  ];
}
