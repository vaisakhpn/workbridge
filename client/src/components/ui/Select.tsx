"use client";

import { forwardRef, SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: (SelectOption | string)[];
  leftIcon?: ReactNode;
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      leftIcon,
      placeholder,
      required,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}

        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-border bg-white px-3 transition-colors focus-within:border-primary",
            error && "border-danger"
          )}
        >
          {leftIcon && <span className="mr-2 text-muted">{leftIcon}</span>}

          <select
            ref={ref}
            id={id}
            className={cn(
              "w-full bg-transparent text-sm outline-hidden cursor-pointer disabled:cursor-not-allowed",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        </div>

        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
