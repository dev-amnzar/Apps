import { Container } from "@/components/ui/container";

export default function GuidesLoading() {
  return (
    <Container>
      <div className="py-8">
        <div className="skeleton mb-2 h-9 w-48 rounded-lg" />
        <div className="skeleton mb-8 h-5 w-72 rounded-lg" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <div className="mb-4 flex gap-3">
                <div className="skeleton h-12 w-12 rounded-xl" />
                <div className="skeleton h-6 w-16 rounded-full" />
              </div>
              <div className="skeleton mb-2 h-6 w-3/4 rounded" />
              <div className="skeleton mb-4 h-4 w-full rounded" />
              <div className="skeleton h-5 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
