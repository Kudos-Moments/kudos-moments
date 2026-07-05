import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      maxLength,
      showCount,
      containerClassName,
      className,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? props.name ?? autoId;
    const currentLength = typeof value === "string" ? value.length : 0;
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
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            value={value}
            maxLength={maxLength}
            className={cx(
              "w-full bg-surface border rounded-card px-4 py-3 text-[16px] text-text-primary font-sans placeholder:text-text-secondary/70 transition-colors duration-150 outline-none resize-none",
              error ? "border-accent" : "border-border focus:border-accent",
              className
            )}
            aria-invalid={error ? true : undefined}
            {...props}
          />
          {showCount && maxLength && (
            <span className="pointer-events-none absolute bottom-3 right-4 text-[12px] text-text-secondary">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        {hint && <p className="mt-[6px] text-[13px] text-text-secondary">{hint}</p>}
        {error && (
          <p role="alert" className="mt-[6px] text-[13px] text-accent-strong">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
