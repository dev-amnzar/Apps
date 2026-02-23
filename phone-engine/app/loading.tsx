import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-12">
      <div className="space-y-8 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="skeleton h-10 w-64" />
          <div className="skeleton h-5 w-96 max-w-full" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton aspect-square rounded-2xl" />
              <div className="space-y-2 p-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
