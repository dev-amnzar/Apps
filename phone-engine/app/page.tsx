import Link from "next/link";
import { Smartphone, BookOpen, ArrowLeft, Zap, Shield, Globe } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCard } from "@/components/phones/phone-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getFeaturedPhones, getPhoneCount, getBrandCount } from "@/lib/phones";
import { getGuideCount } from "@/lib/guides";
import { getWebsiteSchema } from "@/lib/seo";

export const revalidate = 3600;

export default function HomePage() {
  const featured = getFeaturedPhones(4);
  const phoneCount = getPhoneCount();
  const brandCount = getBrandCount();
  const guideCount = getGuideCount();

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950/20 dark:via-gray-950 dark:to-gray-950">
        <Container>
          <div className="py-20 text-center sm:py-28">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              <Zap className="h-4 w-4" />
              محرك البحث الأول للهواتف الذكية
            </div>
            <Heading size="h1" className="mx-auto mb-4 max-w-3xl text-balance">
              اكتشف أفضل الهواتف
              <span className="text-brand-600 dark:text-brand-400"> + أدلة شاملة</span>
            </Heading>
            <Text size="lg" className="mx-auto mb-8 max-w-2xl text-balance">
              تصفح أحدث الهواتف الذكية، قارن المواصفات، واحصل على أدلة إعداد مفصلة خطوة بخطوة
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/phones" className="gap-2">
                  <Smartphone className="h-5 w-5" />
                  تصفح الهواتف
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/guides" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  الأدلة والشروحات
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Phones */}
      <section className="py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <Heading size="h2">أحدث الهواتف</Heading>
              <Text className="mt-1">تصفح أحدث الهواتف الذكية في السوق</Text>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/phones" className="gap-1">
                عرض الكل
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((phone) => (
              <PhoneCard key={`${phone.brand}-${phone.slug}`} phone={phone} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/phones" className="gap-1">
                عرض كل الهواتف
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-16 dark:border-gray-800 dark:bg-gray-900/50">
        <Container>
          <div className="mb-8 text-center">
            <Heading size="h2">روابط سريعة</Heading>
            <Text className="mt-1">الوصول السريع لأهم الأقسام</Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/phones",
                icon: Smartphone,
                title: "الهواتف",
                desc: "تصفح جميع الهواتف الذكية",
              },
              {
                href: "/guides",
                icon: BookOpen,
                title: "الأدلة",
                desc: "أدلة إعداد ونقل البيانات",
              },
              {
                href: "/phones",
                icon: Globe,
                title: "المقارنات",
                desc: "قارن بين الهواتف المختلفة",
              },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="group h-full text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-400">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { value: `${phoneCount}+`, label: "هاتف ذكي", icon: Smartphone },
              { value: `${guideCount}+`, label: "دليل شامل", icon: BookOpen },
              { value: `${brandCount}+`, label: "علامة تجارية", icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-8 w-8 text-brand-600 dark:text-brand-400" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
