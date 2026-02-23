"use client";

import { useState, useMemo } from "react";
import type { Phone } from "@/types";
import { filterPhones, sortPhones, type SortOption } from "@/lib/search";

export function useSearch(phones: Phone[]) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("name");

  const results = useMemo(() => {
    const filtered = filterPhones(phones, query, brand || undefined);
    return sortPhones(filtered, sort);
  }, [phones, query, brand, sort]);

  return {
    query,
    setQuery,
    brand,
    setBrand,
    sort,
    setSort,
    results,
    totalCount: phones.length,
    filteredCount: results.length,
  };
}
