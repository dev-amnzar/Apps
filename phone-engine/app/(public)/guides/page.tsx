import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Settings, ArrowLeftRight, Wrench, Lightbulb } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { getAllGuides, getAllGuideTypes } from '@/lib/guides';
import { GuideCard } from '@/components/guides/guide-card';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'أدلة الهواتف الذكية الشاملة',
  description:
    'أدلة خطوة بخطوة لإعداد هاتفك، نقل البيانات، حل المشاكل الشائعة، ونصائح احترافية لأفضل الهواتف.',
};

const typeIcons: Record<string, React.ElementType> = {
  setup: Settings,
  transfer: ArrowLeftRight,
  troubleshoot: Wrench,
  tips: Lightbulb,
};

const typeColors: Record<string, string> = {
  setup: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  transfer: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
  troubleshoot: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
  tips: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
};

export default function GuidesPage() {
  const guideTypes = getAllGuideTypes();
  const allGuides = getAllGuides();

  return (
    <div className="py-8">
      <Container>
        <BreadcrumbJsonLd items={[{ label: 'الأدلة', href: '/guides' }]} />
        <Breadcrumbs items={[{ label: 'الأدلة' }]} className="mb-6" />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            أدلة الهواتف الذكية
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {allGuides.length} دليل شامل لمساعدتك
          </p>
        </div>

        {/* Guide Types Grid */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            فئات الأدلة
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {guideTypes.map((gt) => {
              const Icon = typeIcons[gt.type] ?? BookOpen;
              const colorClass = typeColors[gt.type] ?? 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
              const count = allGuides.filter((g) => g.type === gt.type).length;
              return (
                <Link
                  key={gt.type}
                  href={`/guides/${gt.type}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border bg-white p-4 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700/50 dark:bg-gray-900"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {gt.labelAr}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{gt.label}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{count} أدلة</Badge>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Guides */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            كل الأدلة
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allGuides.map((guide) => (
              <GuideCard key={`${guide.type}-${guide.phone}`} guide={guide} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
