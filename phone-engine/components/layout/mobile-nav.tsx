'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Smartphone, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'الرئيسية', labelEn: 'Home', icon: Home },
  { href: '/phones', label: 'الهواتف', labelEn: 'Phones', icon: Smartphone },
  { href: '/guides', label: 'الأدلة', labelEn: 'Guides', icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="فتح القائمة">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
            <Smartphone className="h-5 w-5" />
            Phone Engine
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  <span className="ms-auto text-xs text-gray-400">{link.labelEn}</span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>
        <div className="mt-8 border-t pt-6 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2024 Phone Engine. جميع الحقوق محفوظة.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
