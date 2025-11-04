import { cn } from '@/lib/utils';
import { Label } from './label';

export function InputLabel({
  label,
  isRequired,
  labelClassName,
}: {
  label: string;
  isRequired?: boolean;
  labelClassName?: string;
}) {
  return (
    <Label
      htmlFor={label}
      isRequired={isRequired}
      className={cn('text-base', labelClassName)}
    >
      {label}
    </Label>
  );
}

InputLabel.displayName = 'InputLabel';
