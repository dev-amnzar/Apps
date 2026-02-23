import Link from "next/link";
import { Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200/50 bg-gray-50 dark:border-gray-800/50 dark:bg-gray-950">
      <Container>
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold font-cairo text-primary-600 dark:text-primary-400"
            >
              <Smartphone className="h-6 w-6" />
              <span>محرك الهواتف</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-cairo leading-relaxed">
              دليلك الشامل لعالم الهواتف الذكية. مراجعات، مقارنات، وأدلة إعداد
              شاملة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cairo font-bold text-gray-900 dark:text-white mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/phones", label: "كل الهواتف" },
                { href: "/guides", label: "الأدلة" },
                { href: "/phones/samsung", label: "هواتف سامسونج" },
                { href: "/phones/iphone", label: "هواتف آيفون" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 font-cairo transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="font-cairo font-bold text-gray-900 dark:text-white mb-4">
              الأدلة الشائعة
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/guides/setup", label: "أدلة الإعداد" },
                { href: "/guides/transfer", label: "نقل البيانات" },
                { href: "/guides/battery", label: "تحسين البطارية" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 font-cairo transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-cairo font-bold text-gray-900 dark:text-white mb-4">
              العلامات التجارية
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/phones/samsung", label: "Samsung" },
                { href: "/phones/iphone", label: "iPhone" },
                { href: "/phones/google", label: "Google Pixel" },
                { href: "/phones/xiaomi", label: "Xiaomi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 font-cairo transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-cairo">
            &copy; {currentYear} محرك الهواتف. جميع الحقوق محفوظة.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-cairo">
            صُنع بـ ❤️ للمستخدم العربي
          </p>
        </div>
      </Container>
    </footer>
  );
}
