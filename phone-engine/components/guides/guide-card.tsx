import Link from 'next/link';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { guideTypeDisplayNameAr } from '@/lib/utils';
import type { Guide } from '@/types';

interface GuideCardProps {
  guide: Guide;
  className?: string;
}

export function GuideCard({ guide, className }: GuideCardProps) {
  const href = `/guides/${guide.type}/${guide.phone}`;

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {guideTypeDisplayNameAr(guide.type)}
          </Badge>
        </div>
        <Link href={href} className="group block">
          <h3 className="mb-1 font-semibold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400 line-clamp-2">
            {guide.title}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {guide.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {guide.steps.length} خطوات
          </span>
          <Link
            href={href}
            className="flex items-center gap-1 text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400"
          >
            <BookOpen className="h-3 w-3" />
            اقرأ الدليل
            <ChevronLeft className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
