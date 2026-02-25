import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  href: string;
  color?: string;
}

export function StatCard({ title, value, icon: Icon, href, color = "text-brand-600" }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className="transition-all hover:-translate-y-1 hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-6">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
