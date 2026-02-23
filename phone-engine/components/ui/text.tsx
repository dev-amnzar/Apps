import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("font-cairo", {
  variants: {
    variant: {
      default: "text-gray-700 dark:text-gray-300",
      muted: "text-gray-500 dark:text-gray-400",
      lead: "text-lg text-gray-600 dark:text-gray-300",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

function Text({ className, variant, size, ...props }: TextProps) {
  return (
    <p className={cn(textVariants({ variant, size, className }))} {...props} />
  );
}

export { Text, textVariants };
