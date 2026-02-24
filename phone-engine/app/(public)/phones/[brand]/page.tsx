import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhonesByBrand, getAllBrands, getBrandName } from "@/lib/phones";
import { generatePageMetadata } from "@/components/seo/meta-tags";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneCard } from "@/components/phones/phone-card";

export const revalidate = 3600;

interface BrandPageProps {
  params: { brand: string };
}

export function generateStaticParams() {
  return getAllBrands().map((brand) => ({ brand: brand.slug }));
}

export function generateMetadata({ params }: BrandPageProps): Metadata {
  const brandName = getBrandName(params.brand);
  return generatePageMetadata({
    title: `هواتف ${brandName.ar}`,
    description: `تصفح جميع هواتف ${brandName.ar} - المواصفات والأسعار والمراجعات`,
    path: `/phones/${params.brand}`,
  });
}

export default function BrandPage({ params }: BrandPageProps) {
  const phones = getPhonesByBrand(params.brand);
  const brandName = getBrandName(params.brand);

  if (phones.length === 0) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "الهواتف", href: "/phones" },
          { label: `هواتف ${brandName.ar}`, href: `/phones/${params.brand}` },
        ]}
      />
      <section className="py-8">
        <Container>
          <div className="mb-8">
            <Heading size="h1">هواتف {brandName.ar}</Heading>
            <Text className="mt-2">
              تصفح {phones.length} هاتف من {brandName.ar}
            </Text>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {phones.map((phone) => (
              <PhoneCard key={phone.slug} phone={phone} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
