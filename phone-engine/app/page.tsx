import Link from 'next/link';
import { ArrowLeft, Smartphone, BookOpen, BarChart3, Star, Zap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhoneCard } from '@/components/phones/phone-card';
import { getFeaturedPhones, getAllPhones, getAllBrands } from '@/lib/phones';
import { getAllGuides } from '@/lib/guides';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Phone Engine | اكتشف أفضل الهواتف الذكية وأدلة شاملة',
  description:
    'دليلك الشامل لأفضل الهواتف الذكية - مواصفات، مقارنات، أدلة إعداد ونقل البيانات. اكتشف هاتفك المثالي الآن.',
};

const quickLinks = [
  {
    href: '/phones',
    icon: Smartphone,
    label: 'الهواتف',
    desc: 'تصفح كل الهواتف',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  },
  {
    href: '/guides',
    icon: BookOpen,
    label: 'الأدلة',
    desc: 'أدلة خطوة بخطوة',
    color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
  },
  {
    href: '/phones',
    icon: BarChart3,
    label: 'المقارنة',
    desc: 'قارن بين الهواتف',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  },
];

export default function HomePage() {
  const featuredPhones = getFeaturedPhones(4);
  const allPhones = getAllPhones();
  const allGuides = getAllGuides();
  const allBrands = getAllBrands();

  const stats = [
    { label: 'هاتف مراجع', value: `${allPhones.length}+`, icon: Smartphone },
    { label: 'دليل شامل', value: `${allGuides.length}+`, icon: BookOpen },
    { label: 'علامة تجارية', value: `${allBrands.length}+`, icon: Star },
    { label: 'تحديث يومي', value: '24/7', icon: Zap },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)',
          }}
        />
        <Container className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-white/30 bg-white/10 text-white"
            >
              <Zap className="h-3 w-3" />
              محرك الهواتف الذكية #1
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              اكتشف أفضل{' '}
              <span className="text-brand-200">الهواتف الذكية</span>
              <br />
              مع أدلة شاملة
            </h1>
            <p className="mb-8 text-lg text-brand-100 sm:text-xl">
              مواصفات تفصيلية، مقارنات دقيقة، وأدلة إعداد خطوة بخطوة. كل ما تحتاجه لاختيار هاتفك المثالي.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50" asChild>
                <Link href="/phones">
                  <Smartphone className="h-5 w-5" />
                  تصفح الهواتف
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/guides">
                  <BookOpen className="h-5 w-5" />
                  الأدلة الشاملة
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b bg-white dark:border-gray-800 dark:bg-gray-950">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-100 dark:divide-gray-800 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1 py-6 text-center">
                <Icon className="h-5 w-5 text-brand-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {value}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              الوصول السريع
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {quickLinks.map(({ href, icon: Icon, label, desc, color }) => (
              <Link
                key={href + label}
                href={href}
                className="group flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700/50 dark:bg-gray-900"
              >
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
                <ArrowLeft className="ms-auto h-4 w-4 text-gray-300 transition-transform group-hover:-translate-x-1 group-hover:text-brand-500 dark:text-gray-600" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Phones */}
      <section className="bg-gray-50 py-12 dark:bg-gray-900/50">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                الهواتف المميزة
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                أبرز الهواتف الذكية لعام 2024
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/phones">
                عرض الكل
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPhones.map((phone, i) => (
              <PhoneCard key={phone.slug} phone={phone} featured={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container size="md">
          <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-center text-white sm:p-12">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
              هل تحتاج مساعدة في اختيار هاتفك؟
            </h2>
            <p className="mb-6 text-brand-100">
              تصفح أدلتنا الشاملة للإعداد ونقل البيانات والنصائح المتخصصة.
            </p>
            <Button
              size="lg"
              className="bg-white text-brand-700 hover:bg-brand-50"
              asChild
            >
              <Link href="/guides">
                <BookOpen className="h-5 w-5" />
                استكشف الأدلة
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
