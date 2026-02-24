import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Smartphone, Video } from "lucide-react";
import { getGuide, getAllGuides, getRelatedGuides, getGuideTypeName } from "@/lib/guides";
import { generatePageMetadata } from "@/components/seo/meta-tags";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { getGuideSchema } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GuideSteps } from "@/components/guides/guide-steps";
import { GuideCard } from "@/components/guides/guide-card";

export const revalidate = 3600;

interface GuidePageProps {
  params: { type: string; phone: string };
}

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({
    type: guide.type,
    phone: guide.phone,
  }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getGuide(params.type, params.phone);
  if (!guide) return {};

  return generatePageMetadata({
    title: guide.titleAr,
    description: guide.descriptionAr,
    path: `/guides/${params.type}/${params.phone}`,
  });
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide(params.type, params.phone);

  if (!guide) {
    notFound();
  }

  const typeName = getGuideTypeName(guide.type);
  const related = getRelatedGuides(guide, 3);

  return (
    <>
      <JsonLd data={getGuideSchema(guide)} />
      <Breadcrumbs
        items={[
          { label: "الأدلة", href: "/guides" },
          { label: typeName.ar, href: `/guides/${guide.type}` },
          { label: guide.phoneName, href: `/guides/${guide.type}/${guide.phone}` },
        ]}
      />

      <Container>
        <div className="py-8">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="default">{typeName.ar}</Badge>
                <Badge variant="outline">
                  <Smartphone className="me-1 h-3 w-3" />
                  {guide.phoneName}
                </Badge>
              </div>
              <Heading size="h1" className="mb-2">
                {guide.titleAr}
              </Heading>
              <Text size="lg">{guide.descriptionAr}</Text>

              {/* Phone Link */}
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/phones/${guide.phone.split("-")[0]}/${guide.phone.split("-").slice(1).join("-")}`}>
                    <Smartphone className="me-2 h-4 w-4" />
                    عرض مواصفات {guide.phoneName}
                  </Link>
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Steps */}
            <div className="mb-8">
              <Heading size="h3" className="mb-6">
                الخطوات ({guide.steps.length})
              </Heading>
              <GuideSteps steps={guide.steps} />
            </div>

            <Separator className="my-8" />

            {/* Video Placeholder */}
            <Card className="mb-8">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Video className="mb-3 h-12 w-12 text-gray-400" />
                <Heading size="h4" className="mb-1">
                  فيديو تعليمي
                </Heading>
                <Text size="sm">
                  سيتم إضافة فيديو تعليمي مفصل قريباً
                </Text>
              </CardContent>
            </Card>

            {/* Related Guides */}
            {related.length > 0 && (
              <section>
                <Heading size="h3" className="mb-6">
                  أدلة ذات صلة
                </Heading>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((g) => (
                    <GuideCard key={`${g.type}-${g.phone}`} guide={g} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
