"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Wordmark } from "./Wordmark";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export function MarketingNavbar({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparentOnTop) return;
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 h-[72px] transition-colors duration-150",
        scrolled ? "bg-surface border-b border-border" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-12">
        <Wordmark />

        <nav className="hidden md:flex items-center gap-6 font-sans text-[15px] text-text-secondary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text-primary transition-colors duration-150">
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="hover:text-text-primary transition-colors duration-150">
            Log In
          </Link>
          <Button href="/signup" size="sm">
            Get Started
          </Button>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-text-primary"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-background z-30 animate-fade-in">
          <nav className="flex flex-col items-center gap-8 pt-16 font-sans text-[18px] text-text-primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Log In
            </Link>
            <Button href="/signup" size="lg" onClick={() => setMenuOpen(false)}>
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
