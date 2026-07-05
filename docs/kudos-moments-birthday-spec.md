# KUDOS MOMENTS — BIRTHDAY VIDEO CARD
## Production Build Specification (v1 / MVP)

**One-line positioning:** A simple way to collect birthday messages from friends and deliver them as one shared surprise moment.

This document is the single source of truth for Version 1. It supersedes any prior "memory archive / gratitude journal" concept. There is no journaling, no mood or category tagging, no private archive, and no "Explore" feed anywhere in this product.

---

## TABLE OF CONTENTS

1. Product Summary
2. Information Architecture
3. UX Flows
4. Pages (full production copy)
5. Data Model
6. Design System
7. Component Library
8. Next.js App Router Architecture
9. Tailwind Setup
10. Database Schema (Prisma)
11. API Routes
12. Authentication
13. Storage
14. Deployment
15. Implementation Order (Build in 10 Steps)

---

## 1. PRODUCT SUMMARY

Kudos Moments lets an **Organizer** create a birthday page for someone, invite friends and family to contribute short video or text messages, and deliver everything as one combined experience on the recipient's actual birthday.

The product exists for exactly one job: **collect birthday messages from everyone who matters, and deliver them as a single surprise reveal.**

**Roles**
- **Organizer** — creates the birthday page, manages it, holds an account
- **Contributor** — submits a video or text message via invite link, no account required
- **Recipient** — receives the reveal link on the birthday, no account required to view

**In scope (MVP):** Create Birthday Page, Shareable Invite Link, Video Upload, Text Message, Organizer Dashboard, Scheduled Birthday Reveal, mobile-first, no contributor login.

**Out of scope (v1):** social networking features, AI, video editing, payments, gift marketplace, live chat, comments.

**Brand feel:** warm, human, minimal, premium, calm. Reference points: Apple Invitations, Paperless Post. Explicitly not Facebook, not a social feed.

---

## 2. INFORMATION ARCHITECTURE

### Site map

```
/                          Home (marketing)
/how-it-works              How It Works (marketing)
/about                     About (marketing)
/create                    Create Birthday (auth required)
/dashboard                 Organizer Dashboard (auth required)
/dashboard/[pageId]        Individual birthday page management
/invite/[inviteCode]       Invite / Contributor submission page (public, no auth)
/r/[revealCode]            Birthday Reveal page (public, locked until date)
/login                     Organizer login
/signup                    Organizer signup
```

### Route access rules

| Route | Auth | Notes |
|---|---|---|
| `/`, `/how-it-works`, `/about` | Public | Marketing, no auth |
| `/login`, `/signup` | Public | Organizer auth only |
| `/create` | Organizer only | Redirects to `/login` if unauthenticated |
| `/dashboard`, `/dashboard/[pageId]` | Organizer only | Scoped to owned pages |
| `/invite/[inviteCode]` | Public, no account | Anyone with the link can submit |
| `/r/[revealCode]` | Public, no account | Locked view before birthday date, unlocked view on/after |

---

## 3. UX FLOWS

### 3.1 Organizer flow (primary)

1. Organizer signs up or logs in
2. Organizer clicks **Create a Birthday Page**
3. Enters recipient name, birthday date, optional recipient photo, optional welcome note
4. System generates a unique invite link (`/invite/[inviteCode]`) and a unique reveal link (`/r/[revealCode]`)
5. Organizer shares the invite link (copy link, or share via text/email/social — link only, no in-app messaging)
6. Organizer lands on the Dashboard for that page, sees contributions arrive in real time
7. Organizer can send a reminder nudge (copy a pre-written text) before the birthday
8. On the birthday date, the reveal page unlocks automatically
9. Organizer shares the reveal link with the recipient (or the recipient may already have it if they were sent it in advance, sealed)

### 3.2 Contributor flow (no account)

