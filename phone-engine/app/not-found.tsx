import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 text-8xl font-bold text-gray-200 dark:text-gray-800">404</div>
        <Heading size="h2" className="mb-2">
          الصفحة غير موجودة
        </Heading>
        <Text className="mb-8 max-w-md">
          عذراً، الصفحة التي تبحث عنها غير موجودة. قد تكون قد نقلت أو حذفت.
        </Text>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              الرئيسية
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/phones" className="gap-2">
              <Search className="h-4 w-4" />
              تصفح الهواتف
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
