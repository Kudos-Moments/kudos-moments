import { countdownTo } from "@/lib/reveal-lock";

export function Countdown({ targetDate }: { targetDate: string }) {
  const { days, hours } = countdownTo(targetDate);
  return (
    <div className="flex items-center gap-[10px]" role="group" aria-label="Countdown to reveal">
      <CountdownBlock value={days} label="Days" />
      <CountdownBlock value={hours} label="Hours" />
    </div>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-surface border border-border rounded-card px-4 py-[14px] text-center min-w-[76px]">
      <div className="font-serif text-[32px] leading-none text-text-primary">{value}</div>
      <div className="mt-2 text-[11px] uppercase tracking-wide text-text-secondary font-sans">
        {label}
      </div>
    </div>
  );
}
