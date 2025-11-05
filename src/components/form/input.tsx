import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { InputError } from "./input-error";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { InputCustomProps } from "../types";
import { InputLabel } from "../ui/input-label";

export const Input = React.forwardRef<HTMLInputElement, InputCustomProps>(
  (
    {
      label,
      isRequired,
      labelClassName,
      className,
      errorMessage,
      hideErrorMessage,
      inputClassName,
      tooltip,
      ...props
    },
    ref
  ) => {
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

          <div className="relative">
            {tooltip && (
              <div className="absolute -top-2.5 right-2 z-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <span className="text-neutral-low-pure !text-xl">?</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{tooltip}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            <input
              ref={ref}
              className={cn(
                "h-14 w-full rounded-lg border border-solid bg-white px-4 py-2 text-base leading-[28.16px] font-normal",
                "border-[#424242] text-[#424242] placeholder:text-[#424242]",
                "focus:outline-none focus:border-[#424242] focus:ring-0",
                "[&::placeholder]:text-[#424242]",
                inputClassName,

                errorMessage &&
                  "border-danger-pure focus:border-danger-pure focus-visible:border-danger-pure shadow-danger-pure/20 shadow-sm"
              )}
              style={{ borderColor: "#424242", ...(props.style || {}) }}
              {...props}
            />
          </div>
        </div>
        {errorMessage && !hideErrorMessage && (
          <InputError errorMessage={errorMessage} />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
