import type { Metadata } from 'next';
import type { Phone } from '@/types';
import { getSiteUrl } from './utils';

const SITE_NAME = 'Phone Engine';
const SITE_DESCRIPTION = 'اكتشف أفضل الهواتف الذكية مع أدلة شاملة وتقييمات محترفة';

export function buildMetadata({
  title,
  description,
  path = '',
  ogImage,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${path}`;
  const image = ogImage ?? `${siteUrl}/og-default.png`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: keywords?.join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function buildPhoneMetadata(phone: Phone): Metadata {
  return buildMetadata({
    title: phone.name,
    description:
      phone.description ??
      `${phone.name} - المواصفات والمميزات والأدلة الشاملة. شاشة ${phone.specs.display}، كاميرا ${phone.specs.camera}، بطارية ${phone.specs.battery}.`,
    path: `/phones/${phone.brand}/${phone.slug}`,
    ogImage: phone.images[0],
    keywords: [
      phone.name,
      phone.brand,
      'مواصفات',
      phone.specs.chipset,
      'هاتف ذكي',
      'سعر',
      phone.slug,
    ],
  });
}

export function buildPhoneSiteDescription(): string {
  return SITE_DESCRIPTION;
}

export function buildSitemapUrls(phones: Phone[]): string[] {
  const siteUrl = getSiteUrl();
  const urls: string[] = [
    siteUrl,
    `${siteUrl}/phones`,
    `${siteUrl}/guides`,
  ];

  for (const phone of phones) {
    urls.push(`${siteUrl}/phones/${phone.brand}`);
    urls.push(`${siteUrl}/phones/${phone.brand}/${phone.slug}`);
    for (const guide of phone.guides) {
      urls.push(`${siteUrl}/guides/${guide}/${phone.brand}-${phone.slug}`);
    }
  }

  return [...new Set(urls)];
}
