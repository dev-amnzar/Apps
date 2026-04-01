import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { GuideSteps } from '@/components/guides/guide-steps';
import { GuideCard } from '@/components/guides/guide-card';
import {
  getGuide,
  getAllGuideSlugs,
  getRelatedGuides,
} from '@/lib/guides';
import { getPhoneBySlug } from '@/lib/phones';
import { guideTypeDisplayNameAr, guideTypeDisplayName } from '@/lib/utils';

export const revalidate = 3600;

interface GuidePageProps {
  params: { type: string; phone: string };
}

export async function generateStaticParams() {
  return getAllGuideSlugs();
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getGuide(params.type, params.phone);
  if (!guide) return { title: 'الدليل غير موجود' };

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: `${guide.title} | Phone Engine`,
      description: guide.description,
    },
  };
}

function parsePhoneKey(phoneKey: string): { brand: string; slug: string } | null {
  const parts = phoneKey.split('-');
  if (parts.length < 2) return null;
  // First segment is brand, rest is slug
  const brand = parts[0];
  const slug = parts.slice(1).join('-');
  return { brand, slug };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide(params.type, params.phone);

  if (!guide) {
    notFound();
  }

  const typeNameAr = guideTypeDisplayNameAr(guide.type);
  const typeNameEn = guideTypeDisplayName(guide.type);
  const related = getRelatedGuides(guide.type, guide.phone, 3);

  // Try to find the phone for cross-linking
  const phoneInfo = parsePhoneKey(params.phone);
  const linkedPhone = phoneInfo
    ? getPhoneBySlug(phoneInfo.brand, phoneInfo.slug)
    : undefined;

  return (
    <div className="py-8">
      <Container size="lg">
        {/* Structured Data */}
        <BreadcrumbJsonLd
          items={[
            { label: 'الأدلة', href: '/guides' },
            { label: typeNameAr, href: `/guides/${guide.type}` },
            { label: guide.title },
          ]}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'الأدلة', href: '/guides' },
            { label: typeNameAr, href: `/guides/${guide.type}` },
            { label: guide.title },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{typeNameAr}</Badge>
                <Badge variant="outline" className="text-xs">{typeNameEn}</Badge>
                {guide.updatedAt && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <CalendarDays className="h-3 w-3" />
                    محدث: {new Date(guide.updatedAt).toLocaleDateString('ar-SA')}
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
                {guide.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{guide.description}</p>
            </div>

            {/* Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الخطوات التفصيلية</CardTitle>
              </CardHeader>
              <CardContent>
                <GuideSteps steps={guide.steps} />
              </CardContent>
            </Card>

            {/* Video Placeholder */}
            <div className="mt-6 overflow-hidden rounded-xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                    <svg className="h-7 w-7 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    الفيديو التوضيحي قريباً
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Linked Phone */}
            {linkedPhone && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">الهاتف المرتبط بهذا الدليل</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/phones/${linkedPhone.brand}/${linkedPhone.slug}`}
                    className="group flex items-center gap-3 rounded-lg border p-3 transition-all hover:border-brand-300 hover:bg-brand-50 dark:border-gray-700 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
                        {linkedPhone.name}
                      </p>
                      <p className="text-xs text-gray-400">{linkedPhone.specs.chipset}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Related Guides */}
            {related.length > 0 && (
              <div>
                <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                  أدلة مشابهة
                </h2>
                <div className="space-y-3">
                  {related.map((g) => (
                    <GuideCard key={`${g.type}-${g.phone}`} guide={g} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
