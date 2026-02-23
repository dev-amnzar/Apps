import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phone-engine.vercel.app";
export const SITE_NAME = "Phone Engine";
export const SITE_NAME_AR = "محرك الهواتف";
export const SITE_DESCRIPTION = "اكتشف أفضل الهواتف الذكية مع أدلة شاملة ومراجعات تفصيلية";

export const BRAND_NAMES: Record<string, string> = {
  samsung: "سامسونج",
  iphone: "آيفون",
  google: "جوجل",
  xiaomi: "شاومي",
  oneplus: "ون بلس",
  huawei: "هواوي",
};

export const BRAND_NAMES_EN: Record<string, string> = {
  samsung: "Samsung",
  iphone: "iPhone",
  google: "Google",
  xiaomi: "Xiaomi",
  oneplus: "OnePlus",
  huawei: "Huawei",
};
