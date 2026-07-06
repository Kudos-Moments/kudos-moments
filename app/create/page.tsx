"use client";

import { useState, type FormEvent } from "react";
import { MinimalTopBar } from "@/components/layout/MinimalTopBar";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyLinkField } from "@/components/ui/CopyLinkField";
import { PhotoUpload } from "@/components/birthday/PhotoUpload";
import { Avatar } from "@/components/ui/Avatar";
import { RequireOrganizer } from "@/components/auth/RequireOrganizer";
import { formatLongDate } from "@/lib/format";
import { createPage } from "@/lib/store";
import type { BirthdayPage, Organizer } from "@/types/birthday";

type Stage = "details" | "confirm" | "done";

export default function CreatePage() {
  return (
    <RequireOrganizer>
      {(organizer) => <CreateFlow organizer={organizer} />}
    </RequireOrganizer>
  );
}

function CreateFlow({ organizer }: { organizer: Organizer }) {
  const [stage, setStage] = useState<Stage>("details");
  const [recipientName, setRecipientName] = useState("");
  const [birthdayDate, setBirthdayDate] = useState("");
  const [recipientPhotoUrl, setRecipientPhotoUrl] = useState<string | undefined>(undefined);
  const [welcomeNote, setWelcomeNote] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [createdPage, setCreatedPage] = useState<BirthdayPage | null>(null);

  const currentStep = stage === "details" ? 1 : 2;

  function handleContinue(event: FormEvent) {
    event.preventDefault();
    let hasError = false;
    if (!recipientName.trim()) {
      setNameError("Recipient name is required.");
      hasError = true;
    } else {
      setNameError("");
    }
    if (!birthdayDate) {
      setDateError("Birthday date is required.");
      hasError = true;
    } else {
      setDateError("");
    }
    if (hasError) return;
    setStage("confirm");
  }

  function handleCreate() {
    const page = createPage({
      organizerId: organizer.id,
      recipientName: recipientName.trim(),
      birthdayDate,
      recipientPhotoUrl,
      welcomeNote: welcomeNote.trim() || undefined,
    });
    setCreatedPage(page);
    setStage("done");
  }

  const inviteLink =
    typeof window !== "undefined" && createdPage
      ? `${window.location.origin}/invite/${createdPage.inviteCode}`
      : createdPage
      ? `/invite/${createdPage.inviteCode}`
      : "";

  return (
    <div className="flex min-h-screen flex-col">
      <MinimalTopBar
        rightSlot={stage !== "done" ? <ProgressSteps current={currentStep} total={2} /> : undefined}
      />

      <main className="flex-1 px-5 pb-28 md:pb-16">
        <div className="mx-auto max-w-[480px] pt-10 md:pt-16">
          {stage === "details" && (
            <form onSubmit={handleContinue} noValidate>
              <h1 className="font-serif text-[26px] md:text-[32px] text-text-primary mb-8">
                Who&apos;s this for?
              </h1>

              <div className="space-y-6">
                <Input
                  label="Recipient name"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  error={nameError}
                  required
                />
                <DatePicker
                  label="Birthday date"
                  value={birthdayDate}
                  onChange={(event) => setBirthdayDate(event.target.value)}
                  error={dateError}
                  required
                />
                <PhotoUpload photoUrl={recipientPhotoUrl} onChange={setRecipientPhotoUrl} />
                <Textarea
                  label="Add a note contributors will see"
                  rows={3}
                  maxLength={280}
                  value={welcomeNote}
                  onChange={(event) => setWelcomeNote(event.target.value)}
                  placeholder="Let's make her 30th one to remember..."
                />
              </div>

              <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface p-4 md:static md:border-0 md:bg-transparent md:p-0 md:mt-8 md:flex md:justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  Continue
                </Button>
              </div>
            </form>
          )}

          {stage === "confirm" && (
            <div>
              <h1 className="font-serif text-[26px] md:text-[32px] text-text-primary mb-8">
                Almost there
              </h1>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar name={recipientName || "?"} photoUrl={recipientPhotoUrl} size={48} />
                  <div>
                    <p className="text-[18px] font-semibold text-text-primary font-sans">
                      {recipientName}
                    </p>
                    <p className="text-[14px] text-text-secondary font-sans">
                      {formatLongDate(birthdayDate)}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface p-4 md:static md:border-0 md:bg-transparent md:p-0 md:mt-8">
                <Button onClick={handleCreate} fullWidth>
                  Create Page & Get Invite Link
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setStage("details")}
                className="mt-4 block w-full text-center text-[14px] text-text-primary underline-offset-4 hover:underline font-sans"
              >
                Back to edit
              </button>
            </div>
          )}

          {stage === "done" && createdPage && (
            <div>
              <h1 className="font-serif text-[26px] md:text-[32px] text-text-primary mb-3">
                {createdPage.recipientName}&apos;s page is live
              </h1>
              <p className="text-[16px] text-text-secondary font-sans mb-6">
                Share this link with anyone you want to contribute.
              </p>
              <CopyLinkField value={inviteLink} />
              <Button href="/dashboard" variant="secondary" fullWidth className="mt-4">
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
