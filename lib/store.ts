"use client";

import type { BirthdayPage, Contribution } from "@/types/birthday";
import { generateCapabilityCode, generateId } from "./ids";

const PAGES_KEY = "kudos_moments_pages";
const CONTRIBUTIONS_KEY = "kudos_moments_contributions";
const STORE_EVENT = "kudos_moments_store_changed";
const SEED_FLAG_KEY = "kudos_moments_seeded_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function read<T>(key: string): T[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

export function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// useSyncExternalStore requires getSnapshot to return a stable reference when
// the underlying data hasn't changed, so we cache the computed list alongside
// the raw string it was derived from.
let cachedPagesRaw: string | null = null;
let cachedPages: BirthdayPage[] = [];

export function getAllPages(): BirthdayPage[] {
  if (!isBrowser()) return cachedPages;
  const raw = window.localStorage.getItem(PAGES_KEY);
  if (raw === cachedPagesRaw) return cachedPages;
  cachedPagesRaw = raw;
  const pages = raw ? (JSON.parse(raw) as BirthdayPage[]) : [];
  cachedPages = pages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return cachedPages;
}

export function getPagesForOrganizer(organizerId: string): BirthdayPage[] {
  return getAllPages().filter((page) => page.organizerId === organizerId);
}

export function getPageById(pageId: string): BirthdayPage | undefined {
  return read<BirthdayPage>(PAGES_KEY).find((page) => page.id === pageId);
}

export function getPageByInviteCode(inviteCode: string): BirthdayPage | undefined {
  return read<BirthdayPage>(PAGES_KEY).find((page) => page.inviteCode === inviteCode);
}

export function getPageByRevealCode(revealCode: string): BirthdayPage | undefined {
  return read<BirthdayPage>(PAGES_KEY).find((page) => page.revealCode === revealCode);
}

export interface CreatePageInput {
  organizerId: string;
  recipientName: string;
  birthdayDate: string;
  recipientPhotoUrl?: string;
  welcomeNote?: string;
}

export function createPage(input: CreatePageInput): BirthdayPage {
  const now = new Date().toISOString();
  const page: BirthdayPage = {
    id: generateId("page"),
    organizerId: input.organizerId,
    recipientName: input.recipientName,
    birthdayDate: input.birthdayDate,
    recipientPhotoUrl: input.recipientPhotoUrl,
    welcomeNote: input.welcomeNote,
    inviteCode: generateCapabilityCode(),
    revealCode: generateCapabilityCode(),
    createdAt: now,
    updatedAt: now,
  };
  const pages = read<BirthdayPage>(PAGES_KEY);
  pages.push(page);
  write(PAGES_KEY, pages);
  return page;
}

export function updatePage(
  pageId: string,
  patch: Partial<Omit<BirthdayPage, "id" | "organizerId" | "inviteCode" | "revealCode" | "createdAt">>
): BirthdayPage | undefined {
  const pages = read<BirthdayPage>(PAGES_KEY);
  const index = pages.findIndex((page) => page.id === pageId);
  if (index === -1) return undefined;
  pages[index] = { ...pages[index], ...patch, updatedAt: new Date().toISOString() };
  write(PAGES_KEY, pages);
  return pages[index];
}

export function forceUnlockPage(pageId: string): BirthdayPage | undefined {
  return updatePage(pageId, { forceUnlockedAt: new Date().toISOString() });
}

export function deletePage(pageId: string) {
  const pages = read<BirthdayPage>(PAGES_KEY).filter((page) => page.id !== pageId);
  write(PAGES_KEY, pages);
  const contributions = read<Contribution>(CONTRIBUTIONS_KEY).filter(
    (contribution) => contribution.birthdayPageId !== pageId
  );
  write(CONTRIBUTIONS_KEY, contributions);
}

export function getContributionsForPage(pageId: string): Contribution[] {
  return read<Contribution>(CONTRIBUTIONS_KEY)
    .filter((contribution) => contribution.birthdayPageId === pageId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export interface AddContributionInput {
  birthdayPageId: string;
  contributorName: string;
  type: "video" | "text";
  videoUrl?: string;
  videoDurationSeconds?: number;
  textContent?: string;
}

export function addContribution(input: AddContributionInput): Contribution {
  const contribution: Contribution = {
    id: generateId("contrib"),
    birthdayPageId: input.birthdayPageId,
    contributorName: input.contributorName,
    type: input.type,
    videoUrl: input.videoUrl,
    videoDurationSeconds: input.videoDurationSeconds,
    textContent: input.textContent,
    createdAt: new Date().toISOString(),
  };
  const contributions = read<Contribution>(CONTRIBUTIONS_KEY);
  contributions.push(contribution);
  write(CONTRIBUTIONS_KEY, contributions);
  return contribution;
}

export function hasSeeded(): boolean {
  if (!isBrowser()) return true;
  return window.localStorage.getItem(SEED_FLAG_KEY) === "1";
}

export function markSeeded() {
  if (!isBrowser()) return;
  window.localStorage.setItem(SEED_FLAG_KEY, "1");
}

export function seedPages(pages: BirthdayPage[], contributions: Contribution[]) {
  write(PAGES_KEY, pages);
  write(CONTRIBUTIONS_KEY, contributions);
  markSeeded();
}
