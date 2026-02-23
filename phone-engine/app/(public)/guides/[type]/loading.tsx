import { Container } from "@/components/ui/container";

export default function GuideTypeLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8 animate-pulse">
        <div className="skeleton h-4 w-48" />
        <div className="space-y-3">
          <div className="skeleton h-10 w-48" />
          <div className="skeleton h-5 w-72" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4 p-6 rounded-2xl border border-gray-100">
              <div className="skeleton h-12 w-12 rounded-xl" />
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
