import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-24 px-6">
      <h3 className="font-serif text-[20px] text-text-primary">{title}</h3>
      {body && <p className="mt-2 text-[15px] text-text-secondary max-w-[360px]">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
