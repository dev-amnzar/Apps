import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container>
      <div className="py-12">
        <div className="skeleton mx-auto mb-6 h-10 w-64 rounded-lg" />
        <div className="skeleton mx-auto mb-8 h-5 w-96 rounded-lg" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="skeleton aspect-square" />
              <div className="p-4">
                <div className="skeleton mb-2 h-5 w-3/4 rounded" />
                <div className="skeleton mb-3 h-4 w-1/2 rounded" />
                <div className="skeleton h-6 w-1/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
