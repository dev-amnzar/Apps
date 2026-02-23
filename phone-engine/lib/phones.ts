import phonesData from "@/data/phones.json";
import type { Phone, Brand } from "@/types";
import { BRAND_NAMES } from "./utils";

export function getAllPhones(): Phone[] {
  return phonesData.phones;
}

export function getPhoneBySlug(brand: string, slug: string): Phone | undefined {
  return phonesData.phones.find(
    (p) => p.brand === brand && p.slug === slug
  );
}

export function getPhonesByBrand(brand: string): Phone[] {
  return phonesData.phones.filter((p) => p.brand === brand);
}

export function getAllBrands(): Brand[] {
  const brandMap = new Map<string, number>();

  for (const phone of phonesData.phones) {
    brandMap.set(phone.brand, (brandMap.get(phone.brand) || 0) + 1);
  }

  return Array.from(brandMap.entries()).map(([slug, count]) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    nameAr: BRAND_NAMES[slug] || slug,
    count,
  }));
}

export function getFeaturedPhones(limit = 4): Phone[] {
  return phonesData.phones.slice(0, limit);
}

export function searchPhones(query: string): Phone[] {
  const q = query.toLowerCase();
  return phonesData.phones.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.specs.chipset.toLowerCase().includes(q)
  );
}

export function getRelatedPhones(phone: Phone, limit = 3): Phone[] {
  return phonesData.phones
    .filter((p) => p.brand === phone.brand && p.slug !== phone.slug)
    .slice(0, limit);
}

export function getAllPhoneSlugs(): { brand: string; slug: string }[] {
  return phonesData.phones.map((p) => ({
    brand: p.brand,
    slug: p.slug,
  }));
}

export function getAllBrandSlugs(): string[] {
  return [...new Set(phonesData.phones.map((p) => p.brand))];
}
