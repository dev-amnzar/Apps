'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PhoneIssuesProps {
  issues: string[];
  phoneName: string;
}

export function PhoneIssues({ issues, phoneName }: PhoneIssuesProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!issues.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          المشاكل الشائعة
          <Badge variant="warning" className="ms-1 text-xs">{issues.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y dark:divide-gray-800">
          {issues.map((issue, i) => (
            <div key={i}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-3 text-start text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                aria-expanded={expanded === i}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{issue}</span>
                </div>
                <div className="ms-2 flex-shrink-0 text-gray-400">
                  {expanded === i ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  expanded === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-6 pb-3 pt-1 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    هذه مشكلة موثقة في {phoneName}. يُنصح بالبحث في المنتديات الرسمية أو التواصل مع الدعم الفني للحصول على أحدث الحلول.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
