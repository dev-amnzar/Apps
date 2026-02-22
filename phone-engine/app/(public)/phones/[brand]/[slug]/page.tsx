import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PhoneGallery } from '@/components/phones/phone-gallery';
import { PhoneSpecsTable } from '@/components/phones/phone-specs';
import { PhoneIssues } from '@/components/phones/phone-issues';
import { PhoneGuides } from '@/components/phones/phone-guides';
import { PhoneCard } from '@/components/phones/phone-card';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import {
  getPhoneBySlug,
  getAllPhoneSlugs,
  getRelatedPhones,
} from '@/lib/phones';
import { buildPhoneMetadata, brandDisplayName, formatPrice } from '@/lib/utils';

export const revalidate = 3600;

interface PhonePageProps {
  params: { brand: string; slug: string };
}

export async function generateStaticParams() {
  return getAllPhoneSlugs();
}

export async function generateMetadata({ params }: PhonePageProps): Promise<Metadata> {
  const phone = getPhoneBySlug(params.brand, params.slug);
  if (!phone) return { title: 'هاتف غير موجود' };
  return buildPhoneMetadata(phone);
}

export default function PhonePage({ params }: PhonePageProps) {
  const phone = getPhoneBySlug(params.brand, params.slug);

  if (!phone) {
    notFound();
  }

  const related = getRelatedPhones(phone.brand, phone.slug, 3);
  const brandName = brandDisplayName(phone.brand);

  return (
    <div className="py-8">
      <Container>
        {/* Structured Data */}
        <ProductJsonLd phone={phone} />
        <BreadcrumbJsonLd
          items={[
            { label: 'الهواتف', href: '/phones' },
            { label: brandName, href: `/phones/${phone.brand}` },
            { label: phone.name },
          ]}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'الهواتف', href: '/phones' },
            { label: brandName, href: `/phones/${phone.brand}` },
            { label: phone.name },
          ]}
          className="mb-6"
        />

        {/* Phone Hero */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <PhoneGallery images={phone.images} name={phone.name} />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{brandName}</Badge>
                {phone.rating && (
                  <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400" />
                    {phone.rating} / 5
                  </div>
                )}
                {phone.releaseDate && (
                  <Badge variant="outline" className="text-xs">
                    {new Date(phone.releaseDate).getFullYear()}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {phone.name}
              </h1>

              {phone.description && (
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {phone.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
              <span className="text-sm text-gray-500 dark:text-gray-400">السعر التقريبي</span>
              <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                {formatPrice(phone.price)}
              </span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'الشاشة', value: phone.specs.display },
                { label: 'المعالج', value: phone.specs.chipset },
                { label: 'الكاميرا', value: phone.specs.camera },
                { label: 'البطارية', value: phone.specs.battery },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg border bg-white p-3 dark:border-gray-700/50 dark:bg-gray-900"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" asChild>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(phone.name + ' buy')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  ابحث عن أفضل سعر
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <PhoneSpecsTable specs={phone.specs} />
            <PhoneIssues issues={phone.issues} phoneName={phone.name} />
          </div>
          <div>
            <PhoneGuides guides={phone.guides} brand={phone.brand} slug={phone.slug} />
          </div>
        </div>

        {/* Related Phones */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                هواتف مشابهة من {brandName}
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/phones/${phone.brand}`}>عرض الكل</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PhoneCard key={p.slug} phone={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