1. Contributor opens the invite link
2. Sees recipient name, birthday date, and a short prompt ("Leave a birthday message for [Name]")
3. Chooses **Record/Upload a Video** or **Write a Message**
4. Adds their name (required, so the recipient knows who it's from)
5. Submits
6. Sees a confirmation screen: "Your message is in. [Name] will see it on their birthday."
7. No login, no account creation, no password, at any point

### 3.3 Recipient flow

1. Recipient receives the reveal link (from the organizer, via any channel outside the app)
2. Before the birthday date: sees a locked/countdown state, no contributions visible
3. On or after the birthday date: page unlocks, all contributions play/display in sequence
4. Recipient can replay individual messages, no account required

### 3.4 Locking logic

- The reveal page is locked based on the `birthdayDate` stored on `BirthdayPage`, compared in the recipient's local timezone if available, otherwise the organizer's timezone at creation.
- Locked state shows: recipient name, a countdown, and zero contribution content (titles, senders, and message content are all hidden — not just blurred).
- Organizer can manually force-unlock early from the Dashboard (e.g., for time zone edge cases or an in-person gathering happening before the calendar date).

---

## 4. PAGES (FULL PRODUCTION COPY)

### 4.1 Home

**Sections:** Nav → Hero → How it works (3-step) → Example reveal preview → Use cases → Final CTA → Footer

**Nav:** Logo · How It Works · About · Log In · **Get Started** (primary button)

**Hero**
> Eyebrow: Birthdays, done together
> H1: Collect birthday messages from everyone who matters
> Sub: Invite friends and family to send a video or a few words. On their birthday, it all comes together as one surprise.
> Primary CTA: Create a Birthday Page
> Secondary: See how it works

**3-step section**
1. **Create** — Add their name and birthday, get a link in seconds.
2. **Collect** — Share the link. Everyone sends a video or a short message. No app, no account.
3. **Reveal** — On the big day, it all unlocks at once.

**Example reveal preview**
> Section label: What they'll see
> Static mockup of a reveal page card stack: sender name, thumbnail/first line, mood-free plain presentation (no mood/category chips anywhere)

**Use cases**
- **Milestone birthdays** — Turn 30, 40, 50 into something everyone contributed to.
- **Long-distance friends** — Everyone's far away. The message still arrives together.
- **Family surprises** — Grandparents, cousins, old friends, one link away.
- **Work and team celebrations** — Collect messages from a whole team without a group chat.

**Final CTA**
> Headline: Start their birthday page
> Button: Create a Birthday Page

**Footer**
- Logo + tagline: "One link. Every message. One moment."
- Columns: Product (How It Works), Company (About), Legal (Privacy, Terms)

---

### 4.2 How It Works

**Sections:** Hero → Organizer steps → Contributor steps → Reveal explainer → FAQ → CTA

**Hero**
> Eyebrow: How It Works
> H1: One page. Everyone's message. One reveal.

**For organizers**
1. **Create the page** — Recipient's name, their birthday, done in under a minute.
2. **Share one link** — Text it, email it, post it wherever. No app required for anyone else.
3. **Watch it fill up** — See messages arrive on your dashboard as they come in.
4. **It unlocks itself** — On the birthday, the page reveals automatically.

**For contributors**
1. **Open the link** — No sign-up, no app download.
2. **Record or write** — A short video or a few written lines.
3. **Send it** — That's it. Done in under two minutes.

**Reveal explainer**
> Headline: Sealed until the day it matters
> Body: Every message stays hidden until the recipient's birthday. No previews, no early peeks — just one moment, all at once.

**FAQ**
- Do contributors need an account? — No. Anyone with the link can send a message directly.
- Can I see messages before the birthday? — No, not unless the organizer chooses to force-unlock early.
- What if someone doesn't have the app? — They don't need it. The invite link opens in any browser.
- Is there a limit to how many people can contribute? — Not in v1.

**CTA**
> Headline: Get their page started
> Button: Create a Birthday Page

---

### 4.3 About

**Sections:** Statement hero → Why we built this → Principles → CTA

**Hero**
> H1: Birthdays are better together

**Why section**
> Body: Group texts get messy. Cards get forgotten. Everyone means to send something and it gets lost in the noise. Kudos Moments gives one link, one place, and one moment when it all comes together.

**Principles**
- One link, no coordination — no group chats, no reminders you have to send yourself.
- No account required to contribute — the easier it is, the more people actually send something.
- Sealed until it matters — nothing leaks early, nothing gets spoiled.

**CTA**
> Headline: Start their page today
> Button: Create a Birthday Page

---

### 4.4 Create Birthday

**Layout:** single-column form, top progress indicator (2 steps), no live preview needed for v1 (kept simple).

**Step 1 — Recipient details**
> H1: Who's this for?
- Recipient name (required, text)
- Birthday date (required, date picker)
- Recipient photo (optional, single image upload)
- Welcome note (optional, textarea, shown to contributors — "Add a note contributors will see")

**Step 2 — Confirm & generate link**
> H1: Almost there
- Summary card showing recipient name + birthday
- Button: **Create Page & Get Invite Link**

**Post-creation confirmation**
> Headline: [Recipient]'s page is live
> Body: Share this link with anyone you want to contribute.
> Invite link display + Copy Link button
> Secondary button: Go to Dashboard

---

### 4.5 Invite Contributors (Contributor submission page — public)

Route: `/invite/[inviteCode]`

**Layout:** single column, mobile-first, no navigation chrome (minimal top bar with logo only, no links out).

**Header state**
> [Recipient photo if provided]
> H1: Leave a birthday message for [Recipient Name]
> Sub: Their birthday is [Date]. Add a video or a few words — it'll be a surprise.
> [Welcome note from organizer, if provided, shown as a quoted line]

**Submission form**
- Choice: **Record or Upload a Video** / **Write a Message** (two clear tappable options, not a dropdown)
- Your name (required, text — "So [Recipient] knows who this is from")
- If video: `VideoUpload` component (record via device camera or upload existing file)
- If text: textarea, 500 char max, placeholder "Write your birthday message..."
- Submit button: **Send Message**

**Confirmation state (post-submit)**
> Headline: Your message is in
> Body: [Recipient] will see it on their birthday. Thanks for being part of it.
> Optional secondary action: "Send another message" (in case someone wants to add both video and text) — v1 allows multiple contributions per contributor by re-visiting the link.

**Error/edge states**
- Invite link invalid or page deleted: "This invite link isn't active anymore."
- Upload failure: inline retry message, no data loss (form state preserved)

---

### 4.6 Birthday Reveal (public)

Route: `/r/[revealCode]`

**Locked state (before birthday date)**
> [Recipient photo if provided, presented large]
> H1: Something's coming for [Recipient Name]
> Countdown: Days / Hours until reveal
> Body: Come back on [Date] to see it.
> No contribution content rendered at all in this state (not hidden via CSS — not present in the DOM response).

**Unlocked state (on/after birthday date)**
> H1: Happy Birthday, [Recipient Name]
> Sub: [Count] people sent you something.
> Sequential/grid display of contributions:
> - Video contributions: inline video player, sender name below
> - Text contributions: styled message card, sender name below
> Optional "Play all" mode that advances through video messages in sequence, similar to a slideshow
> No comments, no reactions, no sharing-within-app — this is a private, closed viewing experience for the recipient.

---

### 4.7 Organizer Dashboard

Route: `/dashboard` (list) and `/dashboard/[pageId]` (detail)

**Dashboard list (`/dashboard`)**
> H1: Your Birthday Pages
> Grid/list of `BirthdayPageCard`: recipient name, photo, birthday date, contribution count, status badge (Collecting / Locked / Revealed)
> Button: **Create a Birthday Page**
> Empty state: "You haven't created a birthday page yet." + CTA

**Page detail (`/dashboard/[pageId]`)**
Sections:
1. Header: recipient name, birthday date, days remaining, status badge
2. Invite link block: link display, Copy Link, "Send a reminder" (copies a pre-written nudge message to clipboard for the organizer to paste anywhere)
3. Contributions list: sender name, type (video/text), submitted date, preview/play — organizer CAN view early (organizer view is not locked; only the recipient-facing reveal link is locked)
4. Settings: edit recipient name/date/photo/welcome note, force-unlock reveal early, delete page

**Copy for reminder nudge (pre-written, copy-to-clipboard):**
> "Quick reminder — I'm collecting birthday messages for [Recipient]'s birthday on [Date]. Takes 2 minutes, no app needed: [Invite Link]"

---

### 4.8 Login / Signup

**Login**
> H1: Log in
> Email + password fields (or magic link, see Section 12)
> Link: Don't have an account? Sign up

**Signup**
> H1: Create your account
> Name, email, password
> Button: Create Account
> Link: Already have an account? Log in

---

## 5. DATA MODEL

Core entities: **BirthdayPage**, **Contribution**, with `Contribution` supporting two payload shapes (**VideoMessage**, **TextMessage**) via a discriminated `type` field rather than separate top-level models — this keeps queries and the reveal-rendering logic simple.

```ts
type ContributionType = "video" | "text";

interface BirthdayPage {
  id: string;
  organizerId: string;
  recipientName: string;
  birthdayDate: string;        // ISO date
  recipientPhotoUrl?: string;
  welcomeNote?: string;
  inviteCode: string;          // unique, used in /invite/[inviteCode] — contributor submission only
  revealCode: string;          // unique, cryptographically random, unguessable — used in /r/[revealCode], recipient viewing only
  isRevealLocked: boolean;     // true unless forceUnlocked or birthdayDate has passed
  forceUnlockedAt?: string;    // set if organizer manually unlocks early
  createdAt: string;
  updatedAt: string;
}

interface Contribution {
  id: string;
  birthdayPageId: string;
  contributorName: string;
  type: ContributionType;
  // VideoMessage payload
  videoUrl?: string;
  videoDurationSeconds?: number;
  // TextMessage payload
  textContent?: string;
  createdAt: string;
}
```

Note: `VideoMessage` and `TextMessage` are represented as typed payload shapes on `Contribution.type`, not separate database tables — a contributor submission is always exactly one `Contribution` row.

---

## 6. DESIGN SYSTEM

### Colors

| Token | Value | Usage |
|---|---|---|
| `background` | `#FAF7F2` | Page background |
| `surface` | `#FFFFFF` | Cards, inputs, modals |
| `text-primary` | `#1C1C1C` | Headings, primary text |
| `text-secondary` | `#6B6B6B` | Subtext, captions, metadata |
| `accent` | `#C8A96A` | Primary buttons, active states, highlights |
| `border` | `#EAE6DF` | Card borders, dividers, input borders |

### Typography

- Headings: serif (Playfair Display or Canela substitute)
- Body/UI: Inter (or Inter-style sans)

| Style | Font | Size (desktop/mobile) | Weight | Line height |
|---|---|---|---|---|
| H1 | Serif | 48 / 32px | 600 | 1.15 |
| H2 | Serif | 34 / 26px | 600 | 1.2 |
| H3 | Serif | 24 / 20px | 600 | 1.25 |
| H4 (card title) | Serif | 18px | 600 | 1.3 |
| Body | Sans | 16px | 400 | 1.6 |
| Small / Caption | Sans | 13px | 400 | 1.5 |
| Button label | Sans | 15px | 500 | 1 |

### Spacing (8px grid)

`4, 8, 16, 24, 32, 48, 64, 96` px. Card padding 24px. Section vertical padding 96px desktop / 48px mobile. Grid gap 24px.

### Radius

- Cards, inputs, buttons: 12px
- Modals, uploads: 16px
- Status badges/pills: 999px (full)

### Buttons

**Primary** — background `accent`, text `#1C1C1C`, radius 12px, padding 12px 24px, hover darkens ~8%, 150ms fade.
**Secondary** — transparent background, 1px `border`, hover fills `surface`.
**Text link** — no background, underline on hover.

### Inputs

- Background `surface`, 1px `border`, radius 12px, padding 12px 16px
- Focus: border → `accent`, no glow/shadow

### Cards

- Background `surface`, 1px `border`, radius 16px, no box-shadow
- Hover (interactive only): background shifts ~2% darker, 150ms fade, no lift/scale

### Motion

- Fade only: opacity + 4–8px translateY on scroll-in, 150–250ms, no bounce/spring

---

## 7. COMPONENT LIBRARY

### UI primitives (`components/ui/`)
- `Button` (primary, secondary, text variants)
- `Input`, `Textarea`, `DatePicker`
- `Card`
- `Badge` (status: Collecting / Locked / Revealed)
- `ProgressSteps` (2-step Create Birthday indicator)
- `CopyLinkField` (input + copy button + "Copied" toast state)
- `Countdown` (days/hours until a target date)
- `EmptyState`

### Feature components (`components/birthday/`)
- `BirthdayPageCard` — dashboard list item (recipient photo, name, date, status, contribution count)
- `BirthdayCreateForm` — 2-step create flow
- `ContributionTypeSelect` — Video / Text choice control on invite page
- `VideoUpload` — camera capture or file upload, compression, progress bar
- `TextMessageInput` — textarea with char count
- `ContributionCard` — renders a single contribution (video or text) in dashboard or reveal contexts
- `RevealLockedView` — countdown + recipient photo, no contribution data
- `RevealUnlockedView` — grid/sequence of `ContributionCard`s + optional "Play all"
- `ReminderNudgeBox` — pre-written copyable reminder text

### Layout (`components/layout/`)
- `Navbar` (marketing variant with links; minimal variant for invite/reveal pages with logo only)
- `Footer`
- `SectionContainer`

### Marketing (`components/marketing/`)
- `Hero`
- `StepRow`
- `UseCaseGrid`
- `CTASection`
- `FaqAccordion`

---

## 8. NEXT.JS APP ROUTER ARCHITECTURE

```
kudos-moments/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # Home
│   ├── how-it-works/page.tsx
│   ├── about/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (organizer)/
│   │   ├── create/page.tsx
│   │   ├── dashboard/page.tsx
│   │   └── dashboard/[pageId]/page.tsx
│   ├── invite/[inviteCode]/page.tsx    # public, no auth
│   ├── r/[revealCode]/page.tsx         # public, no auth
│   └── api/
│       ├── birthday-pages/route.ts               # POST create, GET list (organizer-scoped)
│       ├── birthday-pages/[pageId]/route.ts       # GET/PATCH/DELETE
│       ├── birthday-pages/[pageId]/unlock/route.ts # POST force-unlock
│       ├── invite/[inviteCode]/route.ts           # GET public page info for contributor view
│       ├── contributions/route.ts                 # POST new contribution (public)
│       ├── contributions/[pageId]/route.ts        # GET all contributions (organizer only)
│       ├── reveal/[revealCode]/route.ts           # GET locked/unlocked reveal data (public)
│       └── upload/route.ts                        # video/image upload handler
├── components/
│   ├── ui/
│   ├── birthday/
│   ├── layout/
│   └── marketing/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validators.ts                   # zod schemas
│   └── reveal-lock.ts                  # shared logic: is a page locked right now?
├── prisma/
│   └── schema.prisma
├── styles/
│   └── globals.css
├── types/
│   └── birthday.ts
└── tailwind.config.ts
```

**Route group notes**
- `(auth)` and `(organizer)` are route groups for organizing layout/middleware, not URL segments.
- `/invite/[inviteCode]` and `/r/[revealCode]` are intentionally outside any auth-required group — middleware must explicitly allow these as public.

---

## 9. TAILWIND SETUP

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: "#FAF7F2",
      surface: "#FFFFFF",
      "text-primary": "#1C1C1C",
      "text-secondary": "#6B6B6B",
      accent: "#C8A96A",
      border: "#EAE6DF",
    },
    fontFamily: {
      serif: ["var(--font-serif)", "serif"],
      sans: ["var(--font-sans)", "sans-serif"],
    },
    borderRadius: {
      card: "12px",
      modal: "16px",
    },
  },
}
```

Fonts loaded via `next/font` (Playfair Display + Inter), exposed as `--font-serif` / `--font-sans` CSS variables in `app/layout.tsx`.

---

## 10. DATABASE SCHEMA (PRISMA)

```prisma
model Organizer {
  id            String         @id @default(cuid())
  name          String
  email         String         @unique
  passwordHash  String?
  createdAt     DateTime       @default(now())
  birthdayPages BirthdayPage[]
}

