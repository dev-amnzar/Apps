"use client";

import { useState, useMemo } from "react";
import type { Phone } from "@/types";

interface UseSearchOptions {
  phones: Phone[];
}

export function useSearch({ phones }: UseSearchOptions) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    let result = [...phones];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.chipset.toLowerCase().includes(q)
      );
    }

    if (brand !== "all") {
      result = result.filter((p) => p.brand === brand);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [phones, query, brand, sort]);

  return {
    query,
    setQuery,
    brand,
    setBrand,
    sort,
    setSort,
    filtered,
  };
}
