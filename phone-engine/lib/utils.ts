import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function brandDisplayName(brand: string): string {
  const names: Record<string, string> = {
    samsung: 'Samsung',
    iphone: 'Apple iPhone',
    xiaomi: 'Xiaomi',
    huawei: 'Huawei',
    google: 'Google',
    oneplus: 'OnePlus',
  };
  return names[brand.toLowerCase()] ?? capitalize(brand);
}

export function guideTypeDisplayName(type: string): string {
  const names: Record<string, string> = {
    setup: 'Setup Guide',
    transfer: 'Data Transfer',
    troubleshoot: 'Troubleshooting',
    tips: 'Tips & Tricks',
    repair: 'Repair Guide',
  };
  return names[type.toLowerCase()] ?? capitalize(type);
}

export function guideTypeDisplayNameAr(type: string): string {
  const names: Record<string, string> = {
    setup: 'دليل الإعداد',
    transfer: 'نقل البيانات',
    troubleshoot: 'حل المشاكل',
    tips: 'نصائح وحيل',
    repair: 'دليل الإصلاح',
  };
  return names[type.toLowerCase()] ?? capitalize(type);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '…';
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://phone-engine.vercel.app';
}
