import { Container } from "@/components/ui/container";

export default function GuideTypeLoading() {
  return (
    <Container>
      <div className="py-8">
        <div className="skeleton mb-2 h-9 w-40 rounded-lg" />
        <div className="skeleton mb-8 h-5 w-56 rounded-lg" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <div className="mb-3 flex gap-2">
                <div className="skeleton h-9 w-9 rounded-lg" />
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
              <div className="skeleton mb-2 h-5 w-3/4 rounded" />
              <div className="skeleton mb-3 h-4 w-full rounded" />
              <div className="skeleton h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
