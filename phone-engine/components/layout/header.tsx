"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  function toggleDark() {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  }

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/phones", label: "الهواتف" },
    { href: "/guides", label: "الأدلة" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold font-cairo text-primary-600 dark:text-primary-400"
          >
            <Smartphone className="h-7 w-7" />
            <span>محرك الهواتف</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-600 font-cairo font-medium hover:text-primary-600 hover:bg-primary-50 transition-colors dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              aria-label="تبديل الوضع الداكن"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="القائمة"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
