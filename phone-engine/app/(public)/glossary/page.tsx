import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { BookA, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { generatePageMetadata } from "@/components/seo/meta-tags";

export const metadata: Metadata = generatePageMetadata({
  title: "قاموس المصطلحات التقنية - Glossary",
  description: "قاموس شامل لجميع المصطلحات التقنية المتعلقة بالهواتف الذكية. تعرف على معاني المواصفات والتقنيات.",
  path: "/glossary",
});

interface GlossaryTerm {
  term: string;
  termAr: string;
  definition: string;
  definitionAr: string;
  category: string;
}

interface GlossaryCategory {
  slug: string;
  name: string;
  nameAr: string;
}

async function getGlossaryData() {
  const raw = await fs.readFile(path.join(process.cwd(), "data", "glossary.json"), "utf-8");
  return JSON.parse(raw) as { terms: GlossaryTerm[]; categories: GlossaryCategory[] };
}

const categoryColors: Record<string, string> = {
  network: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  display: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  processor: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  memory: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  camera: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  battery: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  connectivity: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  body: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  sound: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  misc: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export default async function GlossaryPage() {
  const { terms, categories } = await getGlossaryData();

  // Group by category
  const grouped = categories.map((cat) => ({
    ...cat,
    terms: terms.filter((t) => t.category === cat.slug),
  }));

  return (
    <>
      <Breadcrumbs items={[{ label: "القاموس التقني", href: "/glossary" }]} />
      <Container>
        <div className="py-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950">
              <BookA className="h-8 w-8 text-brand-600 dark:text-brand-400" />
            </div>
            <Heading size="h1">القاموس التقني</Heading>
            <Text className="mt-2 max-w-2xl mx-auto">
              دليلك الشامل لفهم جميع المصطلحات التقنية المتعلقة بالهواتف الذكية.
              يحتوي على {terms.length} مصطلح في {categories.length} فئات.
            </Text>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-opacity hover:opacity-80 ${categoryColors[cat.slug] ?? categoryColors.misc}`}
              >
                {cat.nameAr}
              </a>
            ))}
          </div>

          {/* Terms by Category */}
          <div className="space-y-10">
            {grouped.map((group) => (
              <section key={group.slug} id={group.slug}>
                <div className="mb-4 flex items-center gap-3">
                  <Heading size="h3">{group.nameAr}</Heading>
                  <Badge variant="secondary">{group.terms.length} مصطلح</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.terms.map((term) => (
                    <Card key={term.term} className="transition-all hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white">{term.term}</h4>
                            <p className="text-sm text-brand-600 dark:text-brand-400">{term.termAr}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${categoryColors[term.category] ?? categoryColors.misc}`}>
                            {group.nameAr}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {term.definitionAr}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                          {term.definition}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
