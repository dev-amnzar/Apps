import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="text-8xl font-bold font-cairo gradient-text">404</div>

        <div className="space-y-2">
          <Heading size="h2">الصفحة غير موجودة</Heading>
          <Text variant="muted" className="max-w-md">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </Text>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              الصفحة الرئيسية
            </Button>
          </Link>
          <Link href="/phones">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              تصفح الهواتف
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
