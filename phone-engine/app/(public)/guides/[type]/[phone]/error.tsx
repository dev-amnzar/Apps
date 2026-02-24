"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function GuideError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-amber-500" />
        <Heading size="h3" className="mb-2">
          الدليل غير موجود
        </Heading>
        <Text className="mb-6">
          عذراً، لم نتمكن من العثور على هذا الدليل.
        </Text>
        <div className="flex gap-3">
          <Button onClick={reset}>إعادة المحاولة</Button>
          <Button variant="outline" asChild>
            <Link href="/guides" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              كل الأدلة
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
