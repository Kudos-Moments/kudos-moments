import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { IconCalendar } from "@tabler/icons-react";
import { cx } from "@/lib/utils";

export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, containerClassName, className, id, ...props }, ref) => {
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
        <div className="relative">
          <input
            ref={ref}
            type="date"
            id={inputId}
            className={cx(
              "w-full bg-surface border rounded-card pl-4 pr-11 py-3 text-[16px] text-text-primary font-sans transition-colors duration-150 outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-11 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
              error ? "border-accent" : "border-border focus:border-accent",
              className
            )}
            aria-invalid={error ? true : undefined}
            {...props}
          />
          <IconCalendar
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            aria-hidden
          />
        </div>
        {error && (
          <p role="alert" className="mt-[6px] text-[13px] text-accent-strong">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
