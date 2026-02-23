export interface PhoneSpecs {
  display: string;
  chipset: string;
  camera: string;
  battery: string;
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
}

export interface PhoneData {
  phones: Phone[];
}

export interface Brand {
  slug: string;
  name: string;
  nameAr: string;
  count: number;
}
