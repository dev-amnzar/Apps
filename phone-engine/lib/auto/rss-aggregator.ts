/**
 * RSS News Aggregator
 * Fetches and parses RSS feeds from tech news sources
 * and converts them to our article format
 */

export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  source: string;
  category?: string;
}

export interface NewsSource {
  name: string;
  nameAr: string;
  url: string;
  type: "rss" | "atom";
  category: "news" | "review";
}

// Public tech news RSS feeds
export const NEWS_SOURCES: NewsSource[] = [
  {
    name: "Android Authority",
    nameAr: "أندرويد أوثوريتي",
    url: "https://www.androidauthority.com/feed/",
    type: "rss",
    category: "news",
  },
  {
    name: "9to5Google",
    nameAr: "9to5Google",
    url: "https://9to5google.com/feed/",
    type: "rss",
    category: "news",
  },
  {
    name: "9to5Mac",
    nameAr: "9to5Mac",
    url: "https://9to5mac.com/feed/",
    type: "rss",
    category: "news",
  },
  {
    name: "XDA Developers",
    nameAr: "XDA Developers",
    url: "https://www.xda-developers.com/feed/",
    type: "rss",
    category: "news",
  },
  {
    name: "The Verge - Mobile",
    nameAr: "ذا فيرج - موبايل",
    url: "https://www.theverge.com/rss/index.xml",
    type: "atom",
    category: "news",
  },
  {
    name: "PhoneArena",
    nameAr: "فون أرينا",
    url: "https://www.phonearena.com/feed",
    type: "rss",
    category: "review",
  },
];

/**
 * Parse RSS XML into items
 */
function parseRssXml(xml: string, source: string): RssItem[] {
  const items: RssItem[] = [];

  // Simple XML regex parser (works for RSS 2.0)
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractTag(itemXml, "title");
    const link = extractTag(itemXml, "link");
    const description = extractTag(itemXml, "description");
    const pubDate = extractTag(itemXml, "pubDate");

    // Try to extract image from various sources
    const image =
      extractMediaContent(itemXml) ||
      extractEnclosure(itemXml) ||
      extractImageFromContent(itemXml);

    if (title && link) {
      items.push({
        title: cleanHtml(title),
        link,
        description: cleanHtml(description).slice(0, 300),
        pubDate: pubDate || new Date().toISOString(),
        image,
        source,
      });
    }
  }

  return items;
}

/**
 * Parse Atom XML into items
 */
function parseAtomXml(xml: string, source: string): RssItem[] {
  const items: RssItem[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entryXml = match[1];

    const title = extractTag(entryXml, "title");
    const linkMatch = entryXml.match(/<link[^>]*href="([^"]*)"[^>]*\/>/);
    const link = linkMatch ? linkMatch[1] : extractTag(entryXml, "link");
    const summary = extractTag(entryXml, "summary") || extractTag(entryXml, "content");
    const published = extractTag(entryXml, "published") || extractTag(entryXml, "updated");
    const image = extractImageFromContent(entryXml);

    if (title && link) {
      items.push({
        title: cleanHtml(title),
        link,
        description: cleanHtml(summary).slice(0, 300),
        pubDate: published || new Date().toISOString(),
        image,
        source,
      });
    }
  }

  return items;
}

/**
 * Fetch and parse a single RSS/Atom feed
 */
export async function fetchFeed(source: NewsSource): Promise<RssItem[]> {
  try {
    const res = await fetch(source.url, {
      signal: AbortSignal.timeout(15000),
      headers: {
        "User-Agent": "PhoneEngine/1.0 RSS Reader",
        Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${source.name}: ${res.status}`);
      return [];
    }

    const xml = await res.text();

    const items =
      source.type === "atom"
        ? parseAtomXml(xml, source.name)
        : parseRssXml(xml, source.name);

    // Filter for phone-related items only
    return items.filter(isPhoneRelated).map((item) => ({
      ...item,
      category: source.category,
    }));
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error);
    return [];
  }
}

/**
 * Fetch all feeds and merge results
 */
export async function fetchAllFeeds(): Promise<RssItem[]> {
  const results = await Promise.allSettled(NEWS_SOURCES.map(fetchFeed));

  const allItems: RssItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Sort by date, newest first
  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Limit to latest 50 items
  return allItems.slice(0, 50);
}

// ---- Helpers ----

function extractTag(xml: string, tag: string): string {
  // Handle CDATA
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i");
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1];

  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function extractMediaContent(xml: string): string | undefined {
  const match = xml.match(/<media:content[^>]*url="([^"]*)"[^>]*\/>/i);
  return match ? match[1] : undefined;
}

function extractEnclosure(xml: string): string | undefined {
  const match = xml.match(/<enclosure[^>]*url="([^"]*)"[^>]*type="image[^"]*"[^>]*\/>/i);
  return match ? match[1] : undefined;
}

function extractImageFromContent(xml: string): string | undefined {
  const match = xml.match(/<img[^>]*src="([^"]*)"[^>]*\/?>/i);
  return match ? match[1] : undefined;
}

function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// Phone-related keywords filter
const PHONE_KEYWORDS = [
  "phone", "smartphone", "galaxy", "iphone", "pixel", "oneplus", "xiaomi",
  "redmi", "poco", "samsung", "huawei", "oppo", "vivo", "realme", "nothing",
  "motorola", "nokia", "sony", "asus", "rog", "android", "ios", "5g", "camera",
  "battery", "display", "amoled", "oled", "chipset", "snapdragon", "tensor",
  "bionic", "exynos", "mediatek", "dimensity", "flagship", "foldable", "flip",
  "fold", "ultra", "pro max", "launch", "release", "specs", "specification",
  "review", "unbox", "hands-on", "benchmark", "update", "os update",
];

function isPhoneRelated(item: RssItem): boolean {
  const text = `${item.title} ${item.description}`.toLowerCase();
  return PHONE_KEYWORDS.some((keyword) => text.includes(keyword));
}
