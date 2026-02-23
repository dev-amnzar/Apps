import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { GuideCard } from "@/components/guides/guide-card";
import { getGuideType, getGuidesByType, getGuideTypeSlugs } from "@/lib/guides";
import { generateSeoMeta } from "@/lib/seo";

export const revalidate = 3600;

interface GuideTypePageProps {
  params: { type: string };
}

export function generateStaticParams() {
  return getGuideTypeSlugs().map((type) => ({ type }));
}

export function generateMetadata({ params }: GuideTypePageProps): Metadata {
  const guideType = getGuideType(params.type);
  if (!guideType) return {};

  return generateSeoMeta({
    title: `أدلة ${guideType.nameAr}`,
    description: guideType.description,
    path: `/guides/${params.type}`,
  });
}

export default function GuideTypePage({ params }: GuideTypePageProps) {
  const guideType = getGuideType(params.type);

  if (!guideType) {
    notFound();
  }

  const guides = getGuidesByType(params.type);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "الأدلة", href: "/guides" },
          { name: guideType.nameAr, href: `/guides/${params.type}` },
        ]}
      />

      <Container className="py-8 space-y-8">
        <div>
          <Heading size="h1">أدلة {guideType.nameAr}</Heading>
          <Text variant="muted" className="mt-2">
            {guideType.description}
          </Text>
        </div>

        {guides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <GuideCard
                key={`${guide.type}-${guide.brand}`}
                guide={guide}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Text variant="muted" size="lg">
              لا توجد أدلة متاحة حالياً
            </Text>
          </div>
        )}
      </Container>
    </>
  );
}
