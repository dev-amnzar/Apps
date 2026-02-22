'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhoneGalleryProps {
  images: string[];
  name: string;
}

export function PhoneGallery({ images, name }: PhoneGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <Image
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${name} - صورة ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          className="object-contain p-4 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              aria-label="الصورة السابقة"
              className="absolute start-2 top-1/2 -translate-y-1/2 bg-white/80 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:bg-gray-900/80"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              aria-label="الصورة التالية"
              className="absolute end-2 top-1/2 -translate-y-1/2 bg-white/80 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:bg-gray-900/80"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
        <div className="absolute bottom-2 end-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
          {activeIndex + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`عرض الصورة ${i + 1}`}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === activeIndex
                  ? 'border-brand-500 ring-2 ring-brand-500/30'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
