"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import type { Guide } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";

export default function AdminGuidesPage() {
  const [guides, setGuides] = React.useState<Guide[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchGuides = React.useCallback(() => {
    setLoading(true);
    fetch("/api/guides")
      .then((r) => r.json())
      .then(setGuides)
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { fetchGuides(); }, [fetchGuides]);

  const handleDelete = async (guide: Guide) => {
    if (!confirm(`هل أنت متأكد من حذف "${guide.titleAr}"؟`)) return;

    const res = await fetch(`/api/guides/${guide.type}--${guide.phone}`, { method: "DELETE" });
    if (res.ok) {
      fetchGuides();
    }
  };

  const columns = [
    {
      key: "titleAr",
      label: "الدليل",
      render: (guide: Guide) => (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-gray-400" />
          <span className="max-w-[200px] truncate font-medium text-gray-900 dark:text-white">
            {guide.titleAr}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      label: "النوع",
      render: (guide: Guide) => (
        <Badge variant={guide.type === "setup" ? "default" : "secondary"}>
          {guide.typeAr}
        </Badge>
      ),
    },
    {
      key: "phoneName",
      label: "الهاتف",
      render: (guide: Guide) => <span className="text-sm">{guide.phoneName}</span>,
    },
    {
      key: "steps",
      label: "الخطوات",
      render: (guide: Guide) => (
        <span className="text-sm text-gray-500">{guide.steps.length} خطوة</span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-9 w-40 rounded-lg" />
        <div className="skeleton h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading size="h2">إدارة الأدلة</Heading>
          <Text className="mt-1">{guides.length} دليل</Text>
        </div>
        <Button asChild>
          <Link href="/admin/guides/new" className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة دليل
          </Link>
        </Button>
      </div>

      <DataTable
        data={guides}
        columns={columns}
        keyExtractor={(g) => `${g.type}--${g.phone}`}
        viewHref={(g) => `/guides/${g.type}/${g.phone}`}
        editHref={(g) => `/admin/guides/${g.type}--${g.phone}`}
        onDelete={handleDelete}
      />
    </div>
  );
}
