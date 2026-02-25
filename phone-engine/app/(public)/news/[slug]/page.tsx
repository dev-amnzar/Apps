import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { generatePageMetadata } from "@/components/seo/meta-tags";

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
  return JSON.parse(raw).articles;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return generatePageMetadata({
    title: article.titleAr,
    description: article.excerptAr,
    path: `/news/${params.slug}`,
    image: article.image,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "الأخبار والمراجعات", href: "/news" },
          { label: article.titleAr, href: `/news/${article.slug}` },
        ]}
      />
      <Container>
        <article className="py-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant={article.type === "review" ? "default" : "secondary"}>
                {article.type === "review" ? "مراجعة" : "أخبار"}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.date).toLocaleDateString("ar-SA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <User className="h-3.5 w-3.5" />
                {article.author}
              </span>
            </div>

            <Heading size="h1" className="mb-4">{article.titleAr}</Heading>
            <Text size="lg" className="mb-6 text-gray-600 dark:text-gray-400">
              {article.excerptAr}
            </Text>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto mb-8 aspect-video max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={article.image}
              alt={article.titleAr}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          {/* Content */}
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {article.contentAr}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
              <Tag className="h-4 w-4 text-gray-400" />
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Related Phones */}
            {article.relatedPhones.length > 0 && (
              <div className="mt-6 rounded-xl bg-brand-50/50 p-4 dark:bg-brand-950/20">
                <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">هواتف ذات صلة:</p>
                <div className="flex flex-wrap gap-2">
                  {article.relatedPhones.map((phoneKey) => {
                    const parts = phoneKey.split("-");
                    const brand = parts[0];
                    const slug = parts.slice(1).join("-");
                    return (
                      <Button key={phoneKey} variant="outline" size="sm" asChild>
                        <Link href={`/phones/${brand}/${slug}`}>{phoneKey}</Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mx-auto mt-12 max-w-4xl">
              <Heading size="h3" className="mb-6">مقالات ذات صلة</Heading>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((a) => (
                  <Link key={a.slug} href={`/news/${a.slug}`}>
                    <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                      <div className="relative aspect-video">
                        <Image src={a.image} alt={a.titleAr} fill className="rounded-t-xl object-cover" sizes="33vw" />
                      </div>
                      <CardContent className="p-3">
                        <h4 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-white">{a.titleAr}</h4>
                        <span className="mt-1 block text-xs text-gray-400">{new Date(a.date).toLocaleDateString("ar-SA")}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/news" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                العودة لجميع الأخبار
              </Link>
            </Button>
          </div>
        </article>
      </Container>
    </>
  );
}
