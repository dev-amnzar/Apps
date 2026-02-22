import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/phones', label: 'الهواتف' },
  { href: '/guides', label: 'الأدلة' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 dark:bg-brand-500">
              <Smartphone className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg">Phone Engine</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" size="sm" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
