"use client";

import * as React from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhoneIssuesProps {
  issues: string[];
  phoneName: string;
}

export function PhoneIssues({ issues, phoneName }: PhoneIssuesProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          المشاكل الشائعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-4 text-start transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">{issue}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-gray-500 transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
                    هذه مشكلة شائعة في {phoneName}. ننصح بتحديث النظام إلى آخر إصدار
                    والتحقق من الإعدادات المتعلقة. إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني.
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
