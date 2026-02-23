import { Container } from "@/components/ui/container";

export default function PhoneDetailLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8 animate-pulse">
        <div className="skeleton h-4 w-64" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery skeleton */}
          <div className="skeleton aspect-square rounded-2xl" />

          {/* Info skeleton */}
          <div className="space-y-6">
            <div className="skeleton h-5 w-24 rounded-full" />
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-6 w-32" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="skeleton h-10 w-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-16" />
                    <div className="skeleton h-5 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
