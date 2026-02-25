"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import type { Phone } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PhoneFormProps {
  initialData?: Phone;
  isEdit?: boolean;
}

const emptyPhone: Phone = {
  brand: "",
  slug: "",
  name: "",
  price: 0,
  images: [""],
  specs: { display: "", chipset: "", camera: "", battery: "" },
  issues: [""],
  guides: ["setup", "transfer"],
};

export function PhoneForm({ initialData, isEdit = false }: PhoneFormProps) {
  const router = useRouter();
  const [phone, setPhone] = React.useState<Phone>(initialData || emptyPhone);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = isEdit ? `/api/phones/${phone.brand}-${phone.slug}` : "/api/phones";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(phone),
      });

      if (res.ok) {
        router.push("/admin/phones");
      } else {
        const data = await res.json();
        setError(data.error || "حدث خطأ");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string | number) => {
    setPhone((prev) => ({ ...prev, [field]: value }));
  };

  const updateSpec = (field: string, value: string) => {
    setPhone((prev) => ({ ...prev, specs: { ...prev.specs, [field]: value } }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>المعلومات الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">الاسم</label>
            <Input
              value={phone.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Samsung Galaxy S24 Ultra"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">العلامة التجارية (slug)</label>
            <Input
              value={phone.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              placeholder="samsung"
              required
              disabled={isEdit}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">المعرف (slug)</label>
            <Input
              value={phone.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="s24-ultra"
              required
              disabled={isEdit}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">السعر (USD)</label>
            <Input
              type="number"
              value={phone.price}
              onChange={(e) => updateField("price", parseInt(e.target.value) || 0)}
              placeholder="1299"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">رابط الصورة</label>
            <Input
              value={phone.images[0] || ""}
              onChange={(e) => setPhone((prev) => ({ ...prev, images: [e.target.value] }))}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Specs */}
      <Card>
        <CardHeader>
          <CardTitle>المواصفات</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">الشاشة</label>
            <Input
              value={phone.specs.display}
              onChange={(e) => updateSpec("display", e.target.value)}
              placeholder="6.8 QHD+ Dynamic AMOLED"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">المعالج</label>
            <Input
              value={phone.specs.chipset}
              onChange={(e) => updateSpec("chipset", e.target.value)}
              placeholder="Snapdragon 8 Gen 3"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">الكاميرا</label>
            <Input
              value={phone.specs.camera}
              onChange={(e) => updateSpec("camera", e.target.value)}
              placeholder="200MP"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">البطارية</label>
            <Input
              value={phone.specs.battery}
              onChange={(e) => updateSpec("battery", e.target.value)}
              placeholder="5000mAh"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      <Card>
        <CardHeader>
          <CardTitle>المشاكل الشائعة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {phone.issues.map((issue, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={issue}
                onChange={(e) => {
                  const newIssues = [...phone.issues];
                  newIssues[idx] = e.target.value;
                  setPhone((prev) => ({ ...prev, issues: newIssues }));
                }}
                placeholder={`مشكلة ${idx + 1}`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  setPhone((prev) => ({
                    ...prev,
                    issues: prev.issues.filter((_, i) => i !== idx),
                  }));
                }}
                disabled={phone.issues.length <= 1}
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPhone((prev) => ({ ...prev, issues: [...prev.issues, ""] }))}
          >
            + إضافة مشكلة
          </Button>
        </CardContent>
      </Card>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isEdit ? "حفظ التغييرات" : "إضافة الهاتف"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/phones")}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
