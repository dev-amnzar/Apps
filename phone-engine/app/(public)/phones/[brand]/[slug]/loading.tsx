import { Container } from "@/components/ui/container";

export default function PhoneDetailLoading() {
  return (
    <Container>
      <div className="py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex gap-2">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-24 rounded-full" />
            </div>
            <div className="skeleton h-10 w-3/4 rounded-lg" />
            <div className="skeleton h-6 w-1/2 rounded-lg" />
            <div className="skeleton h-10 w-32 rounded-lg" />
            <div className="flex gap-3">
              <div className="skeleton h-11 w-32 rounded-lg" />
              <div className="skeleton h-11 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
