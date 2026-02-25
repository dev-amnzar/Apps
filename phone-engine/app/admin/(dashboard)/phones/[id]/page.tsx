"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import type { Phone } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneForm } from "@/components/admin/phone-form";

export default function EditPhonePage() {
  const params = useParams();
  const id = params.id as string;
  const [phone, setPhone] = React.useState<Phone | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(`/api/phones/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setPhone)
      .catch(() => setError("الهاتف غير موجود"))
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

  if (error || !phone) {
    return (
      <div className="py-12 text-center">
        <Text size="lg">{error || "الهاتف غير موجود"}</Text>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Heading size="h2">تعديل {phone.name}</Heading>
        <Text className="mt-1">تعديل بيانات الهاتف</Text>
      </div>
      <PhoneForm initialData={phone} isEdit />
    </div>
  );
}
