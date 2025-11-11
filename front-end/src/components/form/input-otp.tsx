"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InputError } from "./input-error";
import { InputLabel } from "../ui/input-label";

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
  className?: string;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      label,
      isRequired,
      labelClassName,
      className,
      errorMessage,
      hideErrorMessage,
      value,
      onChange,
      length = 4,
      ...props
    },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    React.useEffect(() => {
      if (focusedIndex !== null && inputRefs.current[focusedIndex]) {
        inputRefs.current[focusedIndex]?.focus();
      }
    }, [focusedIndex]);

    const handleChange = (index: number, inputValue: string) => {
      // Only allow numbers
      const sanitizedValue = inputValue.replace(/[^0-9]/g, "");
      
      if (sanitizedValue.length > 1) {
        // Paste event - distribute digits
        const digits = sanitizedValue.slice(0, length).split("");
        const newValue = digits.join("").padEnd(length, "");
        onChange(newValue);
        
        // Focus the last filled input or the next empty one
        const nextEmptyIndex = digits.findIndex((_, i) => !digits[i]);
        const focusIndex = nextEmptyIndex === -1 ? Math.min(length - 1, digits.length - 1) : nextEmptyIndex;
        setFocusedIndex(focusIndex);
        return;
      }

      // Update the value at the specific index
      const currentDigits = value.split("").slice(0, length);
      currentDigits[index] = sanitizedValue;
      
      // Fill empty slots with empty strings to maintain length
      while (currentDigits.length < length) {
        currentDigits.push("");
      }
      
      const newValue = currentDigits.slice(0, length).join("");
      onChange(newValue);

      // Move to next input if value entered
      if (sanitizedValue && index < length - 1) {
        setFocusedIndex(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        setFocusedIndex(index - 1);
        const currentDigits = value.split("").slice(0, length);
        currentDigits[index - 1] = "";
        onChange(currentDigits.join(""));
      } else if (e.key === "ArrowLeft" && index > 0) {
        setFocusedIndex(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        setFocusedIndex(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
      if (pastedData) {
        const digits = pastedData.slice(0, length).split("");
        const newValue = digits.join("").padEnd(length, "");
        onChange(newValue);
        const nextEmptyIndex = digits.findIndex((_, i) => !digits[i]);
        const focusIndex = nextEmptyIndex === -1 ? Math.min(length - 1, digits.length - 1) : nextEmptyIndex;
        setFocusedIndex(focusIndex);
      }
    };

    const digits = value.split("").slice(0, length);
    while (digits.length < length) {
      digits.push("");
    }

    return (
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

          <div className="flex gap-2 justify-center">
            {Array.from({ length }).map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                  if (index === 0 && ref) {
                    if (typeof ref === "function") {
                      ref(el);
                    } else {
                      ref.current = el;
                    }
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                className={cn(
                  "h-14 w-14 rounded-lg border border-solid bg-white text-center text-base leading-[28.16px] font-normal",
                  "border-[#424242] text-[#424242]",
                  "focus:outline-none focus:border-[#001e78] focus:ring-2 focus:ring-[#001e78]/20",
                  "[&::placeholder]:text-[#424242]",
                  errorMessage &&
                    "border-danger-pure focus:border-danger-pure focus-visible:border-danger-pure shadow-danger-pure/20 shadow-sm",
                  focusedIndex === index && "ring-2 ring-[#001e78]/20"
                )}
                style={{ borderColor: errorMessage ? undefined : "#424242" }}
                {...props}
              />
            ))}
          </div>
        </div>
        {errorMessage && !hideErrorMessage && (
          <InputError errorMessage={errorMessage} />
        )}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";



