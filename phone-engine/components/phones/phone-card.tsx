import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, BRAND_NAMES } from "@/lib/utils";
import type { Phone } from "@/types";

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Link href={`/phones/${phone.brand}/${phone.slug}`}>
      <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={phone.images[0]}
            alt={phone.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-3 start-3">
            <Badge>{BRAND_NAMES[phone.brand] || phone.brand}</Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Name */}
          <h3 className="font-cairo font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
            {phone.name}
          </h3>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              {phone.specs.camera}
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              {phone.specs.battery}
            </Badge>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400 font-cairo">
              {formatPrice(phone.price)}
            </span>
            <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:-translate-x-1 transition-all rtl:rotate-180 rtl:group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