model BirthdayPage {
  id                String         @id @default(cuid())
  organizerId       String
  organizer         Organizer      @relation(fields: [organizerId], references: [id])
  recipientName     String
  birthdayDate      DateTime
  recipientPhotoUrl String?
  welcomeNote       String?
  inviteCode        String         @unique
  revealCode        String         @unique
  forceUnlockedAt   DateTime?
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
  contributions     Contribution[]

  @@index([organizerId])
}

model Contribution {
  id                   String       @id @default(cuid())
  birthdayPageId       String
  birthdayPage         BirthdayPage @relation(fields: [birthdayPageId], references: [id])
  contributorName      String
  type                 String       // "video" | "text"
  videoUrl             String?
  videoDurationSeconds Int?
  textContent          String?
  createdAt            DateTime     @default(now())

  @@index([birthdayPageId])
}
```

`isRevealLocked` is intentionally **not** a stored column — it's computed at request time from `birthdayDate` and `forceUnlockedAt` (see `lib/reveal-lock.ts`), so it can never drift out of sync with the current date.

---

## 11. API ROUTES

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/birthday-pages` | POST | Organizer | Create a new birthday page, generates `inviteCode` |
| `/api/birthday-pages` | GET | Organizer | List organizer's own pages for dashboard |
| `/api/birthday-pages/[pageId]` | GET | Organizer | Fetch page detail for dashboard |
| `/api/birthday-pages/[pageId]` | PATCH | Organizer | Edit recipient name/date/photo/welcome note |
| `/api/birthday-pages/[pageId]` | DELETE | Organizer | Delete page and its contributions |
| `/api/birthday-pages/[pageId]/unlock` | POST | Organizer | Force-unlock reveal early |
| `/api/invite/[inviteCode]` | GET | Public | Returns recipient name, birthday date, photo, welcome note (never contribution data) |
| `/api/contributions` | POST | Public | Submit a video or text contribution against an `inviteCode` |
| `/api/contributions/[pageId]` | GET | Organizer | List all contributions for dashboard view |
| `/api/reveal/[revealCode]` | GET | Public | Returns locked state (countdown only) or full contribution list, based on server-computed lock status |
| `/api/upload` | POST | Public (invite context) | Handles video/image upload, returns storage URL |

