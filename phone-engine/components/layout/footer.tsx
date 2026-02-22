import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  'الهواتف': [
    { href: '/phones', label: 'كل الهواتف' },
    { href: '/phones/samsung', label: 'سامسونج' },
    { href: '/phones/iphone', label: 'آيفون' },
    { href: '/phones/xiaomi', label: 'شاومي' },
  ],
  'الأدلة': [
    { href: '/guides', label: 'كل الأدلة' },
    { href: '/guides/setup', label: 'أدلة الإعداد' },
    { href: '/guides/transfer', label: 'نقل البيانات' },
    { href: '/guides/tips', label: 'نصائح وحيل' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 dark:bg-brand-500">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                <span>Phone Engine</span>
              </Link>
              <p className="mt-3 max-w-sm text-sm text-gray-600 dark:text-gray-400">
                اكتشف أفضل الهواتف الذكية مع أدلة شاملة وتقييمات محترفة. دليلك الأمثل لاختيار هاتفك الجديد.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
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
            ))}
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-600">
              © {year} Phone Engine. جميع الحقوق محفوظة.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-600">
              مبني بـ Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
