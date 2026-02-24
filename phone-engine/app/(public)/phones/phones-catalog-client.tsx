"use client";

import type { Phone, Brand } from "@/types";
import { useSearch } from "@/hooks/use-search";
import { SearchBar } from "@/components/shared/search-bar";
import { FilterMenu } from "@/components/shared/filter-menu";
import { SortSelect } from "@/components/shared/sort-select";
import { PhoneCard } from "@/components/phones/phone-card";
import { Text } from "@/components/ui/text";

interface PhonesCatalogClientProps {
  phones: Phone[];
  brands: Brand[];
}

const sortOptions = [
  { value: "name", label: "الاسم" },
  { value: "price-asc", label: "السعر: الأقل" },
  { value: "price-desc", label: "السعر: الأعلى" },
];

export function PhonesCatalogClient({ phones, brands }: PhonesCatalogClientProps) {
  const { query, setQuery, brand, setBrand, sort, setSort, filtered } = useSearch({ phones });

  const brandOptions = [
    { value: "all", label: "الكل" },
    ...brands.map((b) => ({ value: b.slug, label: b.nameAr })),
  ];

  return (
    <>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <SortSelect value={sort} onChange={setSort} options={sortOptions} />
        </div>
        <FilterMenu options={brandOptions} selected={brand} onChange={setBrand} />
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((phone) => (
            <PhoneCard key={`${phone.brand}-${phone.slug}`} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Text size="lg">لا توجد نتائج مطابقة</Text>
          <Text size="sm" className="mt-1">
            حاول تغيير معايير البحث أو التصفية
          </Text>
        </div>
      )}

      {/* Results count */}
      <div className="mt-6 text-center">
        <Text size="sm">
          عرض {filtered.length} من {phones.length} هاتف
        </Text>
      </div>
    </>
  );
}
