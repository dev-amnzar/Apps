import type { Metadata } from "next";
import { getAllPhones, getAllBrands } from "@/lib/phones";
import { generatePageMetadata } from "@/components/seo/meta-tags";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhonesCatalogClient } from "./phones-catalog-client";

export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "جميع الهواتف الذكية",
  description: "تصفح أحدث الهواتف الذكية من سامسونج، آيفون، جوجل، شاومي وغيرها. قارن المواصفات والأسعار واعثر على هاتفك المثالي.",
  path: "/phones",
});

export default function PhonesPage() {
  const phones = getAllPhones();
  const brands = getAllBrands();

  return (
    <>
      <Breadcrumbs items={[{ label: "الهواتف", href: "/phones" }]} />
      <section className="py-8">
        <Container>
          <div className="mb-8">
            <Heading size="h1">جميع الهواتف الذكية</Heading>
            <Text className="mt-2">
              تصفح {phones.length}+ هاتف ذكي من {brands.length} علامة تجارية مختلفة
            </Text>
          </div>
          <PhonesCatalogClient phones={phones} brands={brands} />
        </Container>
      </section>
    </>
  );
}
