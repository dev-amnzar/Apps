import { Container } from "@/components/ui/container";

export default function PhonesLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="skeleton h-4 w-48" />

        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="skeleton h-10 w-48" />
          <div className="skeleton h-5 w-72" />
        </div>

        {/* Search & Filter skeleton */}
        <div className="flex gap-4">
          <div className="skeleton h-11 flex-1 max-w-md" />
          <div className="skeleton h-11 w-32" />
        </div>

        {/* Filter chips skeleton */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-24 rounded-full" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton aspect-square rounded-2xl" />
              <div className="space-y-2 p-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="flex gap-2">
                  <div className="skeleton h-5 w-16 rounded-full" />
                  <div className="skeleton h-5 w-16 rounded-full" />
                </div>
                <div className="skeleton h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
