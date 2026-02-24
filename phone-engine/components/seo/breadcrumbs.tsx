import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/container";
import { JsonLd } from "./json-ld";
import { getBreadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50">
        <Container>
          <ol className="flex items-center gap-1 py-3 text-sm">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400"
              >
                <Home className="h-4 w-4" />
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center gap-1">
                <ChevronLeft className="h-3 w-3 text-gray-400" />
                {index === items.length - 1 ? (
                  <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-500 transition-colors hover:text-brand-600 dark:text-gray-400"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </nav>
    </>
  );
}