**Critical security rule:** `/api/reveal/[revealCode]` must compute lock status server-side on every request and must not include contribution data in the response payload at all while locked — not just omit it in the UI. The client never receives content it isn't allowed to show yet.

---

## 12. AUTHENTICATION

- **Organizers only** require accounts. Email + password via NextAuth (Credentials provider) for v1, or email magic link as a lower-friction alternative — either is acceptable for MVP; magic link recommended to reduce signup friction given the "premium, calm" brand goal.
- **Contributors never authenticate.** The `inviteCode` in the URL is the only credential needed to submit a contribution, via `/invite/[inviteCode]`. Treat it as a capability token: unguessable (cryptographically random, 21+ chars), not sequential.
- **Recipients never authenticate.** The `revealCode` in the URL is the only credential needed to view the reveal, via `/r/[revealCode]`. Treat it as a separate capability token from `inviteCode`, equally unguessable (cryptographically random, 21+ chars), not sequential.
- **Access model is strictly separated by purpose:** `inviteCode` grants contribution access only and is never valid for viewing the reveal; `revealCode` grants reveal viewing access only and is never valid for submitting a contribution. Neither code is interchangeable with the other.
- **The internal `pageId` is never exposed in any public route.** It is used only in organizer-authenticated routes (`/dashboard/[pageId]`, `/api/birthday-pages/[pageId]`, etc.). Public-facing URLs use `inviteCode` or `revealCode` exclusively.
- Session handling: standard NextAuth JWT session for organizers; no session/cookie state needed for contributor or recipient flows.

