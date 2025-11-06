import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputBase = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Base styles following Figma design
          'flex h-12 w-full rounded-[8px] border-1 px-4 py-3',
          // Background and text colors from Style Guide
          'bg-neutral-high-pure text-neutral-low-pure',
          // Font configuration from Figma (Gabarito SemiBold 14px)
          'text-[14px] leading-[16.1px] font-semibold tracking-[0px]',
          // Border states from Style Guide
          'border-neutral-high-medium', // Default border
          'focus:border-neutral-low-light focus:outline-none', // Focus border
          'focus-visible:border-neutral-low-light', // Focus visible border
          // Placeholder styling using Style Guide variables
          'placeholder:text-neutral-low-light placeholder:font-semibold',
          // Disabled state using Style Guide variables
          'disabled:bg-neutral-high-light disabled:cursor-not-allowed disabled:opacity-50',
          // File input styling
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          // Dark mode support using Style Guide variables
          'dark:bg-neutral-high-pure dark:text-neutral-low-pure dark:border-neutral-high-dark',
          'dark:focus:border-neutral-low-light dark:placeholder:text-neutral-low-medium',
          className,
        )}
        {...props}
      />
    );
  },
);

InputBase.displayName = 'InputBase';

export { InputBase };
