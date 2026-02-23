import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Guide } from "@/types";

interface PhoneGuidesProps {
  guides: Guide[];
  brand: string;
}

export function PhoneGuides({ guides, brand }: PhoneGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-primary-500" />
          الأدلة المتاحة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {guides.map((guide) => (
            <Link
              key={`${guide.type}-${guide.brand}`}
              href={`/guides/${guide.type}/${brand}`}
              className="group flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-primary-300 hover:bg-primary-50/50 transition-all dark:border-gray-700 dark:hover:border-primary-700 dark:hover:bg-primary-950/50"
            >
              <div>
                <h4 className="font-cairo font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {guide.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-cairo mt-1">
                  {guide.steps.length} خطوات
                </p>
              </div>
              <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:-translate-x-1 transition-all rtl:rotate-180 rtl:group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
