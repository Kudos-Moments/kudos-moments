import { cx } from "@/lib/utils";

export function ProgressSteps({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 font-sans text-[13px] text-text-secondary">
      <span>
        Step {current} of {total}
      </span>
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={cx(
              "h-1 w-4 rounded-full",
              index < current ? "bg-accent" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
