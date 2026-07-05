"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/hooks";
import type { Organizer } from "@/types/birthday";

export function RequireOrganizer({
  children,
}: {
  children: (organizer: Organizer) => React.ReactNode;
}) {
  const { organizer, ready } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (ready && !organizer) {
      router.replace("/login");
    }
  }, [ready, organizer, router]);

  if (!ready || !organizer) {
    return (
      <div className="flex flex-1 items-center justify-center py-32">
        <p className="text-[14px] text-text-secondary font-sans">Loading…</p>
      </div>
    );
  }

  return <>{children(organizer)}</>;
}
