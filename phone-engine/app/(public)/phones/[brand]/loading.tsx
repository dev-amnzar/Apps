import { Container } from "@/components/ui/container";

export default function BrandLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8 animate-pulse">
        <div className="skeleton h-4 w-48" />
        <div className="space-y-3">
          <div className="skeleton h-10 w-48" />
          <div className="skeleton h-5 w-64" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
