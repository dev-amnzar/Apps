import phonesData from '@/data/phones.json';
import type { Phone } from '@/types';

export function getAllPhones(): Phone[] {
  return phonesData.phones as Phone[];
}

export function getPhoneBySlug(brand: string, slug: string): Phone | undefined {
  return phonesData.phones.find(
    (p) => p.brand === brand && p.slug === slug
  ) as Phone | undefined;
}

export function getPhonesByBrand(brand: string): Phone[] {
  return phonesData.phones.filter(
    (p) => p.brand === brand
  ) as Phone[];
}

export function getAllBrands(): string[] {
  const brands = new Set(phonesData.phones.map((p) => p.brand));
  return Array.from(brands);
}

export function getRelatedPhones(brand: string, currentSlug: string, limit = 3): Phone[] {
  return phonesData.phones
    .filter((p) => p.brand === brand && p.slug !== currentSlug)
    .slice(0, limit) as Phone[];
}

export function getFeaturedPhones(limit = 4): Phone[] {
  return phonesData.phones.slice(0, limit) as Phone[];
}

export function searchPhones(query: string): Phone[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllPhones();

  return phonesData.phones.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.specs.chipset.toLowerCase().includes(q) ||
      p.specs.display.toLowerCase().includes(q) ||
      p.specs.camera.toLowerCase().includes(q)
    );
  }) as Phone[];
}

export function getAllPhoneSlugs(): { brand: string; slug: string }[] {
  return phonesData.phones.map((p) => ({
    brand: p.brand,
    slug: p.slug,
  }));
}

export function getBrandSlugs(): { brand: string }[] {
  const brands = getAllBrands();
  return brands.map((brand) => ({ brand }));
}
