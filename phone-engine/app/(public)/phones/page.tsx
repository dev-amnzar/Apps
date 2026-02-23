import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PhonesCatalog } from "./phones-catalog";
import { getAllPhones, getAllBrands } from "@/lib/phones";
import { generateSeoMeta } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = generateSeoMeta({
  title: "كل الهواتف الذكية",
  description:
    "تصفح جميع الهواتف الذكية المتاحة مع المواصفات والأسعار والمراجعات. سامسونج، آيفون، جوجل، شاومي والمزيد.",
  path: "/phones",
});

export default function PhonesPage() {
  const phones = getAllPhones();
  const brands = getAllBrands();

  return (
    <>
      <Breadcrumbs items={[{ name: "الهواتف", href: "/phones" }]} />

      <Container className="py-8 space-y-8">
        <div>
          <Heading size="h1">كل الهواتف الذكية</Heading>
          <Text variant="muted" className="mt-2">
            تصفح {phones.length}+ هاتف من أشهر العلامات التجارية
          </Text>
        </div>

        <PhonesCatalog phones={phones} brands={brands} />
      </Container>
    </>
  );
}
