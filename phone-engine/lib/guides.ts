import guidesData from '@/data/guides.json';
import type { Guide, GuideTypeInfo } from '@/types';

interface RawGuide {
  type: string;
  phone: string;
  title: string;
  titleAr?: string;
  description: string;
  updatedAt?: string;
  steps: Array<{
    step: number;
    title: string;
    titleAr?: string;
    description: string;
    tip?: string;
  }>;
}

export function getAllGuides(): Guide[] {
  return (guidesData.guides as RawGuide[]).map((g) => ({
    type: g.type,
    phone: g.phone,
    title: g.title,
    description: g.description,
    steps: g.steps,
    updatedAt: g.updatedAt,
  }));
}

export function getGuide(type: string, phone: string): Guide | undefined {
  const raw = (guidesData.guides as RawGuide[]).find(
    (g) => g.type === type && g.phone === phone
  );
  if (!raw) return undefined;
  return {
    type: raw.type,
    phone: raw.phone,
    title: raw.title,
    description: raw.description,
    steps: raw.steps,
    updatedAt: raw.updatedAt,
  };
}

export function getGuidesByType(type: string): Guide[] {
  return (guidesData.guides as RawGuide[])
    .filter((g) => g.type === type)
    .map((g) => ({
      type: g.type,
      phone: g.phone,
      title: g.title,
      description: g.description,
      steps: g.steps,
      updatedAt: g.updatedAt,
    }));
}

export function getGuidesByPhone(phone: string): Guide[] {
  return (guidesData.guides as RawGuide[])
    .filter((g) => g.phone === phone)
    .map((g) => ({
      type: g.type,
      phone: g.phone,
      title: g.title,
      description: g.description,
      steps: g.steps,
      updatedAt: g.updatedAt,
    }));
}

export function getAllGuideTypes(): GuideTypeInfo[] {
  return guidesData.guideTypes as GuideTypeInfo[];
}

export function getRelatedGuides(type: string, currentPhone: string, limit = 3): Guide[] {
  return (guidesData.guides as RawGuide[])
    .filter((g) => g.type === type && g.phone !== currentPhone)
    .slice(0, limit)
    .map((g) => ({
      type: g.type,
      phone: g.phone,
      title: g.title,
      description: g.description,
      steps: g.steps,
      updatedAt: g.updatedAt,
    }));
}

export function getAllGuideSlugs(): { type: string; phone: string }[] {
  return (guidesData.guides as RawGuide[]).map((g) => ({
    type: g.type,
    phone: g.phone,
  }));
}

export function getGuideTypeSlugs(): { type: string }[] {
  const types = new Set((guidesData.guides as RawGuide[]).map((g) => g.type));
  return Array.from(types).map((type) => ({ type }));
}
