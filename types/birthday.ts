export type ContributionType = "video" | "text";

export interface BirthdayPage {
  id: string;
  organizerId: string;
  recipientName: string;
  birthdayDate: string; // ISO date, YYYY-MM-DD
  recipientPhotoUrl?: string;
  welcomeNote?: string;
  inviteCode: string;
  revealCode: string;
  forceUnlockedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contribution {
  id: string;
  birthdayPageId: string;
  contributorName: string;
  type: ContributionType;
  videoUrl?: string;
  videoDurationSeconds?: number;
  textContent?: string;
  createdAt: string;
}

export type BirthdayPageStatus = "collecting" | "locked" | "revealed";

export interface Organizer {
  id: string;
  name: string;
  email: string;
}
