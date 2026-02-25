/**
 * Auto Arabic Content Generator
 * Generates Arabic translations and descriptions for phone content
 *
 * Strategy:
 * 1. Template-based generation (instant, no API needed)
 * 2. Ready for AI API integration (Anthropic Claude, OpenAI, etc.)
 */

import type { Phone, FullPhoneSpecs } from "@/types";

// ---- Brand name translations ----
const brandTranslations: Record<string, string> = {
  samsung: "سامسونج",
  iphone: "آيفون",
  apple: "آبل",
  google: "جوجل",
  xiaomi: "شاومي",
  redmi: "ريدمي",
  poco: "بوكو",
  oneplus: "ون بلس",
  huawei: "هواوي",
  oppo: "أوبو",
  vivo: "فيفو",
  realme: "ريلمي",
  nothing: "ناثينج",
  motorola: "موتورولا",
  nokia: "نوكيا",
  sony: "سوني",
  asus: "أسوس",
  honor: "هونر",
  tecno: "تكنو",
  infinix: "إنفينيكس",
  zte: "زد تي إي",
  lenovo: "لينوفو",
};

// ---- Common spec translations ----
const specTermTranslations: Record<string, string> = {
  "5G": "الجيل الخامس 5G",
  "4G LTE": "الجيل الرابع LTE",
  AMOLED: "أموليد",
  OLED: "أو ليد",
  LCD: "إل سي دي",
  "Snapdragon": "سنابدراجون",
  "Tensor": "تينسور",
  "Bionic": "بايونيك",
  "Exynos": "إكسينوس",
  "MediaTek": "ميدياتك",
  "Dimensity": "ديمنستي",
  "Gorilla Glass": "زجاج غوريلا",
  "Ceramic Shield": "درع سيراميك",
  "IP68": "مقاوم للماء والغبار IP68",
  "IP67": "مقاوم للماء والغبار IP67",
  "120Hz": "120 هرتز",
  "90Hz": "90 هرتز",
  "60Hz": "60 هرتز",
  "NFC": "اتصال قريب المدى NFC",
  "OIS": "تثبيت بصري OIS",
  "PDAF": "تركيز تلقائي PDAF",
  "HDR": "نطاق ديناميكي عالي HDR",
  "Dolby Vision": "دولبي فيجن",
  "Dolby Atmos": "دولبي أتموس",
  "Wi-Fi 7": "واي فاي 7",
  "Wi-Fi 6E": "واي فاي 6E",
  "Bluetooth 5.3": "بلوتوث 5.3",
  "USB-C": "يو إس بي تايب سي",
  "MagSafe": "ماج سيف",
  "Qi": "تشي",
  "eSIM": "شريحة إلكترونية eSIM",
};

/**
 * Generate Arabic name for a phone
 */
export function generatePhoneNameAr(name: string, brand: string): string {
  const brandAr = brandTranslations[brand.toLowerCase()] || brand;

  // Replace brand name with Arabic version
  let nameAr = name;
  for (const [en, ar] of Object.entries(brandTranslations)) {
    const regex = new RegExp(en, "gi");
    nameAr = nameAr.replace(regex, ar);
  }

  // If no replacement happened, prepend brand
  if (nameAr === name) {
    nameAr = `${brandAr} ${name}`;
  }

  return nameAr;
}

/**
 * Generate Arabic description for a phone
 */
export function generatePhoneDescription(phone: Phone): { en: string; ar: string } {
  const specs = phone.fullSpecs;
  const brandAr = brandTranslations[phone.brand.toLowerCase()] || phone.brand;

  if (!specs) {
    return {
      en: `${phone.name} features ${phone.specs.display} display, ${phone.specs.chipset} processor, ${phone.specs.camera} camera, and ${phone.specs.battery} battery.`,
      ar: `${phone.nameAr || phone.name} يتميز بشاشة ${phone.specs.display}، معالج ${phone.specs.chipset}، كاميرا ${phone.specs.camera}، وبطارية ${phone.specs.battery}.`,
    };
  }

  const mainCam = specs.mainCamera.main[0]?.resolution || "-";
  const en = `The ${phone.name} features a ${specs.display.type} display (${specs.display.size?.split(",")[0]}), powered by ${specs.platform.chipset?.split("(")[0]?.trim()}, with ${mainCam} main camera, ${specs.memory.ram} RAM, and ${specs.battery.capacity} battery with ${specs.battery.charging?.split(",")[0]} charging.`;

  const ar = `يتميز ${phone.nameAr || phone.name} بشاشة ${specs.display.type?.includes("AMOLED") ? "أموليد" : specs.display.type?.includes("OLED") ? "أو ليد" : specs.display.type} بحجم ${specs.display.size?.split(",")[0]}، يعمل بمعالج ${specs.platform.chipset?.split("(")[0]?.trim()}، مع كاميرا رئيسية بدقة ${mainCam}، ذاكرة وصول عشوائي ${specs.memory.ram}، وبطارية بسعة ${specs.battery.capacity} مع شحن ${specs.battery.charging?.split(",")[0]}.`;

  return { en, ar };
}

/**
 * Generate Arabic article for a new phone announcement
 */
