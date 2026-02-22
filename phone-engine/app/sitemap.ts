import type { MetadataRoute } from 'next';
import { getAllPhones, getAllBrands } from '@/lib/phones';
import { getAllGuideSlugs, getGuideTypeSlugs } from '@/lib/guides';
import { getSiteUrl } from '@/lib/utils';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const phones = getAllPhones();
  const brands = getAllBrands();
  const guideSlugs = getAllGuideSlugs();
  const guideTypes = getGuideTypeSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/phones`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${siteUrl}/phones/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const phoneRoutes: MetadataRoute.Sitemap = phones.map((phone) => ({
    url: `${siteUrl}/phones/${phone.brand}/${phone.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const guideTypeRoutes: MetadataRoute.Sitemap = guideTypes.map(({ type }) => ({
    url: `${siteUrl}/guides/${type}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map(({ type, phone }) => ({
    url: `${siteUrl}/guides/${type}/${phone}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...brandRoutes,
    ...phoneRoutes,
    ...guideTypeRoutes,
    ...guideRoutes,
  ];
}
