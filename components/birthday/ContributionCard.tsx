"use client";

import { useState } from "react";
import { IconMessageCircle, IconPlayerPlay } from "@tabler/icons-react";
import { formatDuration, formatShortDate } from "@/lib/format";
import type { Contribution } from "@/types/birthday";

export function ContributionGridCard({ contribution }: { contribution: Contribution }) {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (contribution.type === "video") {
    return (
      <div className="overflow-hidden rounded-modal border border-border bg-surface">
        <div className="relative aspect-video bg-ink">
          {playing && contribution.videoUrl ? (
            <video
              src={contribution.videoUrl}
              controls
              autoPlay
              className="h-full w-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="flex h-full w-full items-center justify-center"
              aria-label={`Play video message from ${contribution.contributorName}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white">
                <IconPlayerPlay size={20} aria-hidden />
              </span>
              <span className="absolute bottom-2 right-2 rounded bg-black/50 px-[6px] py-[2px] text-[11px] text-white font-sans">
                {formatDuration(contribution.videoDurationSeconds)}
              </span>
            </button>
          )}
          {playing && !contribution.videoUrl && (
            <p className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-center text-[12px] text-white font-sans">
              Video preview unavailable in this demo.
            </p>
          )}
        </div>
        <div className="p-4">
          <p className="text-[14px] font-semibold text-text-primary font-sans">
            {contribution.contributorName}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-modal border border-border bg-surface p-4">
      <p
        className={
          expanded
            ? "text-[15px] leading-[1.6] text-text-primary font-sans"
            : "text-[15px] leading-[1.6] text-text-primary font-sans line-clamp-5"
        }
      >
        {contribution.textContent}
      </p>
      {!expanded && (contribution.textContent?.length ?? 0) > 220 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-1 text-[13px] text-text-primary underline-offset-4 hover:underline font-sans"
        >
          Read more
        </button>
      )}
      <div className="mt-3 border-t border-border pt-3">
        <p className="text-[14px] font-semibold text-text-primary font-sans">
          {contribution.contributorName}
        </p>
      </div>
    </div>
  );
}

export function ContributionListRow({ contribution }: { contribution: Contribution }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-background/60 transition-colors duration-150"
        aria-expanded={expanded}
      >
        <div className="flex min-w-0 items-center gap-[10px]">
          <span
            className={
              contribution.type === "video"
                ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-ink text-white"
                : "flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-badge-locked-bg text-badge-locked-text"
            }
          >
            {contribution.type === "video" ? (
              <IconPlayerPlay size={14} aria-hidden />
            ) : (
              <IconMessageCircle size={14} aria-hidden />
            )}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold text-text-primary font-sans">
              {contribution.contributorName}
            </span>
            <span className="block text-[13px] text-text-secondary font-sans">
              {contribution.type === "video"
                ? `Video, ${formatDuration(contribution.videoDurationSeconds)}`
                : "Text message"}
            </span>
          </span>
        </div>
        <span className="shrink-0 text-[13px] text-text-secondary font-sans">
          {formatShortDate(contribution.createdAt.slice(0, 10))}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 animate-fade-in">
          {contribution.type === "video" ? (
            contribution.videoUrl ? (
              <video
                src={contribution.videoUrl}
                controls
                autoPlay
                className="w-full rounded-card bg-ink aspect-video"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-card bg-ink">
                <p className="text-[13px] text-white/80 font-sans">
                  Video preview unavailable in this demo.
                </p>
              </div>
            )
          ) : (
            <p className="text-[14px] leading-[1.6] text-text-primary font-sans whitespace-pre-wrap">
              {contribution.textContent}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
