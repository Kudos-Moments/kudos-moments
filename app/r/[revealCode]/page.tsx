"use client";

import { useParams } from "next/navigation";
import { MinimalTopBar } from "@/components/layout/MinimalTopBar";
import { RevealLockedView } from "@/components/birthday/RevealLockedView";
import { RevealUnlockedView } from "@/components/birthday/RevealUnlockedView";
import { usePageByRevealCode, useContributionsForPage, useHasHydrated } from "@/lib/hooks";
import { isPageLocked } from "@/lib/reveal-lock";

export default function RevealPage() {
  const params = useParams<{ revealCode: string }>();
  const revealCode = params.revealCode;
  const hydrated = useHasHydrated();
  const page = usePageByRevealCode(revealCode);
  const contributions = useContributionsForPage(page?.id);

  return (
    <div className="flex min-h-screen flex-col">
      <MinimalTopBar centered linkHome={false} />
      <main className="flex flex-1 flex-col">
        {!hydrated ? (
          <div className="flex flex-1 items-center justify-center py-24">
            <p className="text-[14px] text-text-secondary font-sans">Loading…</p>
          </div>
        ) : !page ? (
          <div className="flex flex-1 items-center justify-center py-24 text-center px-5">
            <h1 className="font-serif text-[24px] text-text-primary max-w-[360px]">
              This reveal link isn&apos;t active anymore.
            </h1>
          </div>
        ) : isPageLocked(page) ? (
          <RevealLockedView
            recipientName={page.recipientName}
            recipientPhotoUrl={page.recipientPhotoUrl}
            birthdayDate={page.birthdayDate}
          />
        ) : (
          <RevealUnlockedView
            recipientName={page.recipientName}
            recipientPhotoUrl={page.recipientPhotoUrl}
            contributions={contributions}
          />
        )}
      </main>
    </div>
  );
}
