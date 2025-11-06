import * as React from "react";

import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, isRequired, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-neutral-low-label text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {isRequired ? (
        <span>
          {children}
          <span className="text-destructive">*</span>
        </span>
      ) : (
        children
      )}
    </label>
  )
);
Label.displayName = "Label";

export { Label };
