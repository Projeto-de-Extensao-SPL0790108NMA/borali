"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { InputError } from "./input-error";
import { InputCustomProps } from "../types";
import { InputLabel } from "../ui/input-label";
import { MaterialIcon } from "../ui/material-icon";

const InputPassword = React.forwardRef<HTMLInputElement, InputCustomProps>(
  (
    {
      label,
      isRequired,
      labelClassName,
      className,
      errorMessage,
      hideErrorMessage,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn("gap-1", className)}>
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

          <div className="relative">
            <input
              ref={ref}
              type={showPassword ? "text" : "password"}
              className={cn(
                "h-14 w-full rounded-lg border border-solid bg-white px-4 py-2 pr-14 text-base leading-[28.16px] font-normal",
                "border-[#424242] text-[#757575] placeholder:text-[#757575]",
                "focus:outline-none focus:border-[#424242] focus:ring-0",
                "[&::placeholder]:text-[#757575]",
                inputClassName,
                errorMessage &&
                  "border-danger-pure focus:border-danger-pure focus-visible:border-danger-pure shadow-danger-pure/20 shadow-2xl"
              )}
              style={{ borderColor: "#424242" }}
              {...props}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={togglePasswordVisibility}
              className="text-[#bebebe] absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 p-0 hover:bg-transparent z-10 pointer-events-auto cursor-pointer flex items-center justify-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <MaterialIcon
                  icon="visibility_off"
                  className="text-[#bebebe] h-4 w-4 pointer-events-none"
                  style={{ fontWeight: 200 }}
                />
              ) : (
                <MaterialIcon
                  icon="visibility"
                  className="text-[#bebebe] h-4 w-4 pointer-events-none"
                />
              )}
            </Button>
          </div>
        </div>
        {errorMessage && !hideErrorMessage && (
          <InputError errorMessage={errorMessage} />
        )}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
