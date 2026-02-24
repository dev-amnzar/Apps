import { Container } from "@/components/ui/container";

export default function GuideLoading() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-8">
        <div className="mb-3 flex gap-2">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-32 rounded-full" />
        </div>
        <div className="skeleton mb-2 h-10 w-3/4 rounded-lg" />
        <div className="skeleton mb-8 h-5 w-full rounded-lg" />
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1">
                <div className="skeleton mb-2 h-5 w-1/2 rounded" />
                <div className="skeleton h-4 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
