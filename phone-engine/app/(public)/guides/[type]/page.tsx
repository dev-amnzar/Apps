import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { GuideCard } from '@/components/guides/guide-card';
import { getGuidesByType, getGuideTypeSlugs, getAllGuideTypes } from '@/lib/guides';
import { guideTypeDisplayNameAr, guideTypeDisplayName } from '@/lib/utils';

export const revalidate = 3600;

interface GuideTypePageProps {
  params: { type: string };
}

export async function generateStaticParams() {
  return getGuideTypeSlugs();
}

export async function generateMetadata({ params }: GuideTypePageProps): Promise<Metadata> {
  const guides = getGuidesByType(params.type);
  if (!guides.length) return { title: 'النوع غير موجود' };

  const nameAr = guideTypeDisplayNameAr(params.type);
  return {
    title: `${nameAr} - أدلة الهواتف الذكية`,
    description: `${guides.length} دليل في فئة ${nameAr}. خطوات واضحة ومفصلة لأفضل الهواتف الذكية.`,
  };
}

export default function GuideTypePage({ params }: GuideTypePageProps) {
  const guides = getGuidesByType(params.type);

  if (!guides.length) {
    notFound();
  }

  const nameAr = guideTypeDisplayNameAr(params.type);
  const nameEn = guideTypeDisplayName(params.type);

  return (
    <div className="py-8">
      <Container>
        <BreadcrumbJsonLd
          items={[
            { label: 'الأدلة', href: '/guides' },
            { label: nameAr },
          ]}
        />
        <Breadcrumbs
          items={[
            { label: 'الأدلة', href: '/guides' },
            { label: nameAr },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{nameAr}</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{nameEn}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {guides.length} دليل متاح
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={`${guide.type}-${guide.phone}`} guide={guide} />
          ))}
        </div>
      </Container>
    </div>
  );
}
