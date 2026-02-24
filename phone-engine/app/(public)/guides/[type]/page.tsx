import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuidesByType, getAllGuideTypes, getGuideTypeName } from "@/lib/guides";
import { generatePageMetadata } from "@/components/seo/meta-tags";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { GuideCard } from "@/components/guides/guide-card";

export const revalidate = 3600;

interface GuideTypePageProps {
  params: { type: string };
}

export function generateStaticParams() {
  return getAllGuideTypes().map((type) => ({ type: type.slug }));
}

export function generateMetadata({ params }: GuideTypePageProps): Metadata {
  const typeName = getGuideTypeName(params.type);
  return generatePageMetadata({
    title: typeName.ar,
    description: `أدلة ${typeName.ar} للهواتف الذكية - خطوة بخطوة`,
    path: `/guides/${params.type}`,
  });
}

export default function GuideTypePage({ params }: GuideTypePageProps) {
  const guides = getGuidesByType(params.type);
  const typeName = getGuideTypeName(params.type);

  if (guides.length === 0) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "الأدلة", href: "/guides" },
          { label: typeName.ar, href: `/guides/${params.type}` },
        ]}
      />
      <section className="py-8">
        <Container>
          <div className="mb-8">
            <Heading size="h1">{typeName.ar}</Heading>
            <Text className="mt-2">
              {guides.length} دليل متاح - اختر هاتفك للبدء
            </Text>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={`${guide.type}-${guide.phone}`} guide={guide} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
