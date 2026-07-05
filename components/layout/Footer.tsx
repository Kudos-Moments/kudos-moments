import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-5 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          <div>
            <Wordmark />
            <p className="mt-3 text-[14px] text-text-secondary max-w-[220px]">
              One link. Every message. One moment.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] uppercase tracking-wide text-text-secondary">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-[14px] text-text-primary hover:underline"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] uppercase tracking-wide text-text-secondary">Company</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-[14px] text-text-primary hover:underline">
                  About
                </Link>
              </li>
            </ul>

            <h3 className="mt-6 text-[13px] uppercase tracking-wide text-text-secondary">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="text-[14px] text-text-primary">Privacy</li>
              <li className="text-[14px] text-text-primary">Terms</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-[13px] text-text-secondary">
          © Kudos Moments. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
