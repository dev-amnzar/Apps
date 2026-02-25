"use client";

import * as React from "react";
import {
  Download,
  Rss,
  Smartphone,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  Globe,
  FileJson,
  ArrowRight,
} from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ApiBrand {
  slug: string;
  name: string;
}

interface ApiPhone {
  slug: string;
  name: string;
  image?: string;
}

interface ImportedPhone {
  brand: string;
  slug: string;
  name: string;
  nameAr?: string;
  price: number;
  specs: { display: string; chipset: string; camera: string; battery: string };
}

interface NewsItem {
  title: string;
  titleAr: string;
  description: string;
  source: string;
  date: string;
  image?: string;
  link: string;
  slug: string;
  category: string;
}

type TabType = "phones" | "news" | "json";

export default function ImportPage() {
  const [tab, setTab] = React.useState<TabType>("phones");

  return (
    <div className="space-y-6">
      <div>
        <Heading size="h2">استيراد البيانات التلقائي</Heading>
        <Text className="mt-1">جلب بيانات الهواتف والأخبار تلقائياً من مصادر خارجية</Text>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 dark:border-gray-800">
        {[
          { key: "phones" as const, label: "استيراد هواتف", icon: Smartphone },
          { key: "news" as const, label: "جلب الأخبار", icon: Rss },
          { key: "json" as const, label: "استيراد JSON", icon: FileJson },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === key
                ? "border-b-2 border-brand-600 text-brand-600 dark:text-brand-400"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === "phones" && <PhoneImportTab />}
      {tab === "news" && <NewsImportTab />}
      {tab === "json" && <JsonImportTab />}
    </div>
  );
}

// ============ Phone Import Tab ============
function PhoneImportTab() {
  const [brands, setBrands] = React.useState<ApiBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = React.useState("");
  const [phones, setPhones] = React.useState<ApiPhone[]>([]);
  const [loading, setLoading] = React.useState("");
  const [preview, setPreview] = React.useState<ImportedPhone | null>(null);
  const [status, setStatus] = React.useState<{ type: "success" | "error"; msg: string } | null>(null);

  const loadBrands = async () => {
    setLoading("brands");
    const res = await fetch("/api/import?action=brands");
    const data = await res.json();
    setBrands(data.brands || []);
    setLoading("");
  };

  const loadPhones = async (brand: string) => {
    setSelectedBrand(brand);
    setLoading("phones");
    const res = await fetch(`/api/import?action=phones&brand=${brand}`);
    const data = await res.json();
    setPhones(data.phones || []);
    setLoading("");
  };

  const previewPhone = async (slug: string) => {
    setLoading(`preview-${slug}`);
    setPreview(null);
    const res = await fetch(`/api/import?action=specs&slug=${slug}`);
    const data = await res.json();
    if (data.phone) setPreview(data.phone);
    setLoading("");
  };

  const importPhone = async () => {
    if (!preview) return;
    setLoading("importing");
    setStatus(null);
    const res = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: preview, overwrite: true }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus({ type: "success", msg: `تم استيراد ${preview.name} بنجاح (${data.action})` });
    } else {
      setStatus({ type: "error", msg: data.error || "حدث خطأ" });
    }
    setLoading("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: Browse */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-brand-600" />
            استعراض الهواتف من الإنترنت
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1: Load brands */}
          {brands.length === 0 ? (
            <Button onClick={loadBrands} disabled={loading === "brands"} className="gap-2">
              {loading === "brands" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              جلب العلامات التجارية
            </Button>
          ) : (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium">اختر العلامة التجارية</label>
                <div className="flex flex-wrap gap-2">
                  {brands.slice(0, 20).map((b) => (
                    <button
                      key={b.slug}
                      onClick={() => loadPhones(b.slug)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        selectedBrand === b.slug
                          ? "bg-brand-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Phone list */}
              {loading === "phones" ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" /> جاري جلب الهواتف...
                </div>
              ) : phones.length > 0 ? (
                <div className="max-h-72 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-gray-700">
                  {phones.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => previewPhone(p.slug)}
                      disabled={loading.startsWith("preview")}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="font-medium">{p.name}</span>
                      {loading === `preview-${p.slug}` ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </CardContent>
      </Card>

      {/* Right: Preview & Import */}
      <Card>
        <CardHeader>
          <CardTitle>معاينة واستيراد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {preview ? (
            <>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <h4 className="mb-1 font-bold text-gray-900 dark:text-white">{preview.name}</h4>
                {preview.nameAr && (
                  <p className="mb-2 text-sm text-brand-600">{preview.nameAr}</p>
                )}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">الشاشة:</span> {preview.specs.display || "-"}
                  </div>
                  <div>
                    <span className="font-medium">المعالج:</span> {preview.specs.chipset || "-"}
                  </div>
                  <div>
                    <span className="font-medium">الكاميرا:</span> {preview.specs.camera || "-"}
                  </div>
                  <div>
                    <span className="font-medium">البطارية:</span> {preview.specs.battery || "-"}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="mb-1 block text-xs font-medium">السعر (USD)</label>
                  <Input
                    type="number"
                    value={preview.price}
                    onChange={(e) =>
                      setPreview((prev) =>
                        prev ? { ...prev, price: parseInt(e.target.value) || 0 } : null
                      )
                    }
                    className="h-8 text-sm"
                  />
                </div>
              </div>

              <Button onClick={importPhone} disabled={loading === "importing"} className="w-full gap-2">
                {loading === "importing" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                استيراد إلى قاعدة البيانات
              </Button>
            </>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-200 py-12 text-center dark:border-gray-700">
              <Search className="mx-auto h-8 w-8 text-gray-300" />
              <Text className="mt-2">اختر هاتفاً من القائمة لمعاينته</Text>
            </div>
          )}

          {status && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {status.msg}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ============ News Import Tab ============
function NewsImportTab() {
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [importing, setImporting] = React.useState<string | null>(null);
  const [importedSlugs, setImportedSlugs] = React.useState<Set<string>>(new Set());

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news-feed");
      const data = await res.json();
      setNews(data.items || []);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const importArticle = async (item: NewsItem) => {
    setImporting(item.slug);
    try {
      const res = await fetch("/api/news-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
      });
      if (res.ok) {
        setImportedSlugs((prev) => new Set(prev).add(item.slug));
      }
    } catch {
      // ignore
    }
    setImporting(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Rss className="h-5 w-5 text-orange-500" />
          أخبار الهواتف من RSS
        </CardTitle>
        <Button onClick={fetchNews} disabled={loading} size="sm" className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          جلب الأخبار
        </Button>
      </CardHeader>
      <CardContent>
        {news.length > 0 ? (
          <div className="max-h-[500px] space-y-3 overflow-y-auto">
            {news.map((item) => {
              const imported = importedSlugs.has(item.slug);
              return (
                <div
                  key={item.slug}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                    imported
                      ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{item.source}</Badge>
                      <Badge variant={item.category === "review" ? "default" : "outline"} className="text-xs">
                        {item.category === "review" ? "مراجعة" : "أخبار"}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-600 dark:text-brand-400 line-clamp-1">
                      {item.titleAr}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-1">{item.description}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(item.date).toLocaleDateString("ar-SA")}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={imported ? "outline" : "default"}
                    disabled={importing === item.slug || imported}
                    onClick={() => importArticle(item)}
                    className="shrink-0"
                  >
                    {importing === item.slug ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : imported ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      "استيراد"
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-200 py-12 text-center dark:border-gray-700">
            <Rss className="mx-auto h-8 w-8 text-gray-300" />
            <Text className="mt-2">اضغط "جلب الأخبار" لجلب آخر الأخبار من 6 مصادر</Text>
            <p className="mt-1 text-xs text-gray-400">
              Android Authority, 9to5Google, 9to5Mac, XDA, The Verge, PhoneArena
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============ JSON Import Tab ============
function JsonImportTab() {
  const [jsonInput, setJsonInput] = React.useState("");
  const [status, setStatus] = React.useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleImport = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const data = JSON.parse(jsonInput);

      // Support both single phone and array of phones
      const phones = Array.isArray(data) ? data : data.phones ? data.phones : [data];

      let imported = 0;
      let errors = 0;

      for (const phone of phones) {
        const res = await fetch("/api/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, overwrite: true }),
        });
        if (res.ok) imported++;
        else errors++;
      }

      setStatus({
        type: imported > 0 ? "success" : "error",
        msg: `تم استيراد ${imported} هاتف${errors > 0 ? ` (${errors} أخطاء)` : ""}`,
      });
    } catch {
      setStatus({ type: "error", msg: "صيغة JSON غير صالحة" });
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5 text-blue-500" />
          استيراد من JSON
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">الصق بيانات JSON للهاتف أو مجموعة هواتف</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`{\n  "brand": "samsung",\n  "slug": "s25-ultra",\n  "name": "Samsung Galaxy S25 Ultra",\n  "price": 1299,\n  "specs": { ... },\n  "fullSpecs": { ... }\n}`}
            className="h-48 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900"
            dir="ltr"
          />
        </div>

        <Button onClick={handleImport} disabled={loading || !jsonInput.trim()} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          استيراد
        </Button>

        {status && (
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {status.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {status.msg}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
