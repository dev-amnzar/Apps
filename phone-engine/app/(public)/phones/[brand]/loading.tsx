import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function BrandLoading() {
  return (
    <Container className="py-8">
      <Skeleton className="mb-2 h-5 w-56" />
      <Skeleton className="mb-2 h-9 w-48" />
      <Skeleton className="mb-8 h-5 w-32" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border p-4 dark:border-gray-800">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </Container>
  );
}
