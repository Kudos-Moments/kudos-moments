"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPlayerPlay, IconX } from "@tabler/icons-react";
import { Avatar } from "@/components/ui/Avatar";
import { ContributionGridCard } from "./ContributionCard";
import { formatDuration } from "@/lib/format";
import type { Contribution } from "@/types/birthday";

export function RevealUnlockedView({
  recipientName,
  recipientPhotoUrl,
  contributions,
}: {
  recipientName: string;
  recipientPhotoUrl?: string;
  contributions: Contribution[];
}) {
  const videoContributions = contributions.filter((c) => c.type === "video");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="pb-20">
      <div className="px-5 pt-14 pb-8 md:pt-14 text-center">
        <Avatar name={recipientName} photoUrl={recipientPhotoUrl} size={96} className="mx-auto" />
        <h1 className="mt-4 font-serif text-[26px] md:text-[32px] text-text-primary">
          Happy Birthday, {recipientName}
        </h1>
        <p className="mt-2 text-[15px] text-text-secondary font-sans">
          {contributions.length} {contributions.length === 1 ? "person" : "people"} sent you
          something.
        </p>

        {videoContributions.length > 0 && (
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="mt-6 inline-flex items-center gap-2 rounded-card border border-border bg-transparent px-5 py-[10px] text-[14px] font-sans text-text-primary hover:bg-surface transition-colors duration-150"
          >
            <IconPlayerPlay size={14} aria-hidden />
            Play all
          </button>
        )}
      </div>

      <div className="mx-auto grid max-w-[800px] grid-cols-1 md:grid-cols-2 gap-6 px-5">
        {contributions.map((contribution) => (
          <ContributionGridCard key={contribution.id} contribution={contribution} />
        ))}
      </div>

      {lightboxIndex !== null && (
        <PlayAllLightbox
          contributions={videoContributions}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function PlayAllLightbox({
  contributions,
  index,
  onIndexChange,
  onClose,
}: {
  contributions: Contribution[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const contribution = contributions[index];
  const hasPrev = index > 0;
  const hasNext = index < contributions.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 sm:bg-ink/80 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Play all messages"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white"
      >
        <IconX size={18} />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={() => onIndexChange(index - 1)}
          aria-label="Previous message"
          className="absolute left-3 md:left-8 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white"
        >
          <IconChevronLeft size={20} />
        </button>
      )}

      <div className="w-full max-w-lg px-4 sm:px-0">
        <div className="overflow-hidden rounded-modal bg-ink">
          {contribution.videoUrl ? (
            <video
              key={contribution.id}
              src={contribution.videoUrl}
              controls
              autoPlay
              className="aspect-video w-full"
              onEnded={() => hasNext && onIndexChange(index + 1)}
            />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-white/80">
              <IconPlayerPlay size={28} />
              <p className="text-[13px] font-sans">Video preview unavailable in this demo.</p>
              <p className="text-[12px] font-sans">
                {formatDuration(contribution.videoDurationSeconds)}
              </p>
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-[14px] font-semibold text-white font-sans">
          {contribution.contributorName}
        </p>
      </div>

      {hasNext && (
        <button
          type="button"
          onClick={() => onIndexChange(index + 1)}
          aria-label="Next message"
          className="absolute right-3 md:right-8 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white"
        >
          <IconChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
