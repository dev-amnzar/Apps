"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhoneIssuesProps {
  issues: string[];
}

export function PhoneIssues({ issues }: PhoneIssuesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  if (issues.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          المشاكل الشائعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-4 text-start font-cairo font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold dark:bg-yellow-900 dark:text-yellow-300">
                    {index + 1}
                  </span>
                  {issue}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 pt-0 text-sm text-gray-500 dark:text-gray-400 font-cairo animate-fade-in">
                  <p className="ps-9">
                    هذه مشكلة معروفة يواجهها بعض المستخدمين. قد يتم إصلاحها في
                    تحديثات البرنامج المستقبلية. ننصح بمراجعة إعدادات الجهاز
                    والتأكد من تحديث النظام لآخر إصدار.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
