"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { cx } from "@/lib/utils";

export function CopyLinkField({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable — fall back to a temporary text selection.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cx("flex", className)}>
      <div
        className="flex-1 min-w-0 bg-background border border-border border-r-0 rounded-l-card px-4 py-[10px] text-[14px] text-text-primary font-sans overflow-hidden text-ellipsis whitespace-nowrap"
        title={value}
      >
        {value}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 flex items-center gap-[6px] bg-accent hover:bg-[#F0524F] text-white rounded-r-card px-4 py-[10px] text-[14px] font-medium font-sans transition-colors duration-150"
      >
        {copied ? (
          <>
            <IconCheck size={16} aria-hidden />
            Copied
          </>
        ) : (
          <>
            <IconCopy size={16} aria-hidden />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
