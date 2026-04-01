'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Error logging in development only
    }
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        حدث خطأ ما
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        عذراً، حدث خطأ غير متوقع. يرجى المحاولة مجدداً.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset} variant="default">
          <RefreshCw className="h-4 w-4" />
          إعادة المحاولة
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            الرئيسية
          </Link>
        </Button>
      </div>
    </Container>
  );
}
