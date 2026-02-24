"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhoneGalleryProps {
  images: string[];
  alt: string;
}

export function PhoneGallery({ images, alt }: PhoneGalleryProps) {
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
      <div className="relative aspect-square">
        <Image
          src={images[current]}
          alt={`${alt} - صورة ${current + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
            onClick={prev}
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
            onClick={next}
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </Button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === current
                    ? "w-6 bg-brand-600"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                onClick={() => setCurrent(idx)}
                aria-label={`صورة ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
