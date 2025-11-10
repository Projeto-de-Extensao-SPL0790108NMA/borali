"use client";

import * as React from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { InputOTP } from "./input-otp";
import { InputFormProps } from "./types";

function convertFieldValueToString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join("");
  return String(value);
}

export function InputOTPForm<FormTypes extends FieldValues>({
  name,
  label,
  isRequired,
  labelClassName,
  className,
  disabled,
  control,
  hideErrorMessage,
  length = 4,
  ...props
}: InputFormProps & UseControllerProps<FormTypes> & { length?: number }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const stringValue: string = convertFieldValueToString(field.value);
        return (
          <InputOTP
            {...props}
            id={name}
            label={label}
            isRequired={isRequired}
            labelClassName={labelClassName}
            className={className}
            value={stringValue}
            onChange={(value) => field.onChange(value)}
            errorMessage={fieldState.error?.message}
            disabled={disabled}
            hideErrorMessage={hideErrorMessage}
            length={length}
          />
        );
      }}
    />
  );
}

InputOTPForm.displayName = "InputOTPForm";
