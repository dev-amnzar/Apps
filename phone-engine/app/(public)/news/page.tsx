import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { generatePageMetadata } from "@/components/seo/meta-tags";

export const metadata: Metadata = generatePageMetadata({
  title: "الأخبار والمراجعات - News & Reviews",
  description: "آخر أخبار الهواتف الذكية ومراجعات تفصيلية لأحدث الأجهزة.",
  path: "/news",
});

interface Article {
  slug: string;
  type: "news" | "review";
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
}

async function getArticles(): Promise<Article[]> {
  const raw = await fs.readFile(path.join(process.cwd(), "data", "news.json"), "utf-8");
  const data = JSON.parse(raw);
  return data.articles;
}

export default async function NewsPage() {
  const articles = await getArticles();
  const news = articles.filter((a) => a.type === "news");
  const reviews = articles.filter((a) => a.type === "review");

  return (
    <>
      <Breadcrumbs items={[{ label: "الأخبار والمراجعات", href: "/news" }]} />
      <Container>
        <div className="py-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950">
              <Newspaper className="h-8 w-8 text-brand-600 dark:text-brand-400" />
            </div>
            <Heading size="h1">الأخبار والمراجعات</Heading>
            <Text className="mt-2">آخر أخبار الهواتف الذكية ومراجعات تفصيلية</Text>
          </div>

          {/* Featured Article */}
          {articles[0] && (
            <Link href={`/news/${articles[0].slug}`}>
              <Card className="mb-10 overflow-hidden transition-all hover:shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto">
                    <Image
                      src={articles[0].image}
                      alt={articles[0].titleAr}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="flex flex-col justify-center p-6 md:p-8">
                    <Badge variant={articles[0].type === "review" ? "default" : "secondary"} className="mb-3 w-fit">
                      {articles[0].type === "review" ? "مراجعة" : "أخبار"}
                    </Badge>
                    <Heading size="h2" className="mb-3">{articles[0].titleAr}</Heading>
                    <Text className="mb-4">{articles[0].excerptAr}</Text>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{articles[0].author}</span>
                      <span>{new Date(articles[0].date).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          )}

          {/* Latest News */}
          <section className="mb-12">
            <Heading size="h2" className="mb-6">آخر الأخبار</Heading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <Heading size="h2" className="mb-6">المراجعات</Heading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="relative aspect-video">
          <Image
            src={article.image}
            alt={article.titleAr}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <Badge
            variant={article.type === "review" ? "default" : "secondary"}
            className="absolute start-3 top-3"
          >
            {article.type === "review" ? "مراجعة" : "أخبار"}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            {article.titleAr}
          </h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {article.excerptAr}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{article.author}</span>
            <span>{new Date(article.date).toLocaleDateString("ar-SA")}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
