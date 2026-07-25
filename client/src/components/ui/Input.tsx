import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, type = 'text', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-foreground/80 tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand ${
            error
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : 'border-gray-border focus:ring-brand/25'
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        )}
        {!error && helperText && (
          <span className="text-xs text-gray-400">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
