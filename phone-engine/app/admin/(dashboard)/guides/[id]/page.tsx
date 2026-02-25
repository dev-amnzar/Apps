"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import type { Guide } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { GuideForm } from "@/components/admin/guide-form";

export default function EditGuidePage() {
  const params = useParams();
  const id = params.id as string;
  const [guide, setGuide] = React.useState<Guide | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(`/api/guides/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setGuide)
      .catch(() => setError("الدليل غير موجود"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="skeleton h-9 w-48 rounded-lg" />
        <div className="skeleton h-64 rounded-xl" />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="py-12 text-center">
        <Text size="lg">{error || "الدليل غير موجود"}</Text>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Heading size="h2">تعديل الدليل</Heading>
        <Text className="mt-1">{guide.titleAr}</Text>
      </div>
      <GuideForm initialData={guide} isEdit />
    </div>
  );
}
