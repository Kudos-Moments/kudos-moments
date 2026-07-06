"use client";

import { IconMessageCircle, IconVideo } from "@tabler/icons-react";
import type { ContributionType } from "@/types/birthday";
import { cx } from "@/lib/utils";

export function ContributionTypeSelect({
  value,
  onChange,
}: {
  value: ContributionType | null;
  onChange: (type: ContributionType) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3" role="radiogroup" aria-label="Message type">
      <TypeCard
        selected={value === "video"}
        onClick={() => onChange("video")}
        icon={<IconVideo size={22} aria-hidden />}
        label="Record or Upload a Video"
      />
      <TypeCard
        selected={value === "text"}
        onClick={() => onChange("text")}
        icon={<IconMessageCircle size={22} aria-hidden />}
        label="Write a Message"
      />
    </div>
  );
}

function TypeCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cx(
        "flex-1 h-20 flex flex-col items-center justify-center gap-2 rounded-modal border font-sans text-[15px] font-semibold text-text-primary transition-colors duration-150",
        selected ? "border-2 border-accent bg-accent/6" : "border border-border bg-surface"
      )}
    >
      <span className={selected ? "text-accent-strong" : "text-text-secondary"}>{icon}</span>
      {label}
    </button>
  );
}
