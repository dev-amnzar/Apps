"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Error({
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
          <Heading size="h2">حدث خطأ غير متوقع</Heading>
          <Text variant="muted" className="max-w-md">
            عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
          </Text>
        </div>

        <Button onClick={reset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          إعادة المحاولة
        </Button>
      </div>
    </Container>
  );
}
