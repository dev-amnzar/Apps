export interface GuideStep {
  title: string;
  description: string;
}

export interface Guide {
  type: string;
  typeAr: string;
  phone: string;
  phoneName: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  steps: GuideStep[];
}
