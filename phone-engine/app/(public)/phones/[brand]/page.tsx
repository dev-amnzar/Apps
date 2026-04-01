import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { PhoneCard } from '@/components/phones/phone-card';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { getPhonesByBrand, getAllBrands, getBrandSlugs } from '@/lib/phones';
import { brandDisplayName } from '@/lib/utils';

export const revalidate = 3600;

interface BrandPageProps {
  params: { brand: string };
}

export async function generateStaticParams() {
  return getBrandSlugs();
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const phones = getPhonesByBrand(params.brand);
  if (!phones.length) return { title: 'علامة تجارية غير موجودة' };

  const name = brandDisplayName(params.brand);
  return {
    title: `هواتف ${name} - المواصفات والأسعار`,
    description: `تصفح ${phones.length} هاتف من ${name} مع المواصفات التفصيلية والأسعار المحدثة.`,
    openGraph: {
      title: `هواتف ${name} | Phone Engine`,
      description: `أفضل هواتف ${name} مع مواصفات تفصيلية وأدلة شاملة.`,
    },
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  const phones = getPhonesByBrand(params.brand);

  if (!phones.length) {
    notFound();
  }

  const displayName = brandDisplayName(params.brand);

  return (
    <div className="py-8">
      <Container>
        <BreadcrumbJsonLd
          items={[
            { label: 'الهواتف', href: '/phones' },
            { label: displayName },
          ]}
        />
        <Breadcrumbs
          items={[
            { label: 'الهواتف', href: '/phones' },
            { label: displayName },
          ]}
          className="mb-6"
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            هواتف {displayName}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {phones.length} هاتف متاح
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {phones.map((phone) => (
            <PhoneCard key={phone.slug} phone={phone} />
          ))}
        </div>
      </Container>
    </div>
  );
}
