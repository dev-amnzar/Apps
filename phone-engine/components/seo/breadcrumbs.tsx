import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'الرئيسية', href: '/' }, ...items];

  return (
    <nav
      aria-label="مسار التنقل"
      className={cn('flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400', className)}
    >
      {allItems.map((item, i) => {
        const isLast = i === allItems.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronLeft className="h-3.5 w-3.5 flex-shrink-0" />}
            {i === 0 && <Home className="h-3.5 w-3.5 flex-shrink-0" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-brand-600 dark:hover:text-brand-400 truncate max-w-[120px]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'truncate max-w-[160px]',
                  isLast && 'font-medium text-gray-900 dark:text-gray-100'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
