"use client";

import { ArrowUpDown } from "lucide-react";
import type { SortOption } from "@/lib/search";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "name", label: "الاسم" },
  { value: "price-asc", label: "السعر: الأقل أولاً" },
  { value: "price-desc", label: "السعر: الأعلى أولاً" },
  { value: "brand", label: "العلامة التجارية" },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-cairo text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
