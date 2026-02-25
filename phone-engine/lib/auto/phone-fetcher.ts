/**
 * Phone Data Fetcher
 * Fetches phone specifications from multiple public sources:
 * 1. Phone Specs API (free public API)
 * 2. GSMArena-compatible dataset format
 * 3. Manual JSON import
 */

import type { Phone, FullPhoneSpecs } from "@/types";

// Public phone specs API endpoints
const PHONE_SPECS_API = "https://phone-specs-api.azharimm.dev";
const FONO_API = "https://fonoapi.freshpixl.com/v1";

export interface FetchedPhone {
  brand: string;
  name: string;
  slug: string;
  imageUrl?: string;
  specs: Record<string, Record<string, string>>;
}

/**
 * Fetch list of all brands from public API
 */
export async function fetchBrands(): Promise<{ slug: string; name: string }[]> {
  try {
    const res = await fetch(`${PHONE_SPECS_API}/brands`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return (data.data || []).map((b: { brand_slug: string; brand_name: string }) => ({
      slug: b.brand_slug,
      name: b.brand_name,
    }));
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

/**
 * Fetch phones list for a specific brand
 */
export async function fetchPhonesByBrand(
  brandSlug: string,
  page = 1
): Promise<{ phones: { slug: string; name: string; image?: string }[]; totalPages: number }> {
  try {
    const res = await fetch(`${PHONE_SPECS_API}/brands/${brandSlug}?page=${page}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return {
      phones: (data.data?.phones || []).map((p: { phone_slug: string; phone_name: string; image?: string }) => ({
        slug: p.phone_slug,
        name: p.phone_name,
        image: p.image,
      })),
      totalPages: data.data?.total_page || 1,
    };
  } catch (error) {
    console.error("Failed to fetch phones:", error);
    return { phones: [], totalPages: 0 };
  }
}

/**
 * Fetch detailed specs for a single phone
 */
export async function fetchPhoneSpecs(phoneSlug: string): Promise<FetchedPhone | null> {
  try {
    const res = await fetch(`${PHONE_SPECS_API}/${phoneSlug}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    const phone = data.data;
    if (!phone) return null;

    return {
      brand: phone.brand || "",
      name: phone.phone_name || "",
      slug: phoneSlug,
      imageUrl: phone.thumbnail,
      specs: phone.specifications?.reduce(
        (acc: Record<string, Record<string, string>>, section: { title: string; specs: { key: string; val: string[] }[] }) => {
          acc[section.title] = {};
          for (const spec of section.specs || []) {
            acc[section.title][spec.key] = (spec.val || []).join(", ");
          }
          return acc;
        },
        {} as Record<string, Record<string, string>>
      ) || {},
    };
  } catch (error) {
    console.error("Failed to fetch phone specs:", error);
    return null;
  }
}

/**
 * Convert fetched raw specs into our FullPhoneSpecs format
 */
export function convertToFullSpecs(raw: Record<string, Record<string, string>>): FullPhoneSpecs {
  const get = (section: string, key: string): string => {
    // Try exact match first, then partial match
    const sec = raw[section];
    if (!sec) return "";
    if (sec[key]) return sec[key];
    // Partial match
    const found = Object.entries(sec).find(([k]) => k.toLowerCase().includes(key.toLowerCase()));
    return found ? found[1] : "";
  };

  return {
    network: {
      technology: get("Network", "Technology"),
      bands2G: get("Network", "2G bands"),
      bands3G: get("Network", "3G bands"),
      bands4G: get("Network", "4G bands"),
      bands5G: get("Network", "5G bands"),
      speed: get("Network", "Speed"),
    },
    launch: {
      announced: get("Launch", "Announced"),
      status: get("Launch", "Status"),
    },
    body: {
      dimensions: get("Body", "Dimensions"),
      weight: get("Body", "Weight"),
      build: get("Body", "Build"),
      sim: get("Body", "SIM"),
      resistance: get("Body", "IP") || get("Body", "Water") || get("Body", "resistance"),
    },
    display: {
      type: get("Display", "Type"),
      size: get("Display", "Size"),
      resolution: get("Display", "Resolution"),
      protection: get("Display", "Protection"),
      features: get("Display", "Features") || get("Display", "nits"),
    },
    platform: {
      os: get("Platform", "OS"),
      chipset: get("Platform", "Chipset"),
      cpu: get("Platform", "CPU"),
      gpu: get("Platform", "GPU"),
    },
    memory: {
      cardSlot: get("Memory", "Card slot"),
      internal: get("Memory", "Internal"),
      ram: extractRam(get("Memory", "Internal")),
      type: get("Memory", "Type") || extractStorageType(get("Memory", "Internal")),
    },
    mainCamera: {
      main: parseMainCameraModules(raw["Main Camera"] || {}),
      features: get("Main Camera", "Features"),
      video: get("Main Camera", "Video"),
    },
    selfieCamera: {
      modules: parseSelfieCameraModules(raw["Selfie camera"] || {}),
      features: get("Selfie camera", "Features"),
      video: get("Selfie camera", "Video"),
    },
    sound: {
      loudspeaker: get("Sound", "Loudspeaker"),
      jack: get("Sound", "3.5mm jack"),
      features: get("Sound", "Features") || get("Sound", "quality"),
    },
    comms: {
      wlan: get("Comms", "WLAN"),
      bluetooth: get("Comms", "Bluetooth"),
      positioning: get("Comms", "Positioning") || get("Comms", "GPS"),
      nfc: get("Comms", "NFC"),
      infrared: get("Comms", "Infrared") || get("Comms", "infrared"),
      radio: get("Comms", "Radio"),
      usb: get("Comms", "USB"),
    },
    features: {
      sensors: get("Features", "Sensors"),
      other: get("Features", "Other") || get("Misc", "Other"),
    },
    battery: {
      type: get("Battery", "Type"),
      capacity: extractBatteryCapacity(get("Battery", "Type")),
      charging: get("Battery", "Charging"),
      wirelessCharging: extractWirelessCharging(get("Battery", "Charging")),
      reverseCharging: extractReverseCharging(get("Battery", "Charging")),
    },
    misc: {
      colors: get("Misc", "Colors"),
      models: get("Misc", "Models"),
      sarUs: get("Misc", "SAR US") || get("Misc", "SAR"),
      sarEu: get("Misc", "SAR EU"),
      price: get("Misc", "Price"),
    },
  };
}

/**
 * Convert fetched phone data to our Phone model
 */
export function convertToPhone(fetched: FetchedPhone, price = 0): Phone {
  const fullSpecs = convertToFullSpecs(fetched.specs);
  const brandSlug = fetched.brand.toLowerCase().replace(/\s+/g, "-");
  const phoneSlug = fetched.slug
    .replace(new RegExp(`^${brandSlug}-`, "i"), "")
    .replace(/[^a-z0-9-]/g, "");

  return {
    brand: brandSlug === "apple" ? "iphone" : brandSlug,
    slug: phoneSlug || fetched.slug,
    name: fetched.name,
    price,
    images: fetched.imageUrl ? [fetched.imageUrl] : [],
    specs: {
      display: fullSpecs.display.type || fullSpecs.display.size || "-",
      chipset: fullSpecs.platform.chipset || "-",
      camera: fullSpecs.mainCamera.main[0]?.resolution || "-",
      battery: fullSpecs.battery.capacity || "-",
    },
    fullSpecs,
    issues: [],
    guides: [],
    popularity: 50,
  };
}

// ---- Helper parsers ----

function extractRam(internal: string): string {
  const match = internal.match(/(\d+)\s*GB\s*RAM/i);
  return match ? `${match[1]} GB` : "";
}

function extractStorageType(internal: string): string {
  if (internal.includes("UFS 4")) return "UFS 4.0";
  if (internal.includes("UFS 3")) return "UFS 3.1";
  if (internal.includes("UFS 2")) return "UFS 2.2";
  if (internal.includes("NVMe")) return "NVMe";
  return "";
}

function extractBatteryCapacity(type: string): string {
  const match = type.match(/(\d+)\s*mAh/i);
  return match ? `${match[1]} mAh` : "";
}

function extractWirelessCharging(charging: string): string {
  const match = charging.match(/(\d+W?\s*wireless[^,]*)/i);
  return match ? match[1].trim() : "";
}

function extractReverseCharging(charging: string): string {
  const match = charging.match(/([\d.]+W?\s*reverse[^,]*)/i);
  return match ? match[1].trim() : "";
}

function parseMainCameraModules(cameraSection: Record<string, string>) {
  const modules: { resolution: string; aperture?: string; focalLength?: string; features?: string }[] = [];

  for (const [key, val] of Object.entries(cameraSection)) {
    if (key === "Features" || key === "Video") continue;
    const mpMatch = val.match(/(\d+)\s*MP/i);
    if (mpMatch) {
      const apertureMatch = val.match(/(f\/[\d.]+)/);
      const focalMatch = val.match(/(\d+mm[^,]*)/);
      modules.push({
        resolution: `${mpMatch[1]} MP`,
        aperture: apertureMatch?.[1],
        focalLength: focalMatch?.[1],
        features: val.replace(/^\d+\s*MP[^,]*,?\s*/, "").trim() || undefined,
      });
    }
  }

  if (modules.length === 0) {
    modules.push({ resolution: "-" });
  }

  return modules;
}

function parseSelfieCameraModules(cameraSection: Record<string, string>) {
  return parseMainCameraModules(cameraSection);
}
