"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "right" | "left";
}

function Sheet({ open, onClose, children, side = "right" }: SheetProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900",
          side === "right" ? "left-0 animate-slide-in-right" : "right-0 animate-slide-in-right"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { Sheet };
