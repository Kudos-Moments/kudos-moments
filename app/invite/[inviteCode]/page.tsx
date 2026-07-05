"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { IconCheck } from "@tabler/icons-react";
import { MinimalTopBar } from "@/components/layout/MinimalTopBar";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ContributionTypeSelect } from "@/components/birthday/ContributionTypeSelect";
import { VideoUpload, type VideoUploadValue } from "@/components/birthday/VideoUpload";
import { usePageByInviteCode, useHasHydrated } from "@/lib/hooks";
import { addContribution } from "@/lib/store";
import { firstName, formatLongDate } from "@/lib/format";
import type { ContributionType } from "@/types/birthday";

export default function InvitePage() {
  const params = useParams<{ inviteCode: string }>();
  const inviteCode = params.inviteCode;
  const hydrated = useHasHydrated();
  const page = usePageByInviteCode(inviteCode);

  return (
    <div className="flex min-h-screen flex-col">
      <MinimalTopBar centered linkHome={false} />
      <main className="flex-1 px-5">
        {!hydrated ? (
          <div className="flex flex-1 items-center justify-center py-24">
            <p className="text-[14px] text-text-secondary font-sans">Loading…</p>
          </div>
        ) : !page ? (
          <div className="flex flex-1 items-center justify-center py-24 text-center">
            <h1 className="font-serif text-[24px] text-text-primary max-w-[360px]">
              This invite link isn&apos;t active anymore.
            </h1>
          </div>
        ) : (
          <InviteContent pageId={page.id} inviteCode={inviteCode} />
        )}
      </main>
    </div>
  );
}

function InviteContent({ pageId, inviteCode }: { pageId: string; inviteCode: string }) {
  const page = usePageByInviteCode(inviteCode);
  const [submitted, setSubmitted] = useState(false);

  if (!page) return null;

  return (
    <div className="mx-auto max-w-[480px] pb-20">
      <div className="pt-10 md:pt-10 pb-4 text-center">
        {page.recipientPhotoUrl && (
          <Avatar
            name={page.recipientName}
            photoUrl={page.recipientPhotoUrl}
            size={96}
            ringed
            className="mx-auto mb-4"
          />
        )}
        <h1 className="font-serif text-[24px] md:text-[28px] text-text-primary max-w-[400px] mx-auto">
          Leave a birthday message for {page.recipientName}
        </h1>
        <p className="mt-3 text-[15px] text-text-secondary font-sans">
          Their birthday is {formatLongDate(page.birthdayDate)}. Add a video or a few words —
          it&apos;ll be a surprise.
        </p>
        {page.welcomeNote && (
          <p className="mt-5 border-l-4 border-accent rounded-[8px] pl-3 py-1 text-left text-[14px] italic text-text-secondary max-w-[360px] mx-auto font-sans">
            {page.welcomeNote}
          </p>
        )}
      </div>

      {submitted ? (
        <ConfirmationState recipientName={page.recipientName} onReset={() => setSubmitted(false)} />
      ) : (
        <SubmissionForm
          pageId={pageId}
          recipientName={page.recipientName}
          onSubmitted={() => setSubmitted(true)}
        />
      )}
    </div>
  );
}

function SubmissionForm({
  pageId,
  recipientName,
  onSubmitted,
}: {
  pageId: string;
  recipientName: string;
  onSubmitted: () => void;
}) {
  const [type, setType] = useState<ContributionType | null>(null);
  const [name, setName] = useState("");
  const [textContent, setTextContent] = useState("");
  const [video, setVideo] = useState<VideoUploadValue | null>(null);

  const hasContent = type === "video" ? Boolean(video) : textContent.trim().length > 0;
  const canSubmit = Boolean(type) && name.trim().length > 0 && hasContent;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit || !type) return;

    addContribution({
      birthdayPageId: pageId,
      contributorName: name.trim(),
      type,
      videoUrl: type === "video" ? video?.objectUrl : undefined,
      videoDurationSeconds: type === "video" ? video?.durationSeconds : undefined,
      textContent: type === "text" ? textContent.trim() : undefined,
    });
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10">
      <ContributionTypeSelect value={type} onChange={setType} />

      {type && (
        <div className="mt-5 space-y-4 animate-fade-in">
          <Input
            label={`So ${firstName(recipientName)} knows who this is from`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          {type === "video" ? (
            <VideoUpload value={video} onChange={setVideo} />
          ) : (
            <Textarea
              rows={4}
              maxLength={500}
              showCount
              placeholder="Write your birthday message..."
              value={textContent}
              onChange={(event) => setTextContent(event.target.value)}
            />
          )}
        </div>
      )}

      <Button type="submit" fullWidth className="mt-8" disabled={!canSubmit}>
        Send Message
      </Button>
    </form>
  );
}

function ConfirmationState({
  recipientName,
  onReset,
}: {
  recipientName: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-10 text-center animate-fade-in">
      <span className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent text-accent">
        <IconCheck size={20} aria-hidden />
      </span>
      <h1 className="font-serif text-[26px] text-text-primary">Your message is in</h1>
      <p className="mt-2 text-[15px] text-text-secondary font-sans">
        {firstName(recipientName)} will see it on their birthday. Thanks for being part of it.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[14px] text-text-primary underline-offset-4 hover:underline font-sans"
      >
        Send another message
      </button>
    </div>
  );
}
