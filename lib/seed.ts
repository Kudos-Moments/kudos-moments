import type { BirthdayPage, Contribution } from "@/types/birthday";
import { generateCapabilityCode, generateId } from "./ids";
import { DEMO_ORGANIZER_ID } from "./constants";

export const DEMO_ORGANIZER = {
  id: DEMO_ORGANIZER_ID,
  name: "Alex Johnson",
  email: "alex@example.com",
};

function isoDateInDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function isoTimestampDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/**
 * Deterministic demo content so the Dashboard, Reveal, and Invite pages have
 * something real to show on first load, covering the Collecting / Locked /
 * Revealed states referenced in the spec.
 */
export function buildSeedData(): { pages: BirthdayPage[]; contributions: Contribution[] } {
  const mayaId = generateId("page");
  const robertId = generateId("page");
  const roseId = generateId("page");

  const pages: BirthdayPage[] = [
    {
      id: mayaId,
      organizerId: DEMO_ORGANIZER.id,
      recipientName: "Maya Chen",
      birthdayDate: isoDateInDays(41),
      welcomeNote: "Let's make her 30th one to remember. Keep it short and sweet!",
      inviteCode: generateCapabilityCode(),
      revealCode: generateCapabilityCode(),
      createdAt: isoTimestampDaysAgo(6),
      updatedAt: isoTimestampDaysAgo(1),
    },
    {
      id: robertId,
      organizerId: DEMO_ORGANIZER.id,
      recipientName: "Robert Kim",
      birthdayDate: isoDateInDays(4),
      welcomeNote: undefined,
      inviteCode: generateCapabilityCode(),
      revealCode: generateCapabilityCode(),
      createdAt: isoTimestampDaysAgo(20),
      updatedAt: isoTimestampDaysAgo(2),
    },
    {
      id: roseId,
      organizerId: DEMO_ORGANIZER.id,
      recipientName: "Grandma Rose",
      birthdayDate: isoDateInDays(-2),
      welcomeNote: "Everyone, keep it under a minute so we can fit them all in!",
      inviteCode: generateCapabilityCode(),
      revealCode: generateCapabilityCode(),
      createdAt: isoTimestampDaysAgo(30),
      updatedAt: isoTimestampDaysAgo(2),
    },
  ];

  const contributions: Contribution[] = [
    {
      id: generateId("contrib"),
      birthdayPageId: mayaId,
      contributorName: "Priya Nair",
      type: "video",
      videoDurationSeconds: 24,
      createdAt: isoTimestampDaysAgo(4),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: mayaId,
      contributorName: "Jordan Ellis",
      type: "text",
      textContent: "Happy bday!! Can't wait to celebrate this weekend, love you tons.",
      createdAt: isoTimestampDaysAgo(3),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: mayaId,
      contributorName: "Sam Rivera",
      type: "text",
      textContent: "30 looks good on you. Love you lots — can't believe it's been ten years since college.",
      createdAt: isoTimestampDaysAgo(2),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: mayaId,
      contributorName: "Dad",
      type: "video",
      videoDurationSeconds: 11,
      createdAt: isoTimestampDaysAgo(1),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: robertId,
      contributorName: "Lena Kim",
      type: "text",
      textContent: "Happy birthday Dad! See you at dinner on Saturday.",
      createdAt: isoTimestampDaysAgo(5),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: robertId,
      contributorName: "Marcus Kim",
      type: "video",
      videoDurationSeconds: 18,
      createdAt: isoTimestampDaysAgo(2),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: robertId,
      contributorName: "Ava Chen",
      type: "text",
      textContent: "Wishing you the best birthday yet. Thank you for always being there for us.",
      createdAt: isoTimestampDaysAgo(1),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: roseId,
      contributorName: "Priya Nair",
      type: "video",
      videoDurationSeconds: 32,
      createdAt: isoTimestampDaysAgo(10),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: roseId,
      contributorName: "Tommy Rose",
      type: "text",
      textContent: "Happy birthday Grandma! Thank you for the stories, the cooking, and all the love over the years.",
      createdAt: isoTimestampDaysAgo(9),
    },
    {
      id: generateId("contrib"),
      birthdayPageId: roseId,
      contributorName: "The Whole Family",
      type: "video",
      videoDurationSeconds: 46,
      createdAt: isoTimestampDaysAgo(8),
    },
  ];

  return { pages, contributions };
}
