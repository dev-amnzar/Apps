'use client';

import { useState, useMemo } from 'react';
import type { Phone } from '@/types';

export function useSearch(phones: Phone[]) {
  const [query, setQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return phones.filter((phone) => {
      const matchesBrand = !brandFilter || phone.brand === brandFilter;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        phone.name.toLowerCase().includes(q) ||
        phone.brand.toLowerCase().includes(q) ||
        phone.specs.chipset.toLowerCase().includes(q);
      return matchesBrand && matchesQuery;
    });
  }, [phones, query, brandFilter]);

  return {
    query,
    setQuery,
    brandFilter,
    setBrandFilter,
    filtered,
    total: phones.length,
    resultCount: filtered.length,
  };
}
