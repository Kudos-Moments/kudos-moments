import Link from "next/link";
import { cx } from "@/lib/utils";

export function Wordmark({
  size = "md",
  href = "/",
  className,
}: {
  size?: "sm" | "md";
  href?: string;
  className?: string;
}) {
  const content = (
    <span
      className={cx(
        "font-serif text-text-primary lowercase tracking-tight",
        size === "sm" ? "text-[16px]" : "text-[18px]",
        className
      )}
    >
      kudos moments
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Kudos Moments home">
      {content}
    </Link>
  );
}
