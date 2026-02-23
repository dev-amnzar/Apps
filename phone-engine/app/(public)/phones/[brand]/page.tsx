import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneCard } from "@/components/phones/phone-card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getPhonesByBrand, getAllBrandSlugs } from "@/lib/phones";
import { generateSeoMeta } from "@/lib/seo";
import { BRAND_NAMES, BRAND_NAMES_EN } from "@/lib/utils";

export const revalidate = 3600;

interface BrandPageProps {
  params: { brand: string };
}

export function generateStaticParams() {
  return getAllBrandSlugs().map((brand) => ({ brand }));
}

export function generateMetadata({ params }: BrandPageProps): Metadata {
  const brandNameAr = BRAND_NAMES[params.brand] || params.brand;
  const brandNameEn = BRAND_NAMES_EN[params.brand] || params.brand;

  return generateSeoMeta({
    title: `هواتف ${brandNameAr} (${brandNameEn})`,
    description: `تصفح جميع هواتف ${brandNameAr} المتاحة مع المواصفات والأسعار والمراجعات التفصيلية.`,
    path: `/phones/${params.brand}`,
  });
}

export default function BrandPage({ params }: BrandPageProps) {
  const phones = getPhonesByBrand(params.brand);
  const brandNameAr = BRAND_NAMES[params.brand];

  if (phones.length === 0) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "الهواتف", href: "/phones" },
          { name: `هواتف ${brandNameAr}`, href: `/phones/${params.brand}` },
        ]}
      />

      <Container className="py-8 space-y-8">
        <div>
          <Heading size="h1">هواتف {brandNameAr}</Heading>
          <Text variant="muted" className="mt-2">
            {phones.length} هاتف متاح من {brandNameAr}
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((phone) => (
            <PhoneCard key={phone.slug} phone={phone} />
          ))}
        </div>
      </Container>
    </>
  );
}