---

## 13. STORAGE

- Video and image uploads go to a dedicated storage bucket (Supabase Storage or S3-compatible).
- Client-side: compress/transcode video where feasible before upload to control file size (e.g., cap resolution, use browser `MediaRecorder` constraints for direct recording).
- Server-side: `/api/upload` validates file type (`video/mp4`, `video/webm`, `image/jpeg`, `image/png`) and enforces a max size (recommend 100MB video, 5MB image for v1).
- Store only the resulting storage URL in `Contribution.videoUrl` / `BirthdayPage.recipientPhotoUrl` — never store raw files in the database.
- Signed/expiring URLs are not required for v1 since reveal-gating is enforced at the API layer (locked pages never return URLs to the client in the first place).

---

## 14. DEPLOYMENT

- **Hosting:** Vercel (native Next.js App Router support)
- **Database:** Supabase Postgres (or any managed Postgres) via Prisma, connection pooled for serverless (e.g., Prisma Accelerate or PgBouncer)
- **Storage:** Supabase Storage bucket, public-read for unlocked assets only accessed via server-issued URLs
- **Environment variables:** `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, storage bucket credentials, email provider credentials (for magic link / reminder emails if added)
- **Cron/scheduled task:** a daily (or hourly) job is not strictly required since lock status is computed on-request, but an optional scheduled job can pre-send "your page unlocks today" notification emails to organizers
- **Domains:** `kudosmoments.com` for marketing/app; consider whether `/invite/*` and `/r/*` links should be shortened for shareability (phase 2)

---

## 15. IMPLEMENTATION ORDER (BUILD IN 10 STEPS)

1. **Landing page** — Home, How It Works, About (static marketing, no auth, establishes brand and copy)
2. **Authentication** — Organizer signup/login, session handling
3. **Create Birthday flow** — `/create` form, `BirthdayPage` creation, invite code generation
4. **Invite page** — `/invite/[inviteCode]` public view, recipient info display
5. **Contributor submissions** — text message submission end-to-end (simplest path first, no media handling yet)
6. **Video upload** — add video recording/upload to the invite flow, storage integration
7. **Dashboard** — `/dashboard` list + `/dashboard/[pageId]` detail, contributions list, invite link management
8. **Scheduled reveal** — `/r/[revealCode]` locked/unlocked states, server-side lock computation, force-unlock control
9. **Emails/reminders** — reminder nudge copy tool, optional "it unlocks today" email to organizer, optional confirmation email to contributor
10. **Polish and deployment** — responsive/mobile-first pass, empty/error states, Vercel deployment, production environment setup
