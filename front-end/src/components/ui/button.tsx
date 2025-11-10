import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Primary Button - Admin Style Guide
        default:
          "bg-[var(--color-primary-pure)] text-[var(--color-neutral-high-pure)] shadow-xs hover:bg-[var(--color-primary-medium)] active:bg-[var(--color-primary-dark)] disabled:bg-[var(--color-neutral-high-light)] disabled:text-[var(--color-neutral-high-medium)] disabled:opacity-100",
        destructive:
          "bg-[var(--color-danger-pure)] text-white shadow-xs hover:bg-[var(--color-danger-medium)] focus-visible:ring-[var(--color-danger-light)]/20 dark:focus-visible:ring-[var(--color-danger-light)]/40",

        // Outlined Button - Admin Style Guide
        outline:
          "border-2 border-[var(--color-primary-pure)] text-[var(--color-primary-pure)] bg-[var(--color-neutral-high-pure)] shadow-xs hover:bg-[var(--color-primary-hover-bg)] hover:text-[var(--color-primary-medium)] hover:border-[var(--color-primary-medium)] active:bg-[var(--color-primary-hover-bg)] active:text-[var(--color-primary-dark)] active:border-[var(--color-primary-dark)] disabled:border-[var(--color-neutral-high-medium)] disabled:text-[var(--color-neutral-high-medium)] disabled:bg-[var(--color-neutral-high-light)] disabled:opacity-100",

        secondary:
          "bg-[var(--color-secondary-medium)] text-[var(--color-neutral-high-pure)] shadow-xs hover:bg-[var(--color-secondary-light)] active:bg-[var(--color-secondary-dark)]",
        ghost:
          "hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent-foreground)] dark:hover:bg-[var(--color-accent-light)]/50",

        // Flat Button - Admin Style Guide
        link: "!bg-transparent hover:!bg-transparent active:!bg-transparent focus:!bg-transparent text-[var(--color-primary-pure)] hover:text-[var(--color-primary-medium)] active:text-[var(--color-primary-dark)] border-0 shadow-none focus-visible:ring-0 focus-visible:border-transparent disabled:!bg-transparent disabled:border-0 disabled:text-[var(--color-neutral-high-medium)] disabled:opacity-100",

        // Danger Button
        dangerOutline:
          "border-2 border-[var(--color-danger-pure)] text-[var(--color-danger-pure)] bg-transparent hover:bg-[var(--color-danger-light)]",
        danger:
          "bg-[var(--color-danger-pure)] text-white shadow-xs hover:bg-[var(--color-danger-medium)] disabled:bg-[var(--color-neutral-high-light)] disabled:text-[var(--color-neutral-high-medium)] disabled:opacity-100",
      },
      size: {
        default: "h-12 w-[232px] px-5 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Loading spinner component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="60"
      strokeDashoffset="15"
    />
  </svg>
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner className="size-6" />}
      {!isLoading && children}
    </Comp>
  );
}

export { Button, buttonVariants };
