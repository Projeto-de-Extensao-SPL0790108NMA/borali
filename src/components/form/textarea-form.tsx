"use client";

import * as React from "react";

import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { cn } from "@/lib/utils";
import { InputError } from "./input-error";
import { InputLabel } from "../ui/input-label";
import { TextareaCustomProps } from "./types";

export function TextareaForm<FormTypes extends FieldValues>({
  name,
  label,
  isRequired,
  labelClassName,
  className,
  placeholder,
  disabled,
  control,
  hideErrorMessage,
  textareaClassName,
  rows = 3,
  ...props
}: TextareaCustomProps &
  UseControllerProps<FormTypes> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("gap-2", className)}>
          <div className={cn("flex flex-col", !!label && "gap-2")}>
            {label && (
              <InputLabel
                label={label}
                isRequired={isRequired}
                labelClassName={cn(
                  "text-xs leading-[22.53px] font-normal text-[#424242]",
                  labelClassName
                )}
              />
            )}

            <textarea
              {...field}
              id={name}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "w-full rounded-lg border border-solid bg-white px-4 py-2 text-base leading-[28.16px] font-normal",
                "border-[#424242] text-[#424242] placeholder:text-[#424242]",
                "focus:outline-none focus:border-[#424242] focus:ring-0",
                "[&::placeholder]:text-[#424242]",
                "resize-none",
                textareaClassName,

                fieldState.error &&
                  "border-danger-pure focus:border-danger-pure focus-visible:border-danger-pure shadow-danger-pure/20 shadow-sm"
              )}
              style={{ borderColor: "#424242", ...(props.style || {}) }}
              {...props}
            />
          </div>
          {fieldState.error?.message && !hideErrorMessage && (
            <InputError errorMessage={fieldState.error.message} />
          )}
        </div>
      )}
    />
  );
}

TextareaForm.displayName = "TextareaForm";

