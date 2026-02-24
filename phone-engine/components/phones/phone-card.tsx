import Link from "next/link";
import Image from "next/image";
import type { Phone } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Link href={`/phones/${phone.brand}/${phone.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={phone.images[0]}
            alt={phone.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute start-3 top-3" variant="default">
            {phone.brand === "iphone" ? "iPhone" : phone.brand.charAt(0).toUpperCase() + phone.brand.slice(1)}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-1 dark:text-white">
            {phone.name}
          </h3>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            {phone.specs.display} • {phone.specs.camera}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {formatPrice(phone.price)}
            </span>
            <Badge variant="secondary" className="text-xs">
              {phone.specs.chipset.split(" ").slice(0, 2).join(" ")}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
