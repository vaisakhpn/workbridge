"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      required,
      maxLength,
      currentLength,
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

        <textarea
          ref={ref}
          id={id}
          maxLength={maxLength}
          className={cn(
            "w-full rounded-md border border-border bg-white p-3 text-sm outline-hidden placeholder:text-muted focus:border-primary transition-colors disabled:cursor-not-allowed resize-none",
            error && "border-danger",
            className
          )}
          {...props}
        />

        <div className="flex justify-between items-center mt-1">
          {error ? (
            <p className="text-sm text-danger">{error}</p>
          ) : (
            <div />
          )}

          {maxLength !== undefined && currentLength !== undefined && (
            <span className="text-[11px] text-muted font-medium ml-auto">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
