'use client';

import Link from 'next/link';
import { BookOpen, Home, RefreshCw } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  reset: () => void;
}

export default function GuideError({ reset }: ErrorProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <BookOpen className="h-8 w-8 text-gray-400" />
      </div>
      <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        الدليل غير موجود
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        لم نتمكن من العثور على هذا الدليل.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4" />
          إعادة المحاولة
        </Button>
        <Button variant="outline" asChild>
          <Link href="/guides">
            <BookOpen className="h-4 w-4" />
            كل الأدلة
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            الرئيسية
          </Link>
        </Button>
      </div>
    </Container>
  );
}
