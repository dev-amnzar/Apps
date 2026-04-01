import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function GuideTypeLoading() {
  return (
    <Container className="py-8">
      <Skeleton className="mb-6 h-5 w-48" />
      <Skeleton className="mb-2 h-9 w-44" />
      <Skeleton className="mb-8 h-5 w-28" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl" />
        ))}
      </div>
    </Container>
  );
}
