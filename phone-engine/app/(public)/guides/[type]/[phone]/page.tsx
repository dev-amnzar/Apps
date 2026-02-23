import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { GuideSteps } from "@/components/guides/guide-steps";
import { GuideCard } from "@/components/guides/guide-card";
import { getGuide, getGuideType, getGuidesByBrand, getAllGuideSlugs } from "@/lib/guides";
import { generateSeoMeta } from "@/lib/seo";
import { BRAND_NAMES } from "@/lib/utils";

export const revalidate = 3600;

interface GuidePageProps {
  params: { type: string; phone: string };
}

export function generateStaticParams() {
  return getAllGuideSlugs();
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getGuide(params.type, params.phone);
  if (!guide) return {};

  return generateSeoMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${params.type}/${params.phone}`,
  });
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide(params.type, params.phone);
  const guideType = getGuideType(params.type);

  if (!guide || !guideType) {
    notFound();
  }

  const brandNameAr = BRAND_NAMES[params.phone] || params.phone;
  const relatedGuides = getGuidesByBrand(params.phone).filter(
    (g) => g.type !== params.type
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "الأدلة", href: "/guides" },
          { name: guideType.nameAr, href: `/guides/${params.type}` },
          {
            name: `${guideType.nameAr} - ${brandNameAr}`,
            href: `/guides/${params.type}/${params.phone}`,
          },
        ]}
      />

      <Container size="md" className="py-8 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{guideType.nameAr}</Badge>
            <Badge variant="secondary">{brandNameAr}</Badge>
          </div>

          <Heading size="h1">{guide.title}</Heading>

          <Text variant="lead">{guide.description}</Text>

          {/* Phone Link */}
          <Link href={`/phones/${params.phone}`}>
            <Card className="hover:shadow-lg transition-shadow mt-4">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-cairo font-semibold text-gray-900 dark:text-white text-sm">
                      تصفح هواتف {brandNameAr}
                    </p>
                    <p className="text-xs text-gray-500 font-cairo">
                      عرض جميع الهواتف المتاحة
                    </p>
                  </div>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 rtl:rotate-180" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Steps */}
        <section>
          <Heading size="h3" className="mb-6">
            الخطوات ({guide.steps.length})
          </Heading>
          <GuideSteps steps={guide.steps} />
        </section>

        {/* Video Placeholder */}
        <section>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-white/80 dark:bg-gray-700/80 shadow-lg">
                    <svg
                      className="h-8 w-8 text-primary-600 ms-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <Text variant="muted" size="sm">
                    فيديو تعليمي - قريباً
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="space-y-6">
            <Heading size="h3">أدلة أخرى لـ {brandNameAr}</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedGuides.map((g) => (
                <GuideCard key={`${g.type}-${g.brand}`} guide={g} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
