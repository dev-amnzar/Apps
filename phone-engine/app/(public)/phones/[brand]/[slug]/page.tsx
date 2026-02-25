import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale } from "lucide-react";
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
import { PhoneFullSpecs, SpecsNav } from "@/components/phones/phone-full-specs";
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

  const desc = phone.fullSpecs
    ? `${phone.name} - ${phone.fullSpecs.display.type}, ${phone.fullSpecs.platform.chipset}, ${phone.fullSpecs.mainCamera.main[0]?.resolution} camera, ${phone.fullSpecs.battery.capacity}. السعر: ${formatPrice(phone.price)}`
    : `${phone.name} - ${phone.specs.display}, ${phone.specs.chipset}, ${phone.specs.camera} camera, ${phone.specs.battery} battery. السعر: ${formatPrice(phone.price)}`;

  return generatePageMetadata({
    title: `${phone.name} - المواصفات الكاملة والسعر`,
    description: desc,
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
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="default">{brandName.ar}</Badge>
                {phone.releaseDate && (
                  <Badge variant="secondary">{phone.releaseDate}</Badge>
                )}
                {phone.rating && (
                  <Badge variant="success">{phone.rating}/5</Badge>
                )}
                {phone.guides.length > 0 && (
                  <Badge variant="outline">أدلة متاحة</Badge>
                )}
              </div>

              <Heading size="h1" className="mb-1">
                {phone.name}
              </Heading>
              {phone.nameAr && (
                <Text size="lg" className="mb-4 text-gray-500">{phone.nameAr}</Text>
              )}

              {/* Quick specs */}
              {phone.fullSpecs && (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <p className="text-xs text-gray-500">الشاشة</p>
                    <p className="text-sm font-semibold">{phone.fullSpecs.display.size.split(",")[0]}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <p className="text-xs text-gray-500">المعالج</p>
                    <p className="text-sm font-semibold">{phone.fullSpecs.platform.chipset.split("(")[0].trim()}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <p className="text-xs text-gray-500">الكاميرا</p>
                    <p className="text-sm font-semibold">{phone.fullSpecs.mainCamera.main[0]?.resolution}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <p className="text-xs text-gray-500">البطارية</p>
                    <p className="text-sm font-semibold">{phone.fullSpecs.battery.capacity}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <p className="text-xs text-gray-500">الرام</p>
                    <p className="text-sm font-semibold">{phone.fullSpecs.memory.ram}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <p className="text-xs text-gray-500">التخزين</p>
                    <p className="text-sm font-semibold">{phone.fullSpecs.memory.internal.split(",")[0]}</p>
                  </div>
                </div>
              )}

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
                <Button size="lg" variant="secondary" asChild>
                  <Link href={`/compare?phones=${phoneKey}`} className="gap-2">
                    <Scale className="h-4 w-4" />
                    قارن
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Full Specs Section */}
          {phone.fullSpecs ? (
            <div className="mb-10">
              <Heading size="h2" className="mb-6">المواصفات التقنية الكاملة</Heading>
              <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
                <div className="hidden lg:block">
                  <SpecsNav />
                </div>
                <PhoneFullSpecs fullSpecs={phone.fullSpecs} />
              </div>
            </div>
          ) : (
            <div className="mb-10 grid gap-6 lg:grid-cols-2">
              <PhoneSpecs specs={phone.specs} />
              <PhoneIssues issues={phone.issues} phoneName={phone.name} />
            </div>
          )}

          {/* Issues (for full specs) */}
          {phone.fullSpecs && (
            <div className="mb-10">
              <PhoneIssues issues={phone.issues} phoneName={phone.name} />
            </div>
          )}

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
