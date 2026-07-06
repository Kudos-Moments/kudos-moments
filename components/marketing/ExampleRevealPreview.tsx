import { IconVideo } from "@tabler/icons-react";

export function ExampleRevealPreview() {
  return (
    <section className="bg-surface py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-12">
        <p className="text-center text-[13px] uppercase tracking-[0.08em] text-text-secondary mb-8">
          What they&apos;ll see
        </p>
        <div className="relative mx-auto h-[150px] max-w-[420px]">
          <div
            className="hidden min-[480px]:block absolute inset-0 rounded-modal border border-border bg-background -rotate-3"
            aria-hidden
          />
          <div
            className="hidden min-[480px]:block absolute inset-0 rounded-modal border border-border bg-background rotate-2"
            aria-hidden
          />
          <div className="relative h-full rounded-modal border border-border bg-surface p-4">
            <div className="flex items-start justify-between">
              <p className="text-[14px] font-semibold text-text-primary font-sans">Maya Chen</p>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-strong/10 text-accent-strong">
                <IconVideo size={14} aria-hidden />
              </span>
            </div>
            <p className="mt-2 text-[14px] text-text-secondary leading-[1.4] line-clamp-2">
              Happy birthday!! Can&apos;t believe you&apos;re turning 30 — remember that trip
              to...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
