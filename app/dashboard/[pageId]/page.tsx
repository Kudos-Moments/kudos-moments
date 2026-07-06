"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";
import { AuthenticatedNavbar } from "@/components/layout/AuthenticatedNavbar";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CopyLinkField } from "@/components/ui/CopyLinkField";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PhotoUpload } from "@/components/birthday/PhotoUpload";
import { ReminderNudgeBox } from "@/components/birthday/ReminderNudgeBox";
import { ContributionListRow } from "@/components/birthday/ContributionCard";
import { RequireOrganizer } from "@/components/auth/RequireOrganizer";
import { usePage, useContributionsForPage } from "@/lib/hooks";
import { formatLongDate } from "@/lib/format";
import { countdownTo, isPageLocked, pageStatus } from "@/lib/reveal-lock";
import { deletePage, forceUnlockPage, updatePage } from "@/lib/store";
import { cx } from "@/lib/utils";
import type { BirthdayPage, Organizer } from "@/types/birthday";

export default function DashboardPageDetail() {
  return (
    <RequireOrganizer>{(organizer) => <DetailContent organizer={organizer} />}</RequireOrganizer>
  );
}

function DetailContent({ organizer }: { organizer: Organizer }) {
  const params = useParams<{ pageId: string }>();
  const router = useRouter();
  const page = usePage(params.pageId);
  const contributions = useContributionsForPage(params.pageId);

  if (!page || page.organizerId !== organizer.id) {
    return (
      <div className="flex min-h-screen flex-col">
        <AuthenticatedNavbar organizer={organizer} />
        <main className="flex flex-1 items-center justify-center py-24 text-center px-5">
          <h1 className="font-serif text-[22px] text-text-primary">
            This birthday page couldn&apos;t be found.
          </h1>
        </main>
      </div>
    );
  }

  const status = pageStatus(page);
  const locked = isPageLocked(page);
  const daysUntil = countdownTo(page.birthdayDate).days;
  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/invite/${page.inviteCode}`
      : `/invite/${page.inviteCode}`;

  return (
    <div className="flex min-h-screen flex-col">
      <AuthenticatedNavbar organizer={organizer} />
      <main className="flex-1">
        <SectionContainer className="pt-12 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar name={page.recipientName} photoUrl={page.recipientPhotoUrl} size={64} />
              <h1 className="font-serif text-[22px] md:text-[24px] text-text-primary">
                {page.recipientName}
              </h1>
              <Badge status={status} />
            </div>
            <p className="text-[14px] text-text-secondary font-sans">
              {locked ? `${daysUntil} ${daysUntil === 1 ? "day" : "days"} until reveal` : "Revealed"}
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16 space-y-8">
          <Card className="p-6">
            <p className="text-[13px] uppercase tracking-wide text-text-secondary font-sans mb-3">
              Invite link
            </p>
            <CopyLinkField value={inviteLink} />
            <ReminderNudgeBox
              recipientName={page.recipientName}
              birthdayDate={formatLongDate(page.birthdayDate)}
              inviteLink={inviteLink}
            />
          </Card>

          <div>
            <h2 className="text-[18px] font-semibold text-text-primary font-sans mb-4">
              Contributions ({contributions.length})
            </h2>
            <div className="rounded-modal border border-border bg-surface overflow-hidden">
              {contributions.length === 0 ? (
                <p className="py-10 text-center text-[14px] text-text-secondary font-sans">
                  No messages yet. Share the invite link to get started.
                </p>
              ) : (
                contributions.map((contribution) => (
                  <ContributionListRow key={contribution.id} contribution={contribution} />
                ))
              )}
            </div>
          </div>

          <SettingsSection page={page} onDeleted={() => router.push("/dashboard")} />
        </SectionContainer>
      </main>
    </div>
  );
}

function SettingsSection({
  page,
  onDeleted,
}: {
  page: BirthdayPage;
  onDeleted: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(page.recipientName);
  const [date, setDate] = useState(page.birthdayDate);
  const [photoUrl, setPhotoUrl] = useState(page.recipientPhotoUrl);
  const [welcomeNote, setWelcomeNote] = useState(page.welcomeNote ?? "");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const locked = isPageLocked(page);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between py-2"
        aria-expanded={expanded}
      >
        <span className="text-[16px] font-semibold text-text-primary font-sans">Settings</span>
        <IconChevronDown
          size={18}
          className={cx(
            "text-text-secondary transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="mt-4 space-y-6 animate-fade-in">
          <FieldWithSave
            dirty={name.trim() !== page.recipientName}
            onSave={() => updatePage(page.id, { recipientName: name.trim() })}
          >
            <Input label="Recipient name" value={name} onChange={(e) => setName(e.target.value)} />
          </FieldWithSave>

          <FieldWithSave
            dirty={date !== page.birthdayDate}
            onSave={() => updatePage(page.id, { birthdayDate: date })}
          >
            <DatePicker label="Birthday date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FieldWithSave>

          <FieldWithSave
            dirty={photoUrl !== page.recipientPhotoUrl}
            onSave={() => updatePage(page.id, { recipientPhotoUrl: photoUrl })}
          >
            <PhotoUpload photoUrl={photoUrl} onChange={setPhotoUrl} />
          </FieldWithSave>

          <FieldWithSave
            dirty={welcomeNote.trim() !== (page.welcomeNote ?? "")}
            onSave={() => updatePage(page.id, { welcomeNote: welcomeNote.trim() || undefined })}
          >
            <Textarea
              label="Add a note contributors will see"
              rows={3}
              value={welcomeNote}
              onChange={(e) => setWelcomeNote(e.target.value)}
            />
          </FieldWithSave>

          <div className="mt-8 border-t border-border pt-6 space-y-4">
            <div>
              <Button
                variant="secondary"
                onClick={() => forceUnlockPage(page.id)}
                disabled={!locked}
              >
                Force unlock reveal early
              </Button>
            </div>

            {confirmingDelete ? (
              <div className="flex items-center gap-4">
                <p className="text-[14px] text-text-primary font-sans">
                  Delete this page and all its messages?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    deletePage(page.id);
                    onDeleted();
                  }}
                  className="text-[14px] font-medium text-accent-strong underline-offset-4 hover:underline font-sans"
                >
                  Confirm delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  className="text-[14px] text-text-secondary underline-offset-4 hover:underline font-sans"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="text-[14px] text-accent-strong underline-offset-4 hover:underline font-sans"
              >
                Delete this page
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FieldWithSave({
  dirty,
  onSave,
  children,
}: {
  dirty: boolean;
  onSave: () => void;
  children: React.ReactNode;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      {children}
      {dirty && !saved && (
        <button
          type="button"
          onClick={() => {
            onSave();
            setSaved(true);
            window.setTimeout(() => setSaved(false), 1500);
          }}
          className="mt-2 text-[13px] text-accent-strong underline-offset-4 hover:underline font-sans"
        >
          Save
        </button>
      )}
      {saved && <p className="mt-2 text-[13px] text-text-secondary font-sans">Saved</p>}
    </div>
  );
}
