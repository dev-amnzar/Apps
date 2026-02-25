import Link from "next/link";
import { Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  phones: [
    { href: "/phones/samsung", label: "سامسونج" },
    { href: "/phones/iphone", label: "آيفون" },
    { href: "/phones/google", label: "جوجل" },
    { href: "/phones/xiaomi", label: "شاومي" },
    { href: "/phones/oneplus", label: "ون بلس" },
    { href: "/phones/huawei", label: "هواوي" },
  ],
  tools: [
    { href: "/compare", label: "مقارنة الهواتف" },
    { href: "/search", label: "البحث المتقدم" },
    { href: "/glossary", label: "القاموس التقني" },
  ],
  guides: [
    { href: "/guides/setup", label: "أدلة الإعداد" },
    { href: "/guides/transfer", label: "نقل البيانات" },
  ],
  company: [
    { href: "/news", label: "الأخبار والمراجعات" },
    { href: "/phones", label: "جميع الهواتف" },
    { href: "/guides", label: "جميع الأدلة" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <Container>
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-brand-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">Phone Engine</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              اكتشف أفضل الهواتف الذكية مع أدلة شاملة للإعداد والاستخدام
            </p>
          </div>

          {/* Phones */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">الهواتف</h3>
            <ul className="space-y-2">
              {footerLinks.phones.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">الأدوات</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">الأدلة</h3>
            <ul className="space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 text-sm font-semibold text-gray-900 dark:text-white">المزيد</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Phone Engine. جميع الحقوق محفوظة.
          </p>
        </div>
      </Container>
    </footer>
  );
}
