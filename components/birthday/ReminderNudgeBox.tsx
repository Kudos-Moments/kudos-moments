"use client";

import { useState } from "react";

export function ReminderNudgeBox({
  recipientName,
  birthdayDate,
  inviteLink,
}: {
  recipientName: string;
  birthdayDate: string;
  inviteLink: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const message = `Quick reminder — I'm collecting birthday messages for ${recipientName}'s birthday on ${birthdayDate}. Takes 2 minutes, no app needed: ${inviteLink}`;
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Clipboard API unavailable in this environment.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="text-[14px] text-text-primary underline-offset-4 hover:underline font-sans"
      >
        Copy a reminder message
      </button>
      {copied && <span className="text-[13px] text-text-secondary font-sans">Copied</span>}
    </div>
  );
}
