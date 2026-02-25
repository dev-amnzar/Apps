"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import type { Guide, GuideStep } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GuideFormProps {
  initialData?: Guide;
  isEdit?: boolean;
}

const emptyGuide: Guide = {
  type: "setup",
  typeAr: "إعداد الهاتف",
  phone: "",
  phoneName: "",
  title: "",
  titleAr: "",
  description: "",
  descriptionAr: "",
  steps: [{ title: "", description: "" }],
};

export function GuideForm({ initialData, isEdit = false }: GuideFormProps) {
  const router = useRouter();
  const [guide, setGuide] = React.useState<Guide>(initialData || emptyGuide);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Auto-set typeAr based on type
    const typeArMap: Record<string, string> = {
      setup: "إعداد الهاتف",
      transfer: "نقل البيانات",
    };
    const finalGuide = { ...guide, typeAr: typeArMap[guide.type] || guide.type };

    try {
      const url = isEdit ? `/api/guides/${guide.type}--${guide.phone}` : "/api/guides";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalGuide),
      });

      if (res.ok) {
        router.push("/admin/guides");
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

  const updateStep = (index: number, field: keyof GuideStep, value: string) => {
    setGuide((prev) => ({
      ...prev,
      steps: prev.steps.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const addStep = () => {
    setGuide((prev) => ({
      ...prev,
      steps: [...prev.steps, { title: "", description: "" }],
    }));
  };

  const removeStep = (index: number) => {
    setGuide((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
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
            <label className="mb-1.5 block text-sm font-medium">النوع</label>
            <select
              value={guide.type}
              onChange={(e) => setGuide((prev) => ({ ...prev, type: e.target.value }))}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
              disabled={isEdit}
            >
              <option value="setup">إعداد الهاتف (Setup)</option>
              <option value="transfer">نقل البيانات (Transfer)</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">معرف الهاتف</label>
            <Input
              value={guide.phone}
              onChange={(e) => setGuide((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="samsung-s24-ultra"
              required
              disabled={isEdit}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">اسم الهاتف</label>
            <Input
              value={guide.phoneName}
              onChange={(e) => setGuide((prev) => ({ ...prev, phoneName: e.target.value }))}
              placeholder="Samsung Galaxy S24 Ultra"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">العنوان (English)</label>
            <Input
              value={guide.title}
              onChange={(e) => setGuide((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="How to Setup Samsung Galaxy S24 Ultra"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">العنوان (عربي)</label>
            <Input
              value={guide.titleAr}
              onChange={(e) => setGuide((prev) => ({ ...prev, titleAr: e.target.value }))}
              placeholder="دليل إعداد Samsung Galaxy S24 Ultra"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">الوصف (English)</label>
            <Input
              value={guide.description}
              onChange={(e) => setGuide((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Complete setup guide..."
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">الوصف (عربي)</label>
            <Input
              value={guide.descriptionAr}
              onChange={(e) => setGuide((prev) => ({ ...prev, descriptionAr: e.target.value }))}
              placeholder="دليل شامل لإعداد..."
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>الخطوات ({guide.steps.length})</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addStep}>
            + إضافة خطوة
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {guide.steps.map((step, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-600">خطوة {idx + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeStep(idx)}
                  disabled={guide.steps.length <= 1}
                >
                  حذف
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium">العنوان</label>
                  <Input
                    value={step.title}
                    onChange={(e) => updateStep(idx, "title", e.target.value)}
                    placeholder="عنوان الخطوة"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">الوصف</label>
                  <Input
                    value={step.description}
                    onChange={(e) => updateStep(idx, "description", e.target.value)}
                    placeholder="وصف الخطوة"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
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
          {isEdit ? "حفظ التغييرات" : "إضافة الدليل"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/guides")}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
