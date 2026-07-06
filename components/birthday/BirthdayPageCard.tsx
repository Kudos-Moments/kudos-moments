import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatShortDate } from "@/lib/format";
import { pageStatus } from "@/lib/reveal-lock";
import type { BirthdayPage } from "@/types/birthday";

export function BirthdayPageCard({
  page,
  contributionCount,
}: {
  page: BirthdayPage;
  contributionCount: number;
}) {
  const status = pageStatus(page);
  return (
    <Link
      href={`/dashboard/${page.id}`}
      className="relative block rounded-modal border border-border bg-surface p-5 transition-colors duration-150 hover:bg-[#FAFAF9]"
    >
      <Badge status={status} className="absolute top-[14px] right-[14px]" />
      <div className="flex gap-[10px]">
        <Avatar name={page.recipientName} photoUrl={page.recipientPhotoUrl} size={56} />
        <div className="min-w-0">
          <p className="text-[16px] font-semibold text-text-primary font-sans truncate">
            {page.recipientName}
          </p>
          <p className="text-[13px] text-text-secondary font-sans mt-[2px]">
            {formatShortDate(page.birthdayDate)}
          </p>
          <p className="text-[13px] text-text-secondary font-sans">
            {contributionCount} {contributionCount === 1 ? "message" : "messages"}
          </p>
        </div>
      </div>
    </Link>
  );
}
