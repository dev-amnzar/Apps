"use client";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { GuideForm } from "@/components/admin/guide-form";

export default function NewGuidePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Heading size="h2">إضافة دليل جديد</Heading>
        <Text className="mt-1">أدخل بيانات الدليل الجديد</Text>
      </div>
      <GuideForm />
    </div>
  );
}
