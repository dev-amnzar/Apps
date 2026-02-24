import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { getAllGuideTypes, getGuideCount } from "@/lib/guides";
import { generatePageMetadata } from "@/components/seo/meta-tags";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "أدلة الهواتف الذكية",
  description: "أدلة شاملة لإعداد الهواتف الذكية ونقل البيانات. خطوة بخطوة لكل هاتف.",
  path: "/guides",
});

export default function GuidesPage() {
  const types = getAllGuideTypes();
  const totalGuides = getGuideCount();

  return (
    <>
      <Breadcrumbs items={[{ label: "الأدلة", href: "/guides" }]} />
      <section className="py-8">
        <Container>
          <div className="mb-8">
            <Heading size="h1">أدلة الهواتف الذكية</Heading>
            <Text className="mt-2">
              {totalGuides}+ دليل شامل لإعداد واستخدام هاتفك الذكي
            </Text>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((type) => (
              <Link key={type.slug} href={`/guides/${type.slug}`}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">{type.count} دليل</Badge>
                    </div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {type.nameAr}
                    </h2>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {type.slug === "setup"
                        ? "أدلة إعداد الهواتف الجديدة خطوة بخطوة"
                        : "أدلة نقل البيانات من هاتفك القديم"}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                      عرض الأدلة
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
