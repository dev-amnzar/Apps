import type { Phone } from '@/types';
import { getSiteUrl, brandDisplayName } from '@/lib/utils';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({ phone }: { phone: Phone }) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/phones/${phone.brand}/${phone.slug}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: phone.name,
    description:
      phone.description ??
      `${phone.name} - شاشة ${phone.specs.display}، كاميرا ${phone.specs.camera}`,
    image: phone.images,
    brand: {
      '@type': 'Brand',
      name: brandDisplayName(phone.brand),
    },
    offers: {
      '@type': 'Offer',
      price: phone.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
    },
    aggregateRating: phone.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: phone.rating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 120,
        }
      : undefined,
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  const siteUrl = getSiteUrl();
  const allItems = [{ label: 'الرئيسية', href: '/' }, ...items];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Phone Engine',
    url: siteUrl,
    description: 'اكتشف أفضل الهواتف الذكية مع أدلة شاملة وتقييمات محترفة',
    inLanguage: 'ar',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/phones?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
}
