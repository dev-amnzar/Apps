import Link from "next/link";
import {
  Smartphone,
  BookOpen,
  ArrowLeft,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCard } from "@/components/phones/phone-card";
import { WebsiteJsonLd } from "@/components/seo/json-ld";
import { getFeaturedPhones, getAllPhones } from "@/lib/phones";
import { getAllGuides } from "@/lib/guides";

export const revalidate = 3600;

export default function HomePage() {
  const featuredPhones = getFeaturedPhones(4);
  const totalPhones = getAllPhones().length;
  const totalGuides = getAllGuides().length;

  return (
    <>
      <WebsiteJsonLd />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-primary-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-primary-950/20 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 text-sm font-cairo font-semibold">
              <Zap className="h-4 w-4" />
              <span>دليلك الشامل لعالم الهواتف</span>
            </div>

            <Heading size="h1" className="leading-tight">
              اكتشف أفضل الهواتف{" "}
              <span className="gradient-text">+ أدلة شاملة</span>
            </Heading>

            <Text variant="lead" className="max-w-2xl mx-auto">
              استكشف أحدث الهواتف الذكية مع مراجعات تفصيلية، أدلة إعداد خطوة
              بخطوة، ونصائح لحل المشاكل الشائعة.
            </Text>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/phones">
                <Button size="lg" className="gap-2">
                  تصفح الهواتف
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="outline" size="lg" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  الأدلة والشروحات
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-100 dark:border-gray-800">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: `${totalPhones}+`, label: "هاتف", icon: Smartphone },
              { value: `${totalGuides}+`, label: "دليل شامل", icon: BookOpen },
              { value: "6+", label: "علامة تجارية", icon: Shield },
              { value: "100%", label: "محتوى عربي", icon: TrendingUp },
            ].map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6 space-y-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary-500" />
                  <div className="text-3xl font-bold font-cairo gradient-text">
                    {stat.value}
                  </div>
                  <Text variant="muted" size="sm">
                    {stat.label}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Phones */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <Heading size="h2">أحدث الهواتف</Heading>
              <Text variant="muted" className="mt-2">
                اكتشف أحدث الهواتف الذكية في السوق
              </Text>
            </div>
            <Link href="/phones">
              <Button variant="ghost" className="gap-2 hidden sm:flex">
                عرض الكل
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPhones.map((phone) => (
              <PhoneCard key={phone.slug} phone={phone} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/phones">
              <Button variant="outline" className="gap-2">
                عرض كل الهواتف
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="text-center mb-10">
            <Heading size="h2">روابط سريعة</Heading>
            <Text variant="muted" className="mt-2">
              الوصول السريع لأهم الأقسام
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                href: "/phones",
                title: "كل الهواتف",
                desc: "تصفح جميع الهواتف الذكية المتاحة",
                icon: Smartphone,
              },
              {
                href: "/guides",
                title: "الأدلة الشاملة",
                desc: "أدلة إعداد، نقل بيانات، وتحسين الأداء",
                icon: BookOpen,
              },
              {
                href: "/phones/samsung",
                title: "هواتف سامسونج",
                desc: "اكتشف أحدث هواتف سامسونج Galaxy",
                icon: Zap,
              },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <Heading size="h4" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </Heading>
                    <Text variant="muted" size="sm">
                      {item.desc}
                    </Text>
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
