import { Container } from "@/components/ui/container";

export default function PhonesLoading() {
  return (
    <Container>
      <div className="py-8">
        <div className="skeleton mb-2 h-9 w-48 rounded-lg" />
        <div className="skeleton mb-8 h-5 w-72 rounded-lg" />
        <div className="skeleton mb-6 h-10 w-full max-w-sm rounded-lg" />
        <div className="mb-6 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
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
