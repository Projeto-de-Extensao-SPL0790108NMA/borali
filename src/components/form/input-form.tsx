"use client";

import * as React from "react";

import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { Input } from "./input";
import { InputFormProps } from "./types";

export function InputForm<FormTypes extends FieldValues>({
  name,
  label,
  isRequired,
  labelClassName,
  className,
  type = "text",
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
        <Input
          {...field}
          id={name}
          label={label}
          isRequired={isRequired}
          labelClassName={labelClassName}
          className={className}
          type={type}
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

InputForm.displayName = "InputForm";
