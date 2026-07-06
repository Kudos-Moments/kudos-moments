import type { BirthdayPageStatus } from "@/types/birthday";
import { cx } from "@/lib/utils";

const STATUS_LABEL: Record<BirthdayPageStatus, string> = {
  collecting: "Collecting",
  locked: "Locked",
  revealed: "Revealed",
};

const STATUS_CLASSES: Record<BirthdayPageStatus, string> = {
  collecting: "bg-accent/12 text-accent-deep",
  locked: "bg-badge-locked-bg text-badge-locked-text",
  revealed: "bg-accent text-white",
};

export function Badge({ status, className }: { status: BirthdayPageStatus; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-[10px] py-[4px] text-[12px] font-sans leading-none whitespace-nowrap",
        STATUS_CLASSES[status],
        className
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
