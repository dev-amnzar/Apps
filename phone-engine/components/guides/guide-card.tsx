import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND_NAMES } from "@/lib/utils";
import type { Guide } from "@/types";

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.type}/${guide.brand}`}>
      <Card className="group h-full hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <Badge variant="secondary">
              {BRAND_NAMES[guide.brand] || guide.brand}
            </Badge>
          </div>

          <div>
            <h3 className="font-cairo font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {guide.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-cairo mt-1 line-clamp-2">
              {guide.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-400 font-cairo">
              {guide.steps.length} خطوات
            </span>
            <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:-translate-x-1 transition-all rtl:rotate-180 rtl:group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
