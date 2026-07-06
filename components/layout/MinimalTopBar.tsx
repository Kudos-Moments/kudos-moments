import type { ReactNode } from "react";
import { Wordmark } from "./Wordmark";
import { cx } from "@/lib/utils";

export function MinimalTopBar({
  rightSlot,
  centered,
  linkHome = true,
}: {
  rightSlot?: ReactNode;
  centered?: boolean;
  linkHome?: boolean;
}) {
  return (
    <header
      className={cx(
        "flex items-center border-b border-border px-5",
        centered ? "h-14 justify-center" : "h-16 justify-between"
      )}
    >
      <Wordmark size={centered ? "sm" : "sm"} href={linkHome ? "/" : ""} />
      {rightSlot}
    </header>
  );
}
