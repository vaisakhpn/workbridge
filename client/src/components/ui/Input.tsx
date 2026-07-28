"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      required,
      type,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}

            {required && (
              <span className="ml-1 text-danger">*</span>
            )}
          </label>
        )}

        <div
          className={cn(
            "flex h-10 items-center rounded-md border border-border bg-white px-3 transition-colors",
            "focus-within:border-primary",
            error && "border-danger"
          )}
        >
          {leftIcon && (
            <span className="mr-2 text-muted">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={cn(
              "w-full bg-transparent text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="ml-2 text-muted hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          ) : (
            rightIcon && (
              <span className="ml-2 text-muted">
                {rightIcon}
              </span>
            )
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;