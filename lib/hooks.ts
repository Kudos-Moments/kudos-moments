"use client";

import { useSyncExternalStore } from "react";
import * as store from "./store";
import * as auth from "./auth";
import { buildSeedData } from "./seed";
import type { Organizer } from "@/types/birthday";

function noopSubscribe() {
  return () => {};
}

/** True once the client has hydrated, without violating setState-in-effect rules. */
function useHasHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

let seedRequested = false;

function ensureSeeded() {
  if (seedRequested) return;
  seedRequested = true;
  if (!store.hasSeeded()) {
    const { pages, contributions } = buildSeedData();
    store.seedPages(pages, contributions);
  }
}

function subscribeToStore(callback: () => void) {
  ensureSeeded();
  return store.subscribe(callback);
}

const EMPTY_PAGES: ReturnType<typeof store.getAllPages> = [];

export function useAllPages() {
  return useSyncExternalStore(subscribeToStore, store.getAllPages, () => EMPTY_PAGES);
}

export function usePagesForOrganizer(organizerId: string | undefined) {
  const pages = useAllPages();
  if (!organizerId) return [];
  return pages.filter((page) => page.organizerId === organizerId);
}

export function usePage(pageId: string | undefined) {
  const pages = useAllPages();
  return pageId ? pages.find((page) => page.id === pageId) : undefined;
}

export function usePageByInviteCode(inviteCode: string) {
  const pages = useAllPages();
  return pages.find((page) => page.inviteCode === inviteCode);
}

export function usePageByRevealCode(revealCode: string) {
  const pages = useAllPages();
  return pages.find((page) => page.revealCode === revealCode);
}

export function useContributionsForPage(pageId: string | undefined) {
  useAllPages();
  return pageId ? store.getContributionsForPage(pageId) : [];
}

export function useSession(): { organizer: Organizer | null; ready: boolean } {
  const hydrated = useHasHydrated();
  const organizer = useSyncExternalStore(auth.onAuthChange, auth.getSession, () => null);
  return { organizer: hydrated ? organizer : null, ready: hydrated };
}

export { useHasHydrated };
