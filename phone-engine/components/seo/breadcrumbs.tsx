import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "./json-ld";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: "الرئيسية", href: "/" }, ...items];

  return (
    <>
      <BreadcrumbJsonLd items={allItems} />
      <nav aria-label="التنقل التفصيلي" className="py-4 border-b border-gray-100 dark:border-gray-800">
        <Container>
          <ol className="flex items-center flex-wrap gap-1 text-sm font-cairo">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-1">
                  {index === 0 && (
                    <Home className="h-3.5 w-3.5 text-gray-400 ms-1" />
                  )}
                  {index > 0 && (
                    <ChevronLeft className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 rtl:rotate-180" />
                  )}
                  {isLast ? (
                    <span className="text-gray-900 dark:text-white font-medium">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>
    </>
  );
}
