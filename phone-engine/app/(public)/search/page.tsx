"use client";

import * as React from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, Smartphone } from "lucide-react";
import type { Phone } from "@/types";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

interface FilterState {
  brand: string[];
  priceMin: number;
  priceMax: number;
  ram: string[];
  battery: string[];
  display: string[];
  chipset: string[];
  camera: string[];
  nfc: string;
  jack: string;
  fiveG: string;
  wirelessCharging: string;
}

const defaultFilters: FilterState = {
  brand: [],
  priceMin: 0,
  priceMax: 2000,
  ram: [],
  battery: [],
  display: [],
  chipset: [],
  camera: [],
  nfc: "",
  jack: "",
  fiveG: "",
  wirelessCharging: "",
};

function extractOptions(phones: Phone[]) {
  const brands = Array.from(new Set(phones.map((p) => p.brand)));
  const rams = Array.from(new Set(phones.filter(p => p.fullSpecs).map((p) => p.fullSpecs!.memory.ram))).sort();
  const batteries = ["3000-4000 mAh", "4000-5000 mAh", "5000+ mAh"];
  const displays = ["AMOLED", "OLED", "Super Retina"];
  const chipsets = Array.from(new Set(phones.map((p) => {
    const c = p.fullSpecs?.platform.chipset ?? p.specs.chipset;
    if (c.includes("Snapdragon")) return "Snapdragon";
    if (c.includes("A17") || c.includes("A16")) return "Apple Bionic";
    if (c.includes("Tensor")) return "Google Tensor";
    if (c.includes("Exynos")) return "Exynos";
    return c;
  })));
  const cameras = ["48 MP+", "50 MP+", "100 MP+", "200 MP"];

  return { brands, rams, batteries, displays, chipsets, cameras };
}

function matchesFilters(phone: Phone, filters: FilterState): boolean {
  if (filters.brand.length > 0 && !filters.brand.includes(phone.brand)) return false;
  if (phone.price < filters.priceMin || phone.price > filters.priceMax) return false;

  if (filters.ram.length > 0 && phone.fullSpecs) {
    if (!filters.ram.includes(phone.fullSpecs.memory.ram)) return false;
  }

  if (filters.battery.length > 0 && phone.fullSpecs) {
    const cap = parseInt(phone.fullSpecs.battery.capacity);
    const matches = filters.battery.some((b) => {
      if (b === "3000-4000 mAh") return cap >= 3000 && cap < 4000;
      if (b === "4000-5000 mAh") return cap >= 4000 && cap < 5000;
      if (b === "5000+ mAh") return cap >= 5000;
      return false;
    });
    if (!matches) return false;
  }

  if (filters.display.length > 0 && phone.fullSpecs) {
    const type = phone.fullSpecs.display.type;
    if (!filters.display.some((d) => type.includes(d))) return false;
  }

  if (filters.fiveG === "yes" && phone.fullSpecs) {
    if (!phone.fullSpecs.network.technology.includes("5G")) return false;
  }

  if (filters.nfc === "yes" && phone.fullSpecs) {
    if (phone.fullSpecs.comms.nfc !== "Yes") return false;
  }

  if (filters.jack === "yes" && phone.fullSpecs) {
    if (!phone.fullSpecs.sound.jack.toLowerCase().includes("yes")) return false;
  }

  if (filters.wirelessCharging === "yes" && phone.fullSpecs) {
    if (!phone.fullSpecs.battery.wirelessCharging || phone.fullSpecs.battery.wirelessCharging === "No") return false;
  }

  return true;
}

function FilterChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        selected
          ? "bg-brand-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

