import type { Metadata } from "next";
import Link from "next/link";
import { Settings, ArrowRightLeft, Battery, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { GuideCard } from "@/components/guides/guide-card";
import { getGuideTypes, getAllGuides } from "@/lib/guides";
import { generateSeoMeta } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = generateSeoMeta({
  title: "الأدلة والشروحات",
  description:
    "أدلة شاملة لإعداد الهواتف الذكية، نقل البيانات، تحسين البطارية، وحل المشاكل الشائعة.",
  path: "/guides",
});

const iconMap: Record<string, React.ElementType> = {
  Settings: Settings,
  ArrowRightLeft: ArrowRightLeft,
  Battery: Battery,
};

export default function GuidesPage() {
  const guideTypes = getGuideTypes();
  const allGuides = getAllGuides();

  return (
    <>
      <Breadcrumbs items={[{ name: "الأدلة", href: "/guides" }]} />

      <Container className="py-8 space-y-12">
        <div>
          <Heading size="h1">الأدلة والشروحات</Heading>
          <Text variant="muted" className="mt-2">
            {allGuides.length}+ دليل شامل لمساعدتك في إعداد واستخدام هاتفك
          </Text>
        </div>

        {/* Guide Types */}
        <section className="space-y-6">
          <Heading size="h3">أنواع الأدلة</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {guideTypes.map((type) => {
              const Icon = iconMap[type.icon] || Settings;
              return (
                <Link key={type.slug} href={`/guides/${type.slug}`}>
                  <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-cairo font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                          {type.nameAr}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-cairo mt-1">
                          {type.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-cairo font-medium">
                        <span>عرض الأدلة</span>
                        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Guides */}
        <section className="space-y-6">
          <Heading size="h3">جميع الأدلة</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGuides.map((guide) => (
              <GuideCard
                key={`${guide.type}-${guide.brand}`}
                guide={guide}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
