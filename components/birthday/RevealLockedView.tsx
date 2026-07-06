import { Avatar } from "@/components/ui/Avatar";
import { Countdown } from "@/components/ui/Countdown";
import { formatLongDate } from "@/lib/format";

export function RevealLockedView({
  recipientName,
  recipientPhotoUrl,
  birthdayDate,
}: {
  recipientName: string;
  recipientPhotoUrl?: string;
  birthdayDate: string;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-16">
      <div className="mx-auto flex max-w-[400px] flex-col items-center text-center">
        <Avatar name={recipientName} photoUrl={recipientPhotoUrl} size={120} ringed />
        <h1 className="mt-6 font-serif text-[28px] text-text-primary">
          Something&apos;s coming for {recipientName}
        </h1>
        <div className="mt-6">
          <Countdown targetDate={birthdayDate} />
        </div>
        <p className="mt-6 text-[15px] text-text-secondary font-sans">
          Come back on {formatLongDate(birthdayDate)} to see it.
        </p>
      </div>
    </div>
  );
}
