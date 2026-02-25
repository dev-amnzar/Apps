"use client";

import * as React from "react";
import Link from "next/link";
import { Scale, Plus, X, Search, ChevronDown, ChevronUp } from "lucide-react";
import type { Phone } from "@/types";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

const MAX_PHONES = 3;

interface CompareRow {
  label: string;
  getValue: (phone: Phone) => string;
  category: string;
}

const compareRows: CompareRow[] = [
  // Launch
  { label: "تاريخ الإطلاق", getValue: (p) => p.fullSpecs?.launch.status ?? p.releaseDate ?? "-", category: "الإطلاق" },
  // Body
  { label: "الأبعاد", getValue: (p) => p.fullSpecs?.body.dimensions ?? "-", category: "الهيكل" },
  { label: "الوزن", getValue: (p) => p.fullSpecs?.body.weight ?? "-", category: "الهيكل" },
  { label: "المواد", getValue: (p) => p.fullSpecs?.body.build ?? "-", category: "الهيكل" },
  { label: "SIM", getValue: (p) => p.fullSpecs?.body.sim ?? "-", category: "الهيكل" },
  { label: "الحماية", getValue: (p) => p.fullSpecs?.body.resistance ?? "-", category: "الهيكل" },
  // Display
  { label: "نوع الشاشة", getValue: (p) => p.fullSpecs?.display.type ?? p.specs.display, category: "الشاشة" },
  { label: "حجم الشاشة", getValue: (p) => p.fullSpecs?.display.size ?? "-", category: "الشاشة" },
  { label: "دقة الشاشة", getValue: (p) => p.fullSpecs?.display.resolution ?? "-", category: "الشاشة" },
  { label: "حماية الشاشة", getValue: (p) => p.fullSpecs?.display.protection ?? "-", category: "الشاشة" },
  // Platform
  { label: "نظام التشغيل", getValue: (p) => p.fullSpecs?.platform.os ?? "-", category: "المنصة" },
  { label: "المعالج", getValue: (p) => p.fullSpecs?.platform.chipset ?? p.specs.chipset, category: "المنصة" },
  { label: "وحدة المعالجة", getValue: (p) => p.fullSpecs?.platform.cpu ?? "-", category: "المنصة" },
  { label: "معالج الرسومات", getValue: (p) => p.fullSpecs?.platform.gpu ?? "-", category: "المنصة" },
  // Memory
  { label: "الرام", getValue: (p) => p.fullSpecs?.memory.ram ?? "-", category: "الذاكرة" },
  { label: "التخزين", getValue: (p) => p.fullSpecs?.memory.internal ?? "-", category: "الذاكرة" },
  { label: "فتحة ذاكرة", getValue: (p) => p.fullSpecs?.memory.cardSlot ?? "-", category: "الذاكرة" },
  // Camera
  { label: "الكاميرا الرئيسية", getValue: (p) => p.fullSpecs?.mainCamera.main.map(m => m.resolution).join(" + ") ?? p.specs.camera, category: "الكاميرا" },
  { label: "فيديو", getValue: (p) => p.fullSpecs?.mainCamera.video?.split(",")[0] ?? "-", category: "الكاميرا" },
  { label: "الكاميرا الأمامية", getValue: (p) => p.fullSpecs?.selfieCamera.modules.map(m => m.resolution).join(" + ") ?? "-", category: "الكاميرا" },
  // Sound
  { label: "مكبر الصوت", getValue: (p) => p.fullSpecs?.sound.loudspeaker ?? "-", category: "الصوت" },
  { label: "مدخل 3.5mm", getValue: (p) => p.fullSpecs?.sound.jack ?? "-", category: "الصوت" },
  // Comms
  { label: "واي فاي", getValue: (p) => p.fullSpecs?.comms.wlan ?? "-", category: "الاتصالات" },
  { label: "بلوتوث", getValue: (p) => p.fullSpecs?.comms.bluetooth ?? "-", category: "الاتصالات" },
  { label: "NFC", getValue: (p) => p.fullSpecs?.comms.nfc ?? "-", category: "الاتصالات" },
  { label: "USB", getValue: (p) => p.fullSpecs?.comms.usb ?? "-", category: "الاتصالات" },
  // Battery
  { label: "البطارية", getValue: (p) => p.fullSpecs?.battery.capacity ?? p.specs.battery, category: "البطارية" },
  { label: "الشحن السلكي", getValue: (p) => p.fullSpecs?.battery.charging ?? "-", category: "البطارية" },
  { label: "الشحن اللاسلكي", getValue: (p) => p.fullSpecs?.battery.wirelessCharging ?? "-", category: "البطارية" },
  // Misc
  { label: "الألوان", getValue: (p) => p.fullSpecs?.misc.colors ?? "-", category: "أخرى" },
  { label: "السعر", getValue: (p) => `$${p.price}`, category: "أخرى" },
];

