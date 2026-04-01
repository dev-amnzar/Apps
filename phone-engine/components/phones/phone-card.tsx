import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatPrice, brandDisplayName } from '@/lib/utils';
import type { Phone } from '@/types';

interface PhoneCardProps {
  phone: Phone;
  className?: string;
  featured?: boolean;
}

export function PhoneCard({ phone, className, featured = false }: PhoneCardProps) {
  const href = `/phones/${phone.brand}/${phone.slug}`;

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5',
        featured && 'ring-2 ring-brand-500/20',
        className
      )}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-gray-800">
          <Image
            src={phone.images[0]}
            alt={phone.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {featured && (
            <div className="absolute start-2 top-2">
              <Badge variant="default" className="text-xs">مميز</Badge>
            </div>
          )}
          {phone.rating && (
            <div className="absolute end-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-amber-600 backdrop-blur-sm dark:bg-gray-900/90">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {phone.rating}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-1 flex items-center gap-1.5">
          <Badge variant="secondary" className="text-xs">
            {brandDisplayName(phone.brand)}
          </Badge>
        </div>

        <Link href={href}>
          <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400 line-clamp-2">
            {phone.name}
          </h3>
        </Link>

        <div className="mb-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span>الشاشة</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{phone.specs.display.split(' ').slice(0, 2).join(' ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>المعالج</span>
            <span className="font-medium text-gray-700 dark:text-gray-300 truncate ms-2 max-w-[120px]">{phone.specs.chipset}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
            {formatPrice(phone.price)}
          </span>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" asChild>
            <Link href={href}>
              التفاصيل
              <ChevronLeft className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
