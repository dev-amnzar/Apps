export interface GuideStep {
  title: string;
  description: string;
}

export interface Guide {
  type: string;
  typeAr: string;
  phone: string;
  phoneName: string;
  brand: string;
  title: string;
  description: string;
  steps: GuideStep[];
}

export interface GuideType {
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  icon: string;
}
