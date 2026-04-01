import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function GuideLoading() {
  return (
    <Container size="lg" className="py-8">
      <Skeleton className="mb-6 h-5 w-72" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-9 w-4/5" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="rounded-xl border p-6 dark:border-gray-800">
            <Skeleton className="mb-6 h-6 w-40" />
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
    </Container>
  );
}
