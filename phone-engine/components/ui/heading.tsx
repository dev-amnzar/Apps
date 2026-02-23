import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-cairo font-bold text-gray-900 dark:text-white", {
  variants: {
    size: {
      h1: "text-3xl sm:text-4xl lg:text-5xl",
      h2: "text-2xl sm:text-3xl lg:text-4xl",
      h3: "text-xl sm:text-2xl",
      h4: "text-lg sm:text-xl",
    },
  },
  defaultVariants: {
    size: "h2",
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Heading({ className, size, as, ...props }: HeadingProps) {
  const Component = as || (size === "h1" ? "h1" : size === "h3" ? "h3" : size === "h4" ? "h4" : "h2");
  return (
    <Component
      className={cn(headingVariants({ size, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants };
