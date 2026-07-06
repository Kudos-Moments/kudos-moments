import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "About — Kudos Moments",
};

const PRINCIPLES = [
  {
    lead: "One link, no coordination",
    body: "no group chats, no reminders you have to send yourself.",
  },
  {
    lead: "No account required to contribute",
    body: "the easier it is, the more people actually send something.",
  },
  {
    lead: "Sealed until it matters",
    body: "nothing leaks early, nothing gets spoiled.",
  },
];

export default function AboutPage() {
  return (
    <>
      <MarketingNavbar />
      <main>
        <SectionContainer className="py-16 md:py-[120px] text-center">
          <h1 className="mx-auto max-w-[720px] font-serif text-[30px] md:text-[44px] leading-[1.2] font-semibold text-text-primary">
            Birthdays are better together
          </h1>
        </SectionContainer>

        <SectionContainer className="py-10 md:py-16 text-center">
          <p className="mx-auto max-w-[560px] text-[17px] leading-[1.7] text-text-secondary">
            Group texts get messy. Cards get forgotten. Everyone means to send something and it
            gets lost in the noise. Kudos Moments gives one link, one place, and one moment when
            it all comes together.
          </p>
        </SectionContainer>

        <SectionContainer className="pb-16 md:pb-20">
          <div className="mx-auto max-w-[640px] border-t border-border pt-8 space-y-6">
            {PRINCIPLES.map((principle) => (
              <p key={principle.lead} className="text-[16px] leading-[1.6] text-text-primary">
                <span className="font-semibold">{principle.lead}</span> — {principle.body}
              </p>
            ))}
          </div>
        </SectionContainer>

        <CTASection headline="Start their page today" />
      </main>
      <Footer />
    </>
  );
}
