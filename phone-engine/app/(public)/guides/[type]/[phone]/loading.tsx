import { Container } from "@/components/ui/container";

export default function GuideLoading() {
  return (
    <Container size="md" className="py-8">
      <div className="space-y-8 animate-pulse">
        <div className="skeleton h-4 w-64" />
        <div className="space-y-3">
          <div className="skeleton h-10 w-3/4" />
          <div className="skeleton h-5 w-full max-w-lg" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-2xl border border-gray-100">
              <div className="skeleton h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="skeleton h-6 w-48" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
