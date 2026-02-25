"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Smartphone } from "lucide-react";
import type { Phone } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";

export default function AdminPhonesPage() {
  const [phones, setPhones] = React.useState<Phone[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPhones = React.useCallback(() => {
    setLoading(true);
    fetch("/api/phones")
      .then((r) => r.json())
      .then(setPhones)
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { fetchPhones(); }, [fetchPhones]);

  const handleDelete = async (phone: Phone) => {
    if (!confirm(`هل أنت متأكد من حذف ${phone.name}؟`)) return;

    const res = await fetch(`/api/phones/${phone.brand}-${phone.slug}`, { method: "DELETE" });
    if (res.ok) {
      fetchPhones();
    }
  };

  const columns = [
    {
      key: "name",
      label: "الهاتف",
      render: (phone: Phone) => (
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">{phone.name}</span>
        </div>
      ),
    },
    {
      key: "brand",
      label: "العلامة التجارية",
      render: (phone: Phone) => (
        <Badge variant="secondary" className="capitalize">{phone.brand}</Badge>
      ),
    },
    {
      key: "price",
      label: "السعر",
      render: (phone: Phone) => <span className="font-semibold">${phone.price}</span>,
    },
    {
      key: "specs",
      label: "المعالج",
      render: (phone: Phone) => (
        <span className="text-xs text-gray-500">{phone.specs.chipset}</span>
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
          <Heading size="h2">إدارة الهواتف</Heading>
          <Text className="mt-1">{phones.length} هاتف</Text>
        </div>
        <Button asChild>
          <Link href="/admin/phones/new" className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة هاتف
          </Link>
        </Button>
      </div>

      <DataTable
        data={phones}
        columns={columns}
        keyExtractor={(p) => `${p.brand}-${p.slug}`}
        viewHref={(p) => `/phones/${p.brand}/${p.slug}`}
        editHref={(p) => `/admin/phones/${p.brand}-${p.slug}`}
        onDelete={handleDelete}
      />
    </div>
  );
}
