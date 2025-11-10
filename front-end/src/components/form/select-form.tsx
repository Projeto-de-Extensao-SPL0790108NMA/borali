'use client';

import * as React from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-custom';
import { cn } from '@/lib/utils';
import { InputLabel } from '@/components/ui/input-label';

export interface SelectFormProps {
  name: string;
  className?: string;
  selectClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  onValueChange?: (value: string) => void;
}

export function SelectForm<FormTypes extends FieldValues>({
  name,
  className,
  disabled,
  placeholder,
  label,
  isRequired,
  labelClassName,
  options,
  control,
  selectClassName,
  onValueChange,
  ...props
}: SelectFormProps & UseControllerProps<FormTypes>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn('gap-1', className)}>
          <div className={cn('flex flex-col', !!label && 'gap-2')}>
            {label && (
              <InputLabel
                label={label}
                isRequired={isRequired}
                labelClassName={labelClassName}
              />
            )}
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              disabled={disabled}
              {...props}
            >
              <SelectTrigger className={cn('w-full', selectClassName)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    />
  );
}

SelectForm.displayName = 'SelectForm';
