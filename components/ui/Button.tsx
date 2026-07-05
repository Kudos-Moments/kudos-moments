import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white rounded-card hover:bg-[#F0524F] active:bg-[#E3413E]",
  secondary:
    "bg-transparent text-text-primary border border-border rounded-card hover:bg-surface",
  text: "bg-transparent text-text-primary underline-offset-4 hover:underline p-0",
};

const sizeClasses: Record<Exclude<Variant, "text">, Record<Size, string>> = {
  primary: {
    sm: "text-[14px] px-5 py-[10px]",
    md: "text-[15px] px-6 py-[13px]",
    lg: "text-[16px] px-7 py-[14px]",
  },
  secondary: {
    sm: "text-[14px] px-5 py-[10px]",
    md: "text-[15px] px-6 py-[13px]",
    lg: "text-[16px] px-7 py-[14px]",
  },
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const OWN_PROP_KEYS = ["variant", "size", "fullWidth", "className", "children", "href"] as const;

function domProps<T extends object>(props: T): Omit<T, (typeof OWN_PROP_KEYS)[number]> {
  const clone = { ...props };
  for (const key of OWN_PROP_KEYS) {
    delete (clone as Record<string, unknown>)[key];
  }
  return clone;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", fullWidth, className, children } = props;

  const classes = cx(
    base,
    variantClasses[variant],
    variant !== "text" && sizeClasses[variant][size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} {...domProps(props)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...domProps(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
