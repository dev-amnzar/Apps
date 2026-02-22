import Link from 'next/link';
import { SearchX, Home, Smartphone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <SearchX className="h-10 w-10 text-gray-400" />
      </div>
      <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
        الصفحة غير موجودة
      </h2>
      <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
        عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            الصفحة الرئيسية
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/phones">
            <Smartphone className="h-4 w-4" />
            تصفح الهواتف
          </Link>
        </Button>
      </div>
    </Container>
  );
}