export function generatePhoneAnnouncementArticle(phone: Phone): {
  titleAr: string;
  excerptAr: string;
  contentAr: string;
} {
  const brandAr = brandTranslations[phone.brand.toLowerCase()] || phone.brand;
  const nameAr = phone.nameAr || phone.name;
  const specs = phone.fullSpecs;

  const titleAr = `الإعلان عن ${nameAr} رسمياً - المواصفات الكاملة والسعر`;

  let excerptAr = `تعرف على مواصفات وسعر ${nameAr} الجديد`;
  if (specs) {
    excerptAr = `${nameAr} الجديد مع ${specs.platform.chipset?.split("(")[0]?.trim()} و${specs.mainCamera.main[0]?.resolution} كاميرا بسعر ${phone.price}$`;
  }

  let contentAr = `أعلنت شركة ${brandAr} رسمياً عن هاتفها الجديد ${nameAr}`;

  if (specs) {
    contentAr += `، الذي يأتي بمواصفات مميزة تشمل:\n\n`;
    contentAr += `**الشاشة:** ${specs.display.type} بحجم ${specs.display.size?.split(",")[0]} ودقة ${specs.display.resolution?.split(",")[0]}\n\n`;
    contentAr += `**المعالج:** ${specs.platform.chipset} مع ${specs.platform.gpu}\n\n`;
    contentAr += `**الكاميرا:** نظام كاميرا ${specs.mainCamera.main.length > 1 ? "متعدد العدسات" : "بعدسة واحدة"} بدقة ${specs.mainCamera.main.map((m) => m.resolution).join(" + ")}`;
    if (specs.mainCamera.video) {
      contentAr += ` مع تصوير فيديو ${specs.mainCamera.video.split(",")[0]}`;
    }
    contentAr += `\n\n`;
    contentAr += `**الذاكرة:** ${specs.memory.ram} رام مع تخزين داخلي ${specs.memory.internal}\n\n`;
    contentAr += `**البطارية:** ${specs.battery.capacity}`;
    if (specs.battery.charging) {
      contentAr += ` مع شحن سريع ${specs.battery.charging.split(",")[0]}`;
    }
    if (specs.battery.wirelessCharging) {
      contentAr += ` وشحن لاسلكي ${specs.battery.wirelessCharging.split(",")[0]}`;
    }
    contentAr += `\n\n`;

    if (specs.body.resistance) {
      contentAr += `يتميز الهاتف أيضاً بحماية ${specs.body.resistance} `;
    }
    if (specs.comms.nfc === "Yes") {
      contentAr += `ودعم NFC للمدفوعات اللاتلامسية `;
    }
    if (specs.network.technology?.includes("5G")) {
      contentAr += `ودعم شبكات الجيل الخامس 5G`;
    }
    contentAr += `.\n\n`;
    contentAr += `يتوفر ${nameAr} بالألوان: ${specs.misc.colors || "متعددة"}.\n\n`;
    contentAr += `**السعر:** يبدأ من ${phone.price}$ (${specs.misc.price || ""}).`;
  }

  return { titleAr, excerptAr, contentAr };
}

/**
 * Generate Arabic translation for news article title
 * Uses template-based approach - can be replaced with AI API
 */
export function translateNewsTitle(title: string): string {
  let translated = title;

  // Common patterns
  const patterns: [RegExp, string][] = [
    [/^(.+) announced with (.+)$/i, "الإعلان عن $1 مع $2"],
    [/^(.+) launches? (.+)$/i, "$1 تطلق $2"],
    [/^(.+) reveals? (.+)$/i, "$1 تكشف عن $2"],
    [/^(.+) leaked (.+)$/i, "تسريب $2 لـ $1"],
    [/^(.+) review:? (.+)$/i, "مراجعة $1: $2"],
    [/^Best (.+) phones? (.+)$/i, "أفضل هواتف $1 $2"],
    [/^(.+) vs (.+): (.+)$/i, "$1 ضد $2: $3"],
    [/^(.+) gets (.+) update$/i, "$1 يحصل على تحديث $2"],
    [/^(.+) camera (.+)$/i, "كاميرا $1 $2"],
    [/^How to (.+)$/i, "كيفية $1"],
  ];

  for (const [pattern, replacement] of patterns) {
    if (pattern.test(translated)) {
      translated = translated.replace(pattern, replacement);
      break;
    }
  }

  // Replace brand names
  for (const [en, ar] of Object.entries(brandTranslations)) {
    const regex = new RegExp(`\\b${en}\\b`, "gi");
    translated = translated.replace(regex, ar);
  }

  return translated;
}

/**
 * Generate a slug-safe string from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * AI-ready translation function
 * Currently returns template-based translation
 * Replace with AI API call for production use
 */
export async function translateWithAI(
  text: string,
  _apiKey?: string
): Promise<string> {
  // TODO: Replace with actual AI API call
  // Example with Anthropic Claude:
  // const response = await fetch("https://api.anthropic.com/v1/messages", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": apiKey,
  //     "anthropic-version": "2023-06-01",
  //   },
  //   body: JSON.stringify({
  //     model: "claude-haiku-4-5-20251001",
  //     max_tokens: 1024,
  //     messages: [{
  //       role: "user",
  //       content: `Translate this phone tech news to Arabic. Keep brand names, model numbers, and technical terms as-is. Return ONLY the Arabic translation:\n\n${text}`,
  //     }],
  //   }),
  // });

  // For now, use template-based translation
  return translateNewsTitle(text);
}
