import type { BirthdayPage, BirthdayPageStatus } from "@/types/birthday";

/**
 * Shared logic: is a page locked right now?
 * A page unlocks once the current local date is on/after birthdayDate,
 * or immediately if the organizer has force-unlocked it early.
 */
export function isPageLocked(page: Pick<BirthdayPage, "birthdayDate" | "forceUnlockedAt">): boolean {
  if (page.forceUnlockedAt) return false;
  const today = startOfToday();
  const birthday = new Date(`${page.birthdayDate}T00:00:00`);
  return today.getTime() < birthday.getTime();
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export interface Countdown {
  days: number;
  hours: number;
}

export function countdownTo(isoDate: string): Countdown {
  const target = new Date(`${isoDate}T00:00:00`);
  const now = new Date();
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return { days, hours };
}

/**
 * Maps the underlying binary lock state onto the three dashboard badge
 * labels (Collecting / Locked / Revealed). The spec's data model only
 * tracks a single locked/unlocked flag, so "Collecting" vs "Locked" is a
 * presentational distinction: pages more than a week from the reveal read
 * as actively collecting messages, pages inside the final week read as
 * sealed and waiting.
 */
export function pageStatus(
  page: Pick<BirthdayPage, "birthdayDate" | "forceUnlockedAt">
): BirthdayPageStatus {
  if (!isPageLocked(page)) return "revealed";
  const today = startOfToday();
  const birthday = new Date(`${page.birthdayDate}T00:00:00`);
  const daysUntil = Math.round(
    (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntil <= 7 ? "locked" : "collecting";
}
