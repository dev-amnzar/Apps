import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    if (startIcon ?? endIcon) {
      return (
        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute start-3 flex items-center text-gray-400 dark:text-gray-500">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm',
              'ring-offset-white placeholder:text-gray-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100',
              startIcon && 'ps-9',
              endIcon && 'pe-9',
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute end-3 flex items-center text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm',
          'ring-offset-white placeholder:text-gray-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
