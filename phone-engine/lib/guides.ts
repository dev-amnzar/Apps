import guidesData from "@/data/guides.json";
import type { Guide } from "@/types";

const guides: Guide[] = guidesData.guides;

const guideTypeNames: Record<string, { en: string; ar: string }> = {
  setup: { en: "Setup Guide", ar: "دليل الإعداد" },
  transfer: { en: "Data Transfer", ar: "نقل البيانات" },
};

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuidesByType(type: string): Guide[] {
  return guides.filter((g) => g.type === type);
}

export function getGuidesByPhone(phoneSlug: string): Guide[] {
  return guides.filter((g) => g.phone === phoneSlug);
}

export function getGuide(type: string, phone: string): Guide | undefined {
  return guides.find((g) => g.type === type && g.phone === phone);
}

export function getAllGuideTypes(): { slug: string; name: string; nameAr: string; count: number }[] {
  const typeMap = new Map<string, number>();
  guides.forEach((g) => {
    typeMap.set(g.type, (typeMap.get(g.type) || 0) + 1);
  });

  return Array.from(typeMap.entries()).map(([slug, count]) => ({
    slug,
    name: guideTypeNames[slug]?.en || slug,
    nameAr: guideTypeNames[slug]?.ar || slug,
    count,
  }));
}

export function getGuideTypeName(type: string): { en: string; ar: string } {
  return guideTypeNames[type] || { en: type, ar: type };
}

export function getRelatedGuides(guide: Guide, limit = 4): Guide[] {
  return guides
    .filter((g) => !(g.type === guide.type && g.phone === guide.phone))
    .sort((a, b) => {
      if (a.phone === guide.phone && b.phone !== guide.phone) return -1;
      if (b.phone === guide.phone && a.phone !== guide.phone) return 1;
      if (a.type === guide.type && b.type !== guide.type) return -1;
      if (b.type === guide.type && a.type !== guide.type) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getGuideCount(): number {
  return guides.length;
}
