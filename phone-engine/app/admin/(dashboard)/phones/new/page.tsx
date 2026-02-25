"use client";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhoneForm } from "@/components/admin/phone-form";

export default function NewPhonePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Heading size="h2">إضافة هاتف جديد</Heading>
        <Text className="mt-1">أدخل بيانات الهاتف الجديد</Text>
      </div>
      <PhoneForm />
    </div>
  );
}
