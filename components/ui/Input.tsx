import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, containerClassName, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? props.name ?? autoId;
    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[14px] text-text-secondary mb-[6px] font-sans"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cx(
            "w-full bg-surface border rounded-card px-4 py-3 text-[16px] text-text-primary font-sans placeholder:text-text-secondary/70 transition-colors duration-150 outline-none",
            error ? "border-accent" : "border-border focus:border-accent",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {hint && (
          <p id={`${inputId}-hint`} className="mt-[6px] text-[13px] text-text-secondary">
            {hint}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-[6px] text-[13px] text-accent-strong">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
