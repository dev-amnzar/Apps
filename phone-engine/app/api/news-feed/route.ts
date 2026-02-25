import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { fetchAllFeeds, fetchFeed, NEWS_SOURCES } from "@/lib/auto/rss-aggregator";
import { translateNewsTitle, generateSlug } from "@/lib/auto/content-generator";

const newsPath = path.join(process.cwd(), "data", "news.json");

interface Article {
  slug: string;
  type: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  relatedPhones: string[];
  sourceUrl?: string;
  sourceName?: string;
}

async function readArticles(): Promise<Article[]> {
  const raw = await fs.readFile(newsPath, "utf-8");
  return JSON.parse(raw).articles;
}

async function writeArticles(articles: Article[]) {
  await fs.writeFile(newsPath, JSON.stringify({ articles }, null, 2), "utf-8");
}

// GET /api/news-feed - Fetch latest news from RSS feeds
// GET /api/news-feed?source=android-authority - Fetch from specific source
export async function GET(request: NextRequest) {
  const sourceName = request.nextUrl.searchParams.get("source");

  try {
    let items;

    if (sourceName) {
      const source = NEWS_SOURCES.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, "-") === sourceName
      );
      if (!source) {
        return NextResponse.json(
          { error: "Source not found", available: NEWS_SOURCES.map((s) => s.name) },
          { status: 404 }
        );
      }
      items = await fetchFeed(source);
    } else {
      items = await fetchAllFeeds();
    }

    // Convert to preview articles
    const previews = items.map((item) => ({
      title: item.title,
      titleAr: translateNewsTitle(item.title),
      description: item.description,
      source: item.source,
      date: item.pubDate,
      image: item.image,
      link: item.link,
      slug: generateSlug(item.title),
      category: item.category || "news",
    }));

    return NextResponse.json({
      count: previews.length,
      sources: NEWS_SOURCES.map((s) => ({
        name: s.name,
        nameAr: s.nameAr,
        slug: s.name.toLowerCase().replace(/\s+/g, "-"),
      })),
      items: previews,
    });
  } catch (error) {
    console.error("News feed error:", error);
    return NextResponse.json({ error: "Failed to fetch feeds" }, { status: 500 });
  }
}

// POST /api/news-feed - Import a news item into the database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { item } = body as {
      item: {
        title: string;
        titleAr: string;
        description: string;
        content?: string;
        contentAr?: string;
        image?: string;
        date: string;
        source: string;
        link: string;
        category?: string;
        tags?: string[];
      };
    };

    if (!item || !item.title) {
      return NextResponse.json({ error: "Invalid item data" }, { status: 400 });
    }

    const articles = await readArticles();
    const slug = generateSlug(item.title);

    // Check for duplicate
    if (articles.find((a) => a.slug === slug)) {
      return NextResponse.json({ error: "Article already exists" }, { status: 409 });
    }

    const newArticle: Article = {
      slug,
      type: item.category || "news",
      title: item.title,
      titleAr: item.titleAr || translateNewsTitle(item.title),
      excerpt: item.description,
      excerptAr: item.titleAr || translateNewsTitle(item.description),
      content: item.content || item.description,
      contentAr: item.contentAr || item.titleAr || translateNewsTitle(item.description),
      author: `${item.source} / Phone Engine`,
      date: new Date(item.date).toISOString().split("T")[0],
      image: item.image || "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      tags: item.tags || extractTags(item.title),
      relatedPhones: [],
      sourceUrl: item.link,
      sourceName: item.source,
    };

    articles.unshift(newArticle);
    await writeArticles(articles);

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error) {
    console.error("News POST error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function extractTags(title: string): string[] {
  const tags: string[] = [];
  const brands = ["samsung", "apple", "iphone", "google", "pixel", "xiaomi", "oneplus", "huawei", "oppo", "vivo", "realme", "nothing", "motorola"];
  const lower = title.toLowerCase();
  for (const brand of brands) {
    if (lower.includes(brand)) tags.push(brand);
  }
  if (lower.includes("review")) tags.push("مراجعة");
  if (lower.includes("camera")) tags.push("كاميرا");
  if (lower.includes("battery")) tags.push("بطارية");
  if (lower.includes("update")) tags.push("تحديث");
  if (lower.includes("leak") || lower.includes("rumor")) tags.push("تسريبات");
  return tags;
}
