import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

function Container({ className, size = "xl", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-3xl": size === "sm",
          "max-w-5xl": size === "md",
          "max-w-6xl": size === "lg",
          "max-w-7xl": size === "xl",
        },
        className
      )}
      {...props}
    />
  );
}

export { Container };