function ToggleFilter({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <button
        onClick={() => onChange(value === "yes" ? "" : "yes")}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          value === "yes" ? "bg-brand-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm ${
            value === "yes" ? "start-5" : "start-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function SearchPage() {
  const [phones, setPhones] = React.useState<Phone[]>([]);
  const [filters, setFilters] = React.useState<FilterState>(defaultFilters);
  const [query, setQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("popularity");

  React.useEffect(() => {
    fetch("/api/phones")
      .then((r) => r.json())
      .then(setPhones);
  }, []);

  const options = React.useMemo(() => extractOptions(phones), [phones]);

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const results = React.useMemo(() => {
    let filtered = phones.filter((p) => matchesFilters(p, filters));

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.chipset.toLowerCase().includes(q) ||
          (p.nameAr && p.nameAr.includes(query))
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b.popularity ?? 0) - (a.popularity ?? 0);
    });

    return filtered;
  }, [phones, filters, query, sortBy]);

  const activeFilterCount = filters.brand.length + filters.ram.length + filters.battery.length +
    filters.display.length + filters.chipset.length + filters.camera.length +
    (filters.nfc ? 1 : 0) + (filters.jack ? 1 : 0) + (filters.fiveG ? 1 : 0) +
    (filters.wirelessCharging ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 2000 ? 1 : 0);

  return (
    <>
      <Breadcrumbs items={[{ label: "البحث المتقدم", href: "/search" }]} />
      <Container>
        <div className="py-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950">
              <Search className="h-8 w-8 text-brand-600 dark:text-brand-400" />
            </div>
            <Heading size="h1">البحث المتقدم عن الهواتف</Heading>
            <Text className="mt-2">ابحث عن الهاتف المثالي حسب المواصفات</Text>
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم، العلامة التجارية، أو المعالج..."
                className="ps-10"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              فلاتر
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ms-1">{activeFilterCount}</Badge>
              )}
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="popularity">الأكثر شعبية</option>
              <option value="price-asc">السعر: الأقل أولاً</option>
              <option value="price-desc">السعر: الأعلى أولاً</option>
              <option value="name">الاسم</option>
            </select>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="space-y-6 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">الفلاتر</h3>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setFilters(defaultFilters)} className="text-xs">
                      <X className="me-1 h-3 w-3" />
                      مسح الكل
                    </Button>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">العلامة التجارية</p>
                  <div className="flex flex-wrap gap-2">
                    {options.brands.map((b) => (
                      <FilterChip key={b} label={b} selected={filters.brand.includes(b)} onClick={() => toggleArrayFilter("brand", b)} />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    السعر: ${filters.priceMin} - ${filters.priceMax}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priceMin: parseInt(e.target.value) || 0 }))}
                      placeholder="من"
                      className="text-center"
                    />
                    <Input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priceMax: parseInt(e.target.value) || 2000 }))}
                      placeholder="إلى"
                      className="text-center"
                    />
                  </div>
                </div>

                {/* RAM */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">الرام</p>
                  <div className="flex flex-wrap gap-2">
                    {options.rams.map((r) => (
                      <FilterChip key={r} label={r} selected={filters.ram.includes(r)} onClick={() => toggleArrayFilter("ram", r)} />
                    ))}
                  </div>
                </div>

                {/* Battery */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">البطارية</p>
                  <div className="flex flex-wrap gap-2">
                    {options.batteries.map((b) => (
                      <FilterChip key={b} label={b} selected={filters.battery.includes(b)} onClick={() => toggleArrayFilter("battery", b)} />
                    ))}
                  </div>
                </div>

                {/* Display Type */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">نوع الشاشة</p>
                  <div className="flex flex-wrap gap-2">
                    {options.displays.map((d) => (
                      <FilterChip key={d} label={d} selected={filters.display.includes(d)} onClick={() => toggleArrayFilter("display", d)} />
                    ))}
                  </div>
                </div>

                {/* Chipset */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">المعالج</p>
                  <div className="flex flex-wrap gap-2">
                    {options.chipsets.map((c) => (
                      <FilterChip key={c} label={c} selected={filters.chipset.includes(c)} onClick={() => toggleArrayFilter("chipset", c)} />
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <ToggleFilter label="يدعم 5G" value={filters.fiveG} onChange={(v) => setFilters((prev) => ({ ...prev, fiveG: v }))} />
                  <ToggleFilter label="يدعم NFC" value={filters.nfc} onChange={(v) => setFilters((prev) => ({ ...prev, nfc: v }))} />
                  <ToggleFilter label="مدخل سماعات 3.5mm" value={filters.jack} onChange={(v) => setFilters((prev) => ({ ...prev, jack: v }))} />
                  <ToggleFilter label="شحن لاسلكي" value={filters.wirelessCharging} onChange={(v) => setFilters((prev) => ({ ...prev, wirelessCharging: v }))} />
                </div>
              </div>
            )}

            {/* Results */}
            <div>
              <p className="mb-4 text-sm text-gray-500">{results.length} نتيجة</p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((phone) => (
                  <Link key={`${phone.brand}-${phone.slug}`} href={`/phones/${phone.brand}/${phone.slug}`}>
                    <Card className="transition-all hover:-translate-y-1 hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="secondary" className="capitalize">{phone.brand}</Badge>
                          {phone.rating && <span className="text-sm text-amber-500">{phone.rating}/5</span>}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{phone.name}</h3>
                        {phone.nameAr && <p className="text-xs text-gray-500">{phone.nameAr}</p>}
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <span>{phone.fullSpecs?.display.size?.split(",")[0] ?? phone.specs.display}</span>
                          <span>{phone.fullSpecs?.battery.capacity ?? phone.specs.battery}</span>
                          <span>{phone.fullSpecs?.memory.ram ?? "-"}</span>
                          <span>{phone.fullSpecs?.mainCamera.main[0]?.resolution ?? phone.specs.camera}</span>
                        </div>
                        <p className="mt-3 text-lg font-bold text-brand-600 dark:text-brand-400">${phone.price}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {results.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
                  <Smartphone className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                  <Text className="mt-4">لا توجد نتائج تطابق الفلاتر المختارة</Text>
                  <Button variant="outline" className="mt-4" onClick={() => setFilters(defaultFilters)}>
                    مسح الفلاتر
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
