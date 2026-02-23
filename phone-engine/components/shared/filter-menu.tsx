"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types";

interface FilterMenuProps {
  brands: Brand[];
  selectedBrand: string | null;
  onSelect: (brand: string | null) => void;
}

export function FilterMenu({ brands, selectedBrand, onSelect }: FilterMenuProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-cairo text-gray-500 dark:text-gray-400">
        <Filter className="h-4 w-4" />
        <span>تصفية حسب العلامة التجارية</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedBrand === null ? "primary" : "secondary"}
          size="sm"
          onClick={() => onSelect(null)}
          className="rounded-full"
        >
          الكل
        </Button>
        {brands.map((brand) => (
          <Button
            key={brand.slug}
            variant={selectedBrand === brand.slug ? "primary" : "secondary"}
            size="sm"
            onClick={() => onSelect(brand.slug)}
            className="rounded-full gap-1.5"
          >
            {brand.nameAr}
            <Badge
              variant={selectedBrand === brand.slug ? "default" : "secondary"}
              className="text-[10px] px-1.5 py-0"
            >
              {brand.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
