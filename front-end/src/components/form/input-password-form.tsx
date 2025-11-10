'use client';

import * as React from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { InputPassword } from './input-password';
import { InputFormProps } from './types';

export function InputPasswordForm<FormTypes extends FieldValues>({
  name,
  label,
  isRequired,
  labelClassName,
  className,
  placeholder,
  disabled,
  control,
  hideErrorMessage,
  ...props
}: InputFormProps & UseControllerProps<FormTypes>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputPassword
          {...field}
          id={name}
          label={label}
          isRequired={isRequired}
          labelClassName={labelClassName}
          className={className}
          placeholder={placeholder}
          errorMessage={fieldState.error?.message}
          disabled={disabled}
          hideErrorMessage={hideErrorMessage}
          {...props}
        />
      )}
    />
  );
}

InputPasswordForm.displayName = 'InputPasswordForm';