export default function ComparePage() {
  const [allPhones, setAllPhones] = React.useState<Phone[]>([]);
  const [selected, setSelected] = React.useState<Phone[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSearch, setShowSearch] = React.useState<number | null>(null);
  const [collapsedCategories, setCollapsedCategories] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    fetch("/api/phones")
      .then((r) => r.json())
      .then((phones: Phone[]) => {
        setAllPhones(phones);
        // Auto-select from URL params
        const params = new URLSearchParams(window.location.search);
        const phoneParam = params.get("phones");
        if (phoneParam) {
          const keys = phoneParam.split(",");
          const found = keys
            .map((key) => {
              const parts = key.split("-");
              const brand = parts[0];
              const slug = parts.slice(1).join("-");
              return phones.find((p: Phone) => p.brand === brand && p.slug === slug);
            })
            .filter(Boolean) as Phone[];
          setSelected(found.slice(0, MAX_PHONES));
        }
      });
  }, []);

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const addPhone = (phone: Phone) => {
    if (selected.length < MAX_PHONES && !selected.find((p) => p.brand === phone.brand && p.slug === phone.slug)) {
      setSelected((prev) => [...prev, phone]);
    }
    setShowSearch(null);
    setSearchQuery("");
  };

  const removePhone = (idx: number) => {
    setSelected((prev) => prev.filter((_, i) => i !== idx));
  };

  const filteredPhones = allPhones.filter(
    (p) =>
      !selected.find((s) => s.brand === p.brand && s.slug === p.slug) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = Array.from(new Set(compareRows.map((r) => r.category)));

  return (
    <>
      <Breadcrumbs items={[{ label: "مقارنة الهواتف", href: "/compare" }]} />
      <Container>
        <div className="py-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950">
              <Scale className="h-8 w-8 text-brand-600 dark:text-brand-400" />
            </div>
            <Heading size="h1">مقارنة الهواتف</Heading>
            <Text className="mt-2">قارن بين {MAX_PHONES} هواتف جنباً إلى جنب</Text>
          </div>

          {/* Phone Selector */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: MAX_PHONES }).map((_, idx) => {
              const phone = selected[idx];
              return (
                <Card key={idx} className="relative">
                  <CardContent className="p-4">
                    {phone ? (
                      <div className="text-center">
                        <button
                          onClick={() => removePhone(idx)}
                          className="absolute end-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
                          aria-label="إزالة"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <Link href={`/phones/${phone.brand}/${phone.slug}`} className="hover:underline">
                          <p className="mt-2 font-semibold text-gray-900 dark:text-white">{phone.name}</p>
                        </Link>
                        <p className="text-sm text-gray-500">${phone.price}</p>
                        <Badge variant="secondary" className="mt-2 capitalize">{phone.brand}</Badge>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        {showSearch === idx ? (
                          <div className="w-full space-y-2">
                            <Input
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="ابحث عن هاتف..."
                              autoFocus
                            />
                            <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                              {filteredPhones.map((p) => (
                                <button
                                  key={`${p.brand}-${p.slug}`}
                                  onClick={() => addPhone(p)}
                                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                  <span className="font-medium">{p.name}</span>
                                  <span className="text-gray-400">${p.price}</span>
                                </button>
                              ))}
                              {filteredPhones.length === 0 && (
                                <p className="px-3 py-4 text-center text-sm text-gray-400">لا نتائج</p>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => { setShowSearch(null); setSearchQuery(""); }}>
                              إلغاء
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowSearch(idx)}
                            className="flex flex-col items-center gap-2 text-gray-400 hover:text-brand-600"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600">
                              <Plus className="h-5 w-5" />
                            </div>
                            <span className="text-sm">أضف هاتف</span>
                          </button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparison Table */}
          {selected.length >= 2 && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                    <th className="w-1/4 px-4 py-3 text-start text-sm font-semibold text-gray-700 dark:text-gray-300">المواصفات</th>
                    {selected.map((phone, idx) => (
                      <th key={idx} className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                        {phone.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => {
                    const isCollapsed = collapsedCategories.has(cat);
                    const rows = compareRows.filter((r) => r.category === cat);
                    return (
                      <React.Fragment key={cat}>
                        <tr
                          className="cursor-pointer border-b border-gray-200 bg-brand-50/50 dark:border-gray-800 dark:bg-brand-950/30"
                          onClick={() => toggleCategory(cat)}
                        >
                          <td colSpan={selected.length + 1} className="px-4 py-2.5">
                            <div className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                              {cat}
                            </div>
                          </td>
                        </tr>
                        {!isCollapsed &&
                          rows.map((row) => (
                            <tr key={row.label} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {row.label}
                              </td>
                              {selected.map((phone, idx) => (
                                <td key={idx} className="px-4 py-2.5 text-center text-sm text-gray-900 dark:text-white">
                                  {row.getValue(phone)}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {selected.length < 2 && (
            <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
              <Scale className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
              <Text className="mt-4">اختر هاتفين على الأقل لبدء المقارنة</Text>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
