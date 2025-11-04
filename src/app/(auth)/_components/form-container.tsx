import { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function FormContainer({
  children,
  title,
  subtitle,
  classNameTitle,
  classNameSubtitle,
  hideLogo = false,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
  hideLogo?: boolean;
}) {
  return (
    <div className="space-y-4">
      {(title || subtitle) && (
        <div className="space-y-1 pb-2">
          {subtitle && (
            <p
              className={cn(
                "uppercase text-xs leading-[22.53px] tracking-wide text-black font-normal",
                classNameSubtitle
              )}
            >
              {subtitle}
            </p>
          )}
          {title && (
            <h1 className={cn("text-[25px] leading-[44px] font-medium text-black", classNameTitle)}>
              {title}
            </h1>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
