import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export function SectionContainer({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 md:px-12", className)} {...props}>
      {children}
    </div>
  );
}
