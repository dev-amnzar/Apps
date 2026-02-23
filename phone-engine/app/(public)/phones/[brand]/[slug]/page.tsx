import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ProductJsonLd } from "@/components/seo/json-ld";
import { PhoneGallery } from "@/components/phones/phone-gallery";
import { PhoneSpecs } from "@/components/phones/phone-specs";
import { PhoneIssues } from "@/components/phones/phone-issues";
import { PhoneGuides } from "@/components/phones/phone-guides";
import { PhoneCard } from "@/components/phones/phone-card";
import {
  getPhoneBySlug,
  getAllPhoneSlugs,
  getRelatedPhones,
} from "@/lib/phones";
import { getGuidesByBrand } from "@/lib/guides";
import { generateSeoMeta } from "@/lib/seo";
import { formatPrice, BRAND_NAMES } from "@/lib/utils";

export const revalidate = 3600;

interface PhonePageProps {
  params: { brand: string; slug: string };
}

export function generateStaticParams() {
  return getAllPhoneSlugs();
}

export function generateMetadata({ params }: PhonePageProps): Metadata {
  const phone = getPhoneBySlug(params.brand, params.slug);
  if (!phone) return {};

  return generateSeoMeta({
    title: `${phone.name} - المواصفات والسعر`,
    description: `${phone.name}: شاشة ${phone.specs.display}، معالج ${phone.specs.chipset}، كاميرا ${phone.specs.camera}، بطارية ${phone.specs.battery}. السعر: ${formatPrice(phone.price)}`,
    path: `/phones/${params.brand}/${params.slug}`,
    image: phone.images[0],
  });
}

export default function PhoneDetailPage({ params }: PhonePageProps) {
  const phone = getPhoneBySlug(params.brand, params.slug);

  if (!phone) {
    notFound();
  }

  const brandNameAr = BRAND_NAMES[phone.brand] || phone.brand;
  const relatedPhones = getRelatedPhones(phone, 3);
  const guides = getGuidesByBrand(phone.brand);

  return (
    <>
      <ProductJsonLd phone={phone} />
      <Breadcrumbs
        items={[
          { name: "الهواتف", href: "/phones" },
          { name: `هواتف ${brandNameAr}`, href: `/phones/${phone.brand}` },
          {
            name: phone.name,
            href: `/phones/${phone.brand}/${phone.slug}`,
          },
        ]}
      />

      <Container className="py-8 space-y-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <PhoneGallery images={phone.images} name={phone.name} />

          {/* Info */}
          <div className="space-y-6">
            <Badge>{brandNameAr}</Badge>

            <Heading size="h1">{phone.name}</Heading>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400 font-cairo">
                {formatPrice(phone.price)}
              </span>
            </div>

            {/* Quick Specs */}
            <PhoneSpecs specs={phone.specs} />
          </div>
        </div>

        {/* Issues */}
        <PhoneIssues issues={phone.issues} />

        {/* Guides */}
        <PhoneGuides guides={guides} brand={phone.brand} />

        {/* Related Phones */}
        {relatedPhones.length > 0 && (
          <section className="space-y-6">
            <Heading size="h3">هواتف مشابهة</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPhones.map((p) => (
                <PhoneCard key={p.slug} phone={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
