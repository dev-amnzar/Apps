"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhoneGalleryProps {
  images: string[];
  name: string;
}

export function PhoneGallery({ images, name }: PhoneGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function next() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <Image
          src={images[activeIndex]}
          alt={`${name} - صورة ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prev}
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={next}
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all",
                activeIndex === i
                  ? "border-primary-500 ring-2 ring-primary-500/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${name} - مصغرة ${i + 1}`}
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
