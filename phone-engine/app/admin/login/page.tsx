"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn } from "lucide-react";
import { TOKEN_KEY } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        router.push("/admin");
      } else {
        setError(data.error || "كلمة المرور غير صحيحة");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950">
            <Lock className="h-7 w-7 text-brand-600 dark:text-brand-400" />
          </div>
          <CardTitle>
            <Heading size="h3">تسجيل الدخول</Heading>
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            أدخل كلمة المرور للوصول إلى لوحة التحكم
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <LogIn className="h-4 w-4" />
              {loading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            كلمة المرور الافتراضية: admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
