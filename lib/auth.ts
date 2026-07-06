"use client";

import type { Organizer } from "@/types/birthday";
import { DEMO_ORGANIZER_ID } from "./constants";

const SESSION_KEY = "kudos_moments_session";
const AUTH_EVENT = "kudos_moments_auth_changed";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// useSyncExternalStore requires getSnapshot to return a stable reference when
// the underlying data hasn't changed, so we cache the parsed value alongside
// the raw string it was parsed from.
let cachedRaw: string | null = null;
let cachedSession: Organizer | null = null;

export function getSession(): Organizer | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (raw === cachedRaw) return cachedSession;
  cachedRaw = raw;
  try {
    cachedSession = raw ? (JSON.parse(raw) as Organizer) : null;
  } catch {
    cachedSession = null;
  }
  return cachedSession;
}

function setSession(organizer: Organizer) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(organizer));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

/**
 * Mock credentials auth: any well-formed email/password combination succeeds.
 * There's no real backend, so every session resolves to the single shared
 * demo organizer id — see lib/constants.ts.
 */
export function login(email: string): Organizer {
  const name = email.split("@")[0]?.replace(/[._]/g, " ") || "Organizer";
  const organizer: Organizer = {
    id: DEMO_ORGANIZER_ID,
    name: titleCase(name),
    email,
  };
  setSession(organizer);
  return organizer;
}

export function signup(name: string, email: string): Organizer {
  const organizer: Organizer = { id: DEMO_ORGANIZER_ID, name, email };
  setSession(organizer);
  return organizer;
}

export function logout() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function onAuthChange(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
