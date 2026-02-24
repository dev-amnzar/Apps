import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight text-gray-900 dark:text-white", {
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
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as, ...props }, ref) => {
    const Component = as || (size as "h1" | "h2" | "h3" | "h4") || "h2";
    return <Component ref={ref} className={cn(headingVariants({ size }), className)} {...props} />;
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
