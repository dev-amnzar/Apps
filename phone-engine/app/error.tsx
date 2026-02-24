"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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
    <Container>
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <AlertTriangle className="mb-4 h-16 w-16 text-red-500" />
        <Heading size="h2" className="mb-2">
          حدث خطأ
        </Heading>
        <Text className="mb-6 max-w-md">
          عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
        </Text>
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          إعادة المحاولة
        </Button>
      </div>
    </Container>
  );
}
