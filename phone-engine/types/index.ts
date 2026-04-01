export type { Phone, PhoneSpecs, PhoneCardProps, BrandName, BrandInfo } from './phone';
export type { Guide, GuideStep, GuideType, GuideTypeInfo } from './guide';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
