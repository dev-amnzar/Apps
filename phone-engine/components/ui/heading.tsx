import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('font-bold tracking-tight text-gray-900 dark:text-gray-50', {
  variants: {
    level: {
      h1: 'text-3xl sm:text-4xl lg:text-5xl',
      h2: 'text-2xl sm:text-3xl lg:text-4xl',
      h3: 'text-xl sm:text-2xl',
      h4: 'text-lg sm:text-xl',
    },
  },
  defaultVariants: {
    level: 'h2',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({ className, level, as, children, ...props }: HeadingProps) {
  const Tag = as ?? (level as 'h1' | 'h2' | 'h3' | 'h4') ?? 'h2';
  return (
    <Tag className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Tag>
  );
}
