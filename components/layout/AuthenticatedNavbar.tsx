"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { initials } from "@/lib/format";
import { logout } from "@/lib/auth";
import type { Organizer } from "@/types/birthday";

export function AuthenticatedNavbar({ organizer }: { organizer: Organizer }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="h-[72px] border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-12">
        <Wordmark href="/dashboard" />

        <div className="relative" ref={containerRef}>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Account menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 font-sans text-[11px] font-semibold text-text-primary"
          >
            {initials(organizer.name)}
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-44 rounded-card border border-border bg-surface py-1 shadow-none animate-fade-in"
            >
              <div className="px-4 py-2 border-b border-border">
                <p className="text-[13px] font-medium text-text-primary truncate">
                  {organizer.name}
                </p>
                <p className="text-[12px] text-text-secondary truncate">{organizer.email}</p>
              </div>
              <button
                role="menuitem"
                type="button"
                className="w-full text-left px-4 py-2 text-[14px] text-text-primary hover:bg-background"
                onClick={() => setOpen(false)}
              >
                Settings
              </button>
              <button
                role="menuitem"
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-[14px] text-text-primary hover:bg-background"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
