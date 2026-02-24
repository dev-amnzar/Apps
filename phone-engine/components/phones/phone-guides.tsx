import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Guide } from "@/types";

interface PhoneGuidesProps {
  guides: Guide[];
}

export function PhoneGuides({ guides }: PhoneGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-600" />
          الأدلة المتاحة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={`${guide.type}-${guide.phone}`}
              href={`/guides/${guide.type}/${guide.phone}`}
              className="group flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all hover:border-brand-200 hover:bg-brand-50/50 dark:border-gray-800 dark:hover:border-brand-800 dark:hover:bg-brand-950/50"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {guide.titleAr}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {guide.steps.length} خطوات
                </p>
              </div>
              <ArrowLeft className="h-4 w-4 text-gray-400 transition-transform group-hover:-translate-x-1 dark:text-gray-600" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
