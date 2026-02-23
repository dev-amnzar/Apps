import type { Phone } from "@/types";

export type SortOption = "name" | "price-asc" | "price-desc" | "brand";

export function filterPhones(
  phones: Phone[],
  query: string,
  brand?: string
): Phone[] {
  let filtered = phones;

  if (brand) {
    filtered = filtered.filter((p) => p.brand === brand);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.chipset.toLowerCase().includes(q) ||
        p.specs.display.toLowerCase().includes(q)
    );
  }

  return filtered;
}

export function sortPhones(phones: Phone[], sort: SortOption): Phone[] {
  const sorted = [...phones];

  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "brand":
      return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    default:
      return sorted;
  }
}
