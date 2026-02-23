"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function GuideError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-20">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <div className="space-y-2">
          <Heading size="h2">لم يتم العثور على الدليل</Heading>
          <Text variant="muted" className="max-w-md">
            عذراً، الدليل الذي تبحث عنه غير موجود أو تمت إزالته.
          </Text>
        </div>

        <div className="flex gap-3">
          <Button onClick={reset} variant="outline">
            إعادة المحاولة
          </Button>
          <Link href="/guides">
            <Button className="gap-2">
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              تصفح الأدلة
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
