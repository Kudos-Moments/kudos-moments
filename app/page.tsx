import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Hero } from "@/components/marketing/Hero";
import { StepGrid } from "@/components/marketing/Steps";
import { ExampleRevealPreview } from "@/components/marketing/ExampleRevealPreview";
import { UseCaseGrid } from "@/components/marketing/UseCaseGrid";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "Kudos Moments — Collect birthday messages from everyone who matters",
};

const STEPS = [
  { title: "Create", body: "Add their name and birthday, get a link in seconds." },
  {
    title: "Collect",
    body: "Share the link. Everyone sends a video or a short message. No app, no account.",
  },
  { title: "Reveal", body: "On the big day, it all unlocks at once." },
];

const USE_CASES = [
  {
    lead: "Milestone birthdays.",
    body: "Turn 30, 40, 50 into something everyone contributed to.",
  },
  {
    lead: "Long-distance friends.",
    body: "Everyone's far away. The message still arrives together.",
  },
  {
    lead: "Family surprises.",
    body: "Grandparents, cousins, old friends, one link away.",
  },
  {
    lead: "Work and team celebrations.",
    body: "Collect messages from a whole team without a group chat.",
  },
];

export default function HomePage() {
  return (
    <>
      <MarketingNavbar transparentOnTop />
      <main>
        <Hero />

        <SectionContainer className="py-14 md:py-24">
          <StepGrid steps={STEPS} />
        </SectionContainer>

        <ExampleRevealPreview />

        <SectionContainer className="py-14 md:py-24">
          <h2 className="text-center font-serif text-[26px] md:text-[34px] text-text-primary mb-8 md:mb-10">
            Made for every kind of celebration
          </h2>
          <UseCaseGrid items={USE_CASES} />
        </SectionContainer>

        <CTASection headline="Start their birthday page" />
      </main>
      <Footer />
    </>
  );
}
