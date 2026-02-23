"use client";

import Link from "next/link";
import { X, Smartphone } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <Sheet open={open} onClose={onClose} side="right">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 text-lg font-bold font-cairo text-primary-600 dark:text-primary-400"
          >
            <Smartphone className="h-6 w-6" />
            <span>محرك الهواتف</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="إغلاق">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-3 rounded-xl text-gray-700 font-cairo font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors dark:text-gray-300 dark:hover:bg-primary-950 dark:hover:text-primary-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Separator />

        {/* Footer */}
        <div className="p-4">
          <p className="text-xs text-gray-400 font-cairo text-center">
            &copy; {new Date().getFullYear()} محرك الهواتف
          </p>
        </div>
      </div>
    </Sheet>
  );
}
