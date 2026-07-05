import { avatarColorForName, initials } from "@/lib/format";
import { cx } from "@/lib/utils";

export function Avatar({
  name,
  photoUrl,
  size = 48,
  ringed,
  className,
}: {
  name: string;
  photoUrl?: string;
  size?: number;
  ringed?: boolean;
  className?: string;
}) {
  const style = { width: size, height: size };

  if (photoUrl) {
    return (
      <span
        className={cx(
          "relative inline-block shrink-0 overflow-hidden rounded-full",
          ringed && "ring-2 ring-border ring-offset-0",
          className
        )}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded object URLs aren't compatible with next/image's optimizer */}
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      </span>
    );
  }

  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full font-sans font-semibold text-white",
        ringed && "ring-2 ring-border ring-offset-0",
        className
      )}
      style={{ ...style, background: avatarColorForName(name), fontSize: size * 0.36 }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
