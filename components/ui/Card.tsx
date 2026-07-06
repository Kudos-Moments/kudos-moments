import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive, className, children, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "bg-surface border border-border rounded-modal",
        interactive && "transition-colors duration-150 hover:bg-[#FAFAF9] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
