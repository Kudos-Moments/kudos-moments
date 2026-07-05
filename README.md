# Kudos Moments

Collect birthday messages from everyone who matters, delivered together as one
surprise reveal on the recipient's birthday.

This is the production frontend for Kudos Moments, built with Next.js (App
Router), React, TypeScript, and Tailwind CSS v4.

## Source of truth

The UI, copy, and design tokens implemented here follow the specs and
mockups in [`docs/`](./docs):

- `docs/kudos-moments-birthday-spec.md` — product spec, data model, and copy
- `docs/kudos-moments-page-mockups.md` — page-by-page visual blueprints
- `docs/kudos_moments_*_mockup.html` — pixel-reference mockups per page
- `docs/assets/` — source brand assets (wordmark, mark)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Any email/password
combination works for log in and sign up — see [Data layer](#data-layer)
below.

## Pages implemented

- `/` — Home (marketing)
- `/how-it-works` — How It Works (marketing)
- `/about` — About (marketing)
- `/login`, `/signup` — Organizer authentication
- `/create` — Create Birthday flow (recipient details → confirm → invite link)
- `/dashboard` — Organizer dashboard (list of birthday pages)
- `/dashboard/[pageId]` — Page detail (invite link, contributions, settings)
- `/invite/[inviteCode]` — Public contributor submission page
- `/r/[revealCode]` — Public birthday reveal page (locked / unlocked)

## Data layer

This build ships as a frontend with no backend service. To make every flow
usable end-to-end in the browser, `lib/store.ts` and `lib/auth.ts` persist
birthday pages, contributions, and the organizer session to
`localStorage`, and `lib/seed.ts` seeds a few demo birthday pages the first
time the app loads so the Dashboard and Reveal pages aren't empty on first
visit. Because there's no real multi-tenant backend, every logged-in session
resolves to the same shared organizer id (see `lib/constants.ts`) so
demo data and anything you create line up under one dashboard.

Reveal locking is computed the same way the spec's API layer would: a page
is locked until its `birthdayDate` (or until the organizer force-unlocks it),
and no contribution content is rendered while locked.

## Project structure

```
app/            Routes (App Router)
components/
  ui/           Primitives: Button, Input, Textarea, DatePicker, Card, Badge, ...
  layout/       Navbar variants, Footer, SectionContainer
  marketing/    Hero, Steps, UseCaseGrid, CTASection, FaqAccordion
  birthday/     BirthdayPageCard, ContributionCard, VideoUpload, RevealViews, ...
  auth/         RequireOrganizer route guard
lib/            Store, auth, formatting, reveal-lock logic
types/          Shared BirthdayPage / Contribution types
docs/           Source-of-truth specs, mockups, and brand assets
```

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run lint    # ESLint
```
