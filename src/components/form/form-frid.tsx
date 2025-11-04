import * as React from 'react';

import { cn } from '@/lib/utils';

interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function FormGrid({ children, columns = 1, className }: FormGridProps) {
  const responsive =
    columns === 2
      ? 'md:grid-cols-2'
      : columns === 3
        ? 'md:grid-cols-3'
        : columns === 4
          ? 'md:grid-cols-4'
          : '';

  return (
    <div className={cn('grid grid-cols-1 gap-3', responsive, className)}>
      {children}
    </div>
  );
}
