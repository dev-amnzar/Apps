import guidesData from "@/data/guides.json";
import type { Guide, GuideType } from "@/types";
import { BRAND_NAMES } from "./utils";
import { getPhonesByBrand } from "./phones";

export function getGuideTypes(): GuideType[] {
  return guidesData.guideTypes;
}

export function getGuideType(slug: string): GuideType | undefined {
  return guidesData.guideTypes.find((t) => t.slug === slug);
}

type GuidesMap = Record<string, Record<string, {
  title: string;
  description: string;
  steps: { title: string; description: string }[];
}>>;

const guidesMap = guidesData.guides as GuidesMap;

export function getGuide(type: string, brand: string): Guide | undefined {
  const guideType = getGuideType(type);
  const typeGuides = guidesMap[type];
  if (!typeGuides || !guideType) return undefined;

  const brandGuide = typeGuides[brand];
  if (!brandGuide) return undefined;

  const phones = getPhonesByBrand(brand);
  const phoneName = phones.length > 0 ? phones[0].name : brand;

  return {
    type,
    typeAr: guideType.nameAr,
    phone: brand,
    phoneName,
    brand,
    title: brandGuide.title,
    description: brandGuide.description,
    steps: brandGuide.steps,
  };
}

export function getGuidesByType(type: string): Guide[] {
  const guideType = getGuideType(type);
  const typeGuides = guidesMap[type];
  if (!typeGuides || !guideType) return [];

  return Object.entries(typeGuides).map(([brand, data]) => {
    const phones = getPhonesByBrand(brand);
    const phoneName = phones.length > 0 ? phones[0].name : brand;
    return {
      type,
      typeAr: guideType.nameAr,
      phone: brand,
      phoneName,
      brand,
      title: data.title,
      description: data.description,
      steps: data.steps,
    };
  });
}

export function getGuidesByBrand(brand: string): Guide[] {
  const guides: Guide[] = [];

  for (const [type, brands] of Object.entries(guidesMap)) {
    const guideType = getGuideType(type);
    if (!guideType) continue;

    const brandGuide = brands[brand];
    if (!brandGuide) continue;

    const phones = getPhonesByBrand(brand);
    const phoneName = phones.length > 0 ? phones[0].name : brand;

    guides.push({
      type,
      typeAr: guideType.nameAr,
      phone: brand,
      phoneName,
      brand,
      title: brandGuide.title,
      description: brandGuide.description,
      steps: brandGuide.steps,
    });
  }

  return guides;
}

export function getAllGuides(): Guide[] {
  const guides: Guide[] = [];

  for (const [type, brands] of Object.entries(guidesMap)) {
    const guideType = getGuideType(type);
    if (!guideType) continue;

    for (const [brand, data] of Object.entries(brands)) {
      const phones = getPhonesByBrand(brand);
      const phoneName = phones.length > 0 ? phones[0].name : brand;
      guides.push({
        type,
        typeAr: guideType.nameAr,
        phone: brand,
        phoneName,
        brand,
        title: data.title,
        description: data.description,
        steps: data.steps,
      });
    }
  }

  return guides;
}

export function getAllGuideSlugs(): { type: string; phone: string }[] {
  const slugs: { type: string; phone: string }[] = [];

  for (const [type, brands] of Object.entries(guidesMap)) {
    for (const brand of Object.keys(brands)) {
      slugs.push({ type, phone: brand });
    }
  }

  return slugs;
}

export function getGuideTypeSlugs(): string[] {
  return guidesData.guideTypes.map((t) => t.slug);
}
