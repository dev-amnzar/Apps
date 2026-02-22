import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { PhoneCard } from '@/components/phones/phone-card';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { getAllPhones, getAllBrands, getPhonesByBrand } from '@/lib/phones';
import { brandDisplayName } from '@/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'كل الهواتف الذكية - مواصفات وأسعار',
  description:
    'تصفح مجموعتنا الشاملة من الهواتف الذكية مع المواصفات التفصيلية والأسعار. سامسونج، آيفون، شاومي، وأكثر.',
  openGraph: {
    title: 'كل الهواتف الذكية | Phone Engine',
    description: 'تصفح أحدث الهواتف الذكية مع مواصفات تفصيلية وأسعار محدثة.',
  },
};

const brandColors: Record<string, string> = {
  samsung: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  iphone: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  xiaomi: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  google: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  huawei: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  oneplus: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
};

interface PhonesPageProps {
  searchParams: { q?: string; brand?: string };
}

export default function PhonesPage({ searchParams }: PhonesPageProps) {
  const { q, brand: brandFilter } = searchParams;
  const allBrands = getAllBrands();
  const allPhones = getAllPhones();

  const filteredPhones = allPhones.filter((phone) => {
    const matchesBrand = !brandFilter || phone.brand === brandFilter;
    const matchesQuery = !q || phone.name.toLowerCase().includes(q.toLowerCase()) || phone.brand.toLowerCase().includes(q.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  return (
    <div className="py-8">
      <Container>
        <BreadcrumbJsonLd items={[{ label: 'الهواتف', href: '/phones' }]} />

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'الهواتف' }]} className="mb-6" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            الهواتف الذكية
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {allPhones.length} هاتف في قاعدة بياناتنا
          </p>
        </div>

        {/* Brands Grid */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            العلامات التجارية
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/phones"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                !brandFilter
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400'
              }`}
            >
              الكل ({allPhones.length})
            </Link>
            {allBrands.map((b) => {
              const count = getPhonesByBrand(b).length;
              const colorClass = brandColors[b] ?? 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
              const isActive = brandFilter === b;
              return (
                <Link
                  key={b}
                  href={isActive ? '/phones' : `/phones?brand=${b}`}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : `border-transparent ${colorClass} hover:opacity-80`
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  {brandDisplayName(b)}
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                    {count}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Search result info */}
        {(q ?? brandFilter) && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>
              {filteredPhones.length} نتيجة
              {q && ` لـ "${q}"`}
              {brandFilter && ` في ${brandDisplayName(brandFilter)}`}
            </span>
            <Link
              href="/phones"
              className="text-brand-600 hover:underline dark:text-brand-400"
            >
              إلغاء التصفية
            </Link>
          </div>
        )}

        {/* Phones Grid */}
        {filteredPhones.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPhones.map((phone) => (
              <PhoneCard key={`${phone.brand}-${phone.slug}`} phone={phone} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Smartphone className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700" />
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
              لا توجد نتائج
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              جرب البحث بكلمات مختلفة أو غيّر العلامة التجارية
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
