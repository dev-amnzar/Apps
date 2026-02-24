"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet } from "@/components/ui/sheet";
import { Smartphone } from "lucide-react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string; labelEn: string }[];
  pathname: string;
}

export function MobileNav({ open, onClose, links, pathname }: MobileNavProps) {
  return (
    <Sheet open={open} onClose={onClose} side="right">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-brand-600" />
          <span className="text-lg font-bold text-gray-900 dark:text-white">Phone Engine</span>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                pathname === link.href
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </Sheet>
  );
}
