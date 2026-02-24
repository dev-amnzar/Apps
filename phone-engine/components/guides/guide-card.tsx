import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Guide } from "@/types";

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.type}/${guide.phone}`}>
      <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <Badge variant="secondary">{guide.typeAr}</Badge>
          </div>
          <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2 dark:text-white">
            {guide.titleAr}
          </h3>
          <p className="mb-3 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
            {guide.descriptionAr}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs text-gray-400">{guide.steps.length} خطوات</span>
            <ArrowLeft className="h-4 w-4 text-gray-400 transition-transform group-hover:-translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
