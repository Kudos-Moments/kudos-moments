import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="pt-16 pb-12 md:pt-[120px] md:pb-12 text-center">
      <div className="mx-auto max-w-[680px] px-5">
        <p className="text-[13px] uppercase tracking-[0.08em] text-accent-strong font-sans">
          Birthdays, done together
        </p>
        <h1 className="mt-4 font-serif text-[32px] md:text-[48px] leading-[1.15] text-text-primary max-w-[600px] mx-auto">
          Collect birthday messages from everyone who matters
        </h1>
        <p className="mt-5 text-[18px] leading-[1.6] text-text-secondary max-w-[480px] mx-auto">
          Invite friends and family to send a video or a few words. On their birthday, it all
          comes together as one surprise.
        </p>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-5">
          <Button href="/create" size="lg" fullWidth className="md:w-auto">
            Create a Birthday Page
          </Button>
          <Link
            href="/how-it-works"
            className="text-[14px] text-text-primary underline-offset-4 hover:underline font-sans"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
