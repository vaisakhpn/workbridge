import { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import Spinner from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",

        secondary: "bg-slate-100 text-foreground hover:bg-slate-200",

        outline: "border border-border bg-transparent hover:bg-slate-100",

        ghost: "hover:bg-slate-100",

        danger: "bg-danger text-white hover:opacity-90",
      },

      size: {
        sm: "h-9 px-3 text-sm",

        md: "h-10 px-5 text-sm",

        lg: "h-12 px-6 text-base",
      },

      fullWidth: {
        true: "w-full",

        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant,
  size,
  fullWidth,
  className,
  loading = false,
  loadingText,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          {loadingText || "Loading..."}
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
