"use client";

import * as React from "react";
import Link from "next/link";
import { Smartphone, BookOpen, Tags, TrendingUp, Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/stat-card";

interface DashboardData {
  phoneCount: number;
  guideCount: number;
  brandCount: number;
  recentPhones: { name: string; brand: string; slug: string; price: number }[];
  brandStats: { name: string; count: number }[];
}

export default function AdminDashboardPage() {
  const [data, setData] = React.useState<DashboardData | null>(null);

  React.useEffect(() => {
    fetch("/api/phones")
      .then((r) => r.json())
      .then((phones) => {
        fetch("/api/guides")
          .then((r) => r.json())
          .then((guides) => {
            const brandMap = new Map<string, number>();
            phones.forEach((p: { brand: string }) => {
              brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
            });
            setData({
              phoneCount: phones.length,
              guideCount: guides.length,
              brandCount: brandMap.size,
              recentPhones: phones.slice(0, 5),
              brandStats: Array.from(brandMap.entries()).map(([name, count]) => ({ name, count })),
            });
          });
      });
  }, []);

  if (!data) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-9 w-48 rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading size="h2">لوحة التحكم</Heading>
          <Text className="mt-1">مرحباً بك في لوحة إدارة Phone Engine</Text>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/admin/phones/new" className="gap-1">
              <Plus className="h-4 w-4" />
              هاتف جديد
            </Link>
          </Button>
          <Button variant="outline" asChild size="sm">
            <Link href="/admin/guides/new" className="gap-1">
              <Plus className="h-4 w-4" />
              دليل جديد
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="الهواتف" value={data.phoneCount} icon={Smartphone} href="/admin/phones" />
        <StatCard title="الأدلة" value={data.guideCount} icon={BookOpen} href="/admin/guides" color="text-green-600" />
        <StatCard title="العلامات التجارية" value={data.brandCount} icon={Tags} href="/admin/phones" color="text-purple-600" />
        <StatCard title="الصفحات المولدة" value={data.phoneCount + data.guideCount + data.brandCount + 3} icon={TrendingUp} href="/admin" color="text-amber-600" />
      </div>

      {/* Recent & Brands */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Phones */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>آخر الهواتف المضافة</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/phones">عرض الكل</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentPhones.map((phone) => (
                <div
                  key={`${phone.brand}-${phone.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{phone.name}</p>
                    <p className="text-xs text-gray-500">{phone.brand}</p>
                  </div>
                  <Badge variant="secondary">${phone.price}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Stats */}
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات العلامات التجارية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.brandStats.map((brand) => (
                <div key={brand.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                    {brand.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${(brand.count / data.phoneCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{brand.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
