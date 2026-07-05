import type { Metadata } from "next";
import { IconLock } from "@tabler/icons-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { StepTimeline } from "@/components/marketing/Steps";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "How It Works — Kudos Moments",
};

const ORGANIZER_STEPS = [
  { title: "Create the page", body: "Recipient's name, their birthday, done in under a minute." },
  { title: "Share one link", body: "Text it, email it, post it wherever. No app required for anyone else." },
  { title: "Watch it fill up", body: "See messages arrive on your dashboard as they come in." },
  { title: "It unlocks itself", body: "On the birthday, the page reveals automatically." },
];

const CONTRIBUTOR_STEPS = [
  { title: "Open the link", body: "No sign-up, no app download." },
  { title: "Record or write", body: "A short video or a few written lines." },
  { title: "Send it", body: "That's it. Done in under two minutes." },
];

const FAQ_ITEMS = [
  {
    question: "Do contributors need an account?",
    answer: "No. Anyone with the link can send a message directly.",
  },
  {
    question: "Can I see messages before the birthday?",
    answer: "No, not unless the organizer chooses to force-unlock early.",
  },
  {
    question: "What if someone doesn't have the app?",
    answer: "They don't need it. The invite link opens in any browser.",
  },
  {
    question: "Is there a limit to how many people can contribute?",
    answer: "Not in v1.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <MarketingNavbar />
      <main>
        <SectionContainer className="py-16 md:py-20">
          <div className="max-w-[600px]">
            <p className="text-[13px] uppercase tracking-[0.08em] text-accent-strong font-sans">
              How It Works
            </p>
            <h1 className="mt-4 font-serif text-[28px] md:text-[40px] leading-[1.2] text-text-primary">
              One page. Everyone&apos;s message. One reveal.
            </h1>
          </div>
        </SectionContainer>

        <SectionContainer className="py-12 md:py-20">
          <div className="max-w-[720px]">
            <p className="text-[13px] uppercase tracking-wide text-text-secondary font-sans mb-8">
              For organizers
            </p>
            <StepTimeline steps={ORGANIZER_STEPS} />
          </div>
        </SectionContainer>

        <section className="bg-surface py-12 md:py-20">
          <SectionContainer>
            <div className="max-w-[720px]">
              <p className="text-[13px] uppercase tracking-wide text-text-secondary font-sans mb-8">
                For contributors
              </p>
              <StepTimeline steps={CONTRIBUTOR_STEPS} />
            </div>
          </SectionContainer>
        </section>

        <SectionContainer className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-[24px] md:text-[28px] text-text-primary">
                Sealed until the day it matters
              </h2>
              <p className="mt-4 max-w-[440px] text-[16px] text-text-secondary leading-[1.6]">
                Every message stays hidden until the recipient&apos;s birthday. No previews, no
                early peeks — just one moment, all at once.
              </p>
            </div>
            <div className="order-first md:order-last flex justify-center">
              <div className="flex flex-col items-center gap-3 rounded-modal border border-border bg-surface px-10 py-8">
                <IconLock size={28} className="text-text-secondary" aria-hidden />
                <span className="font-serif text-[22px] text-text-primary">3 days</span>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="py-12 md:py-20">
          <div className="mx-auto max-w-[680px]">
            <h2 className="text-center font-serif text-[28px] text-text-primary mb-8">
              Questions
            </h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </SectionContainer>

        <CTASection headline="Get their page started" />
      </main>
      <Footer />
    </>
  );
}
