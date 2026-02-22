import Link from 'next/link';
import { BookOpen, ArrowLeft, Settings, ArrowLeftRight, Wrench, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { guideTypeDisplayName, guideTypeDisplayNameAr } from '@/lib/utils';

const guideIcons: Record<string, React.ElementType> = {
  setup: Settings,
  transfer: ArrowLeftRight,
  troubleshoot: Wrench,
  tips: Lightbulb,
};

interface PhoneGuidesProps {
  guides: string[];
  brand: string;
  slug: string;
}

export function PhoneGuides({ guides, brand, slug }: PhoneGuidesProps) {
  if (!guides.length) return null;

  const phoneKey = `${brand}-${slug}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-brand-500" />
          الأدلة المتوفرة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {guides.map((guideType) => {
            const Icon = guideIcons[guideType] ?? BookOpen;
            const href = `/guides/${guideType}/${phoneKey}`;
            return (
              <Link
                key={guideType}
                href={href}
                className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all hover:border-brand-200 hover:bg-brand-50 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-brand-800 dark:hover:bg-brand-950/50"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-900">
                  <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {guideTypeDisplayNameAr(guideType)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {guideTypeDisplayName(guideType)}
                  </p>
                </div>
                <ArrowLeft className="h-4 w-4 flex-shrink-0 text-gray-300 transition-colors group-hover:text-brand-500 dark:text-gray-600" />
              </Link>
            );
          })}
        </div>
        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/guides`}>
              عرض كل الأدلة
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
