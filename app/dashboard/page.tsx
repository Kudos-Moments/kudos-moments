"use client";

import { AuthenticatedNavbar } from "@/components/layout/AuthenticatedNavbar";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { BirthdayPageCard } from "@/components/birthday/BirthdayPageCard";
import { RequireOrganizer } from "@/components/auth/RequireOrganizer";
import { usePagesForOrganizer, useContributionsForPage } from "@/lib/hooks";
import type { Organizer, BirthdayPage } from "@/types/birthday";

export default function DashboardPage() {
  return (
    <RequireOrganizer>{(organizer) => <DashboardContent organizer={organizer} />}</RequireOrganizer>
  );
}

function DashboardContent({ organizer }: { organizer: Organizer }) {
  const pages = usePagesForOrganizer(organizer.id);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthenticatedNavbar organizer={organizer} />
      <main className="flex-1">
        <SectionContainer className="pt-12 pb-6 md:pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="font-serif text-[24px] md:text-[30px] text-text-primary">
              Your Birthday Pages
            </h1>
            <Button href="/create" className="w-full md:w-auto">
              Create a Birthday Page
            </Button>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16">
          {pages.length === 0 ? (
            <EmptyState
              title="You haven't created a birthday page yet."
              action={<Button href="/create">Create a Birthday Page</Button>}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pages.map((page) => (
                <DashboardCard key={page.id} page={page} />
              ))}
            </div>
          )}
        </SectionContainer>
      </main>
    </div>
  );
}

function DashboardCard({ page }: { page: BirthdayPage }) {
  const contributions = useContributionsForPage(page.id);
  return <BirthdayPageCard page={page} contributionCount={contributions.length} />;
}
