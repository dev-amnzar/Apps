export interface GuideStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

export interface Guide {
  type: string;
  phone: string;
  title: string;
  description: string;
  steps: GuideStep[];
  videoUrl?: string;
  relatedGuides?: string[];
  updatedAt?: string;
}

export type GuideType = 'setup' | 'transfer' | 'troubleshoot' | 'tips' | 'repair';

export interface GuideTypeInfo {
  type: GuideType;
  label: string;
  labelAr: string;
  description: string;
  icon: string;
}
