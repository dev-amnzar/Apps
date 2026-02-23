"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "ابحث عن هاتف...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="ps-10 pe-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute end-1 top-1/2 -translate-y-1/2 h-8 w-8"
          onClick={() => onChange("")}
          aria-label="مسح البحث"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
