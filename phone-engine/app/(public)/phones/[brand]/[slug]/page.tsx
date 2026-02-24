import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPhones, getPhoneBySlug, getRelatedPhones, getBrandName } from "@/lib/phones";
import { getGuidesByPhone } from "@/lib/guides";
import { generatePageMetadata } from "@/components/seo/meta-tags";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { getPhoneProductSchema } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhoneGallery } from "@/components/phones/phone-gallery";
import { PhoneSpecs } from "@/components/phones/phone-specs";
import { PhoneIssues } from "@/components/phones/phone-issues";
import { PhoneGuides } from "@/components/phones/phone-guides";
import { PhoneCard } from "@/components/phones/phone-card";

export const revalidate = 3600;

interface PhonePageProps {
  params: { brand: string; slug: string };
}

export function generateStaticParams() {
  return getAllPhones().map((phone) => ({
    brand: phone.brand,
    slug: phone.slug,
  }));
}

export function generateMetadata({ params }: PhonePageProps): Metadata {
  const phone = getPhoneBySlug(params.brand, params.slug);
  if (!phone) return {};

  return generatePageMetadata({
    title: phone.name,
    description: `${phone.name} - ${phone.specs.display}, ${phone.specs.chipset}, ${phone.specs.camera} camera, ${phone.specs.battery} battery. السعر: ${formatPrice(phone.price)}`,
    path: `/phones/${params.brand}/${params.slug}`,
    image: phone.images[0],
  });
}

export default function PhonePage({ params }: PhonePageProps) {
  const phone = getPhoneBySlug(params.brand, params.slug);

  if (!phone) {
    notFound();
  }

  const brandName = getBrandName(phone.brand);
  const phoneKey = `${phone.brand}-${phone.slug}`;
  const guides = getGuidesByPhone(phoneKey);
  const related = getRelatedPhones(phone, 4);

  return (
    <>
      <JsonLd data={getPhoneProductSchema(phone)} />
      <Breadcrumbs
        items={[
          { label: "الهواتف", href: "/phones" },
          { label: brandName.ar, href: `/phones/${phone.brand}` },
          { label: phone.name, href: `/phones/${phone.brand}/${phone.slug}` },
        ]}
      />

      <Container>
        <div className="py-8">
          {/* Hero Section */}
          <div className="mb-10 grid gap-8 lg:grid-cols-2">
            {/* Gallery */}
            <PhoneGallery images={phone.images} alt={phone.name} />

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="default">{brandName.ar}</Badge>
                {phone.guides.length > 0 && (
                  <Badge variant="success">أدلة متاحة</Badge>
                )}
              </div>

              <Heading size="h1" className="mb-2">
                {phone.name}
              </Heading>

              <Text size="lg" className="mb-6">
                {phone.specs.display} • {phone.specs.chipset} • {phone.specs.camera}
              </Text>

              <div className="mb-6">
                <span className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {formatPrice(phone.price)}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href={`/guides/setup/${phoneKey}`}>دليل الإعداد</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/guides/transfer/${phoneKey}`}>نقل البيانات</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Specs, Issues, Guides */}
          <div className="grid gap-6 lg:grid-cols-2">
            <PhoneSpecs specs={phone.specs} />
            <PhoneIssues issues={phone.issues} phoneName={phone.name} />
          </div>

          {guides.length > 0 && (
            <div className="mt-6">
              <PhoneGuides guides={guides} />
            </div>
          )}

          {/* Related Phones */}
          {related.length > 0 && (
            <section className="mt-12">
              <Heading size="h3" className="mb-6">
                هواتف مشابهة
              </Heading>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <PhoneCard key={`${p.brand}-${p.slug}`} phone={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}
