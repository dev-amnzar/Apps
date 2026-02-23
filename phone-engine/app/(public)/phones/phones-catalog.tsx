"use client";

import { PhoneCard } from "@/components/phones/phone-card";
import { SearchBar } from "@/components/shared/search-bar";
import { FilterMenu } from "@/components/shared/filter-menu";
import { SortSelect } from "@/components/shared/sort-select";
import { Text } from "@/components/ui/text";
import { useSearch } from "@/hooks/use-search";
import type { Phone, Brand } from "@/types";

interface PhonesCatalogProps {
  phones: Phone[];
  brands: Brand[];
}

export function PhonesCatalog({ phones, brands }: PhonesCatalogProps) {
  const { query, setQuery, brand, setBrand, sort, setSort, results, filteredCount } =
    useSearch(phones);

  return (
    <div className="space-y-6">
      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {/* Filter */}
      <FilterMenu brands={brands} selectedBrand={brand} onSelect={setBrand} />

      {/* Results count */}
      <Text variant="muted" size="sm">
        عرض {filteredCount} من {phones.length} هاتف
      </Text>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((phone) => (
            <PhoneCard key={`${phone.brand}-${phone.slug}`} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Text variant="muted" size="lg">
            لا توجد نتائج مطابقة
          </Text>
          <Text variant="muted" size="sm" className="mt-2">
            جرّب تغيير معايير البحث أو التصفية
          </Text>
        </div>
      )}
    </div>
  );
}
