import phonesData from "@/data/phones.json";
import type { Phone, Brand } from "@/types";

const phones: Phone[] = phonesData.phones;

const brandNames: Record<string, { en: string; ar: string }> = {
  samsung: { en: "Samsung", ar: "سامسونج" },
  iphone: { en: "iPhone", ar: "آيفون" },
  google: { en: "Google", ar: "جوجل" },
  xiaomi: { en: "Xiaomi", ar: "شاومي" },
  oneplus: { en: "OnePlus", ar: "ون بلس" },
  huawei: { en: "Huawei", ar: "هواوي" },
};

export function getAllPhones(): Phone[] {
  return phones;
}

export function getPhoneBySlug(brand: string, slug: string): Phone | undefined {
  return phones.find((p) => p.brand === brand && p.slug === slug);
}

export function getPhonesByBrand(brand: string): Phone[] {
  return phones.filter((p) => p.brand === brand);
}

export function getAllBrands(): Brand[] {
  const brandMap = new Map<string, number>();
  phones.forEach((p) => {
    brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
  });

  return Array.from(brandMap.entries()).map(([slug, count]) => ({
    slug,
    name: brandNames[slug]?.en || slug,
    nameAr: brandNames[slug]?.ar || slug,
    phoneCount: count,
  }));
}

export function getBrandName(slug: string): { en: string; ar: string } {
  return brandNames[slug] || { en: slug, ar: slug };
}

export function searchPhones(query: string): Phone[] {
  const q = query.toLowerCase();
  return phones.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.specs.chipset.toLowerCase().includes(q)
  );
}

export function getRelatedPhones(phone: Phone, limit = 4): Phone[] {
  return phones
    .filter((p) => p.slug !== phone.slug)
    .sort((a, b) => {
      if (a.brand === phone.brand && b.brand !== phone.brand) return -1;
      if (b.brand === phone.brand && a.brand !== phone.brand) return 1;
      return Math.abs(a.price - phone.price) - Math.abs(b.price - phone.price);
    })
    .slice(0, limit);
}

export function getFeaturedPhones(limit = 4): Phone[] {
  return phones.slice(0, limit);
}

export function getPhoneCount(): number {
  return phones.length;
}

export function getBrandCount(): number {
  return getAllBrands().length;
}
