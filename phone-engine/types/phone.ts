export interface PhoneSpecs {
  display: string;
  chipset: string;
  camera: string;
  battery: string;
  ram?: string;
  storage?: string;
  os?: string;
  weight?: string;
}

export interface Phone {
  brand: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  specs: PhoneSpecs;
  issues: string[];
  guides: string[];
  description?: string;
  rating?: number;
  releaseDate?: string;
}

export interface PhoneCardProps {
  phone: Phone;
  className?: string;
}

export type BrandName = 'samsung' | 'iphone' | 'xiaomi' | 'huawei' | 'google' | 'oneplus';

export interface BrandInfo {
  name: string;
  slug: BrandName;
  logo?: string;
  count?: number;
}
