# KUDOS MOMENTS — PAGE MOCKUPS (WIREFRAME + UI SPEC)

This document converts the existing MVP build spec into high-fidelity, page-by-page visual blueprints. No routes, data model, API structure, UX flows, or feature scope have changed — this is a visual/UI layer only, built on top of the same product logic.

**Design system note:** the brand identity doc (`KUDOS MOMENTS — FULL BRAND IDENTITY SYSTEM`) specifies a slightly different palette than the original build spec — warm off-white background, soft black text, and a warm coral accent rather than gold. These mockups use that palette, since it's the most recently confirmed brand source. Flag if you want to revert to the gold accent from the earlier spec.

### Design tokens used throughout

| Token | Value | Usage |
|---|---|---|
| `bg` | `#FAF7F5` | Page background |
| `surface` | `#FFFFFF` | Cards, inputs, modals |
| `text-primary` | `#1C1C1C` | Headings, body text |
| `text-secondary` | `#6B6B6B` | Subtext, captions, metadata |
| `accent` | `#FF6B6B` | Primary buttons, active states, links |
| `border` | `#EAE6DF` | Card borders, dividers |
| Radius | `12px` (cards/inputs/buttons), `16px` (modals/uploads), full (badges) |
| Type | Headings: Inter/SF Pro Display, semibold — Body: Inter/SF Pro Text, regular |
| Motion | Fade + 4–8px translateY on scroll-in, 150–250ms, no bounce/scale/shadow-lift |

No heavy shadows anywhere. No gradients. Borders, not elevation, separate surfaces.

---

## HOME PAGE — MOCKUP

### Layout structure
```
┌─────────────────────────────────────────────┐
│ NAV (sticky, transparent → bg on scroll)     │
├─────────────────────────────────────────────┤
│                                               │
│              HERO (centered)                 │
│                                               │
├─────────────────────────────────────────────┤
│        3-STEP EXPLANATION (3-col)            │
├─────────────────────────────────────────────┤
│     EXAMPLE REVEAL PREVIEW (card stack)      │
├─────────────────────────────────────────────┤
│         USE CASES (2x2 grid)                 │
├─────────────────────────────────────────────┤
│      FINAL CTA (full-width tinted band)      │
├─────────────────────────────────────────────┤
│ FOOTER (3-column + bottom bar)               │
└─────────────────────────────────────────────┘
```

### Nav
- Height: 72px, horizontal padding 48px desktop / 20px mobile
- Left: wordmark "kudos moments" (lowercase, Inter semibold, 18px, `text-primary`)
- Right (desktop): text links "How It Works" · "About" — 15px, `text-secondary`, then "Log In" (text link) and **Get Started** (primary button, `accent` bg, `#FFFFFF` text, 12px radius, padding 10px 20px)
- Mobile: wordmark left, single hamburger icon right (opens full-screen nav overlay, `bg` background)
- Background: transparent over hero, transitions to `surface` with 1px bottom `border` once scrolled past hero (150ms fade)

### Hero
- Centered column, max-width 680px, top padding 120px desktop / 64px mobile
- Eyebrow: "Birthdays, done together" — 13px, uppercase, letter-spacing 0.08em, `accent`, centered
- H1: "Collect birthday messages from everyone who matters" — 48px/32px mobile, Inter semibold, `text-primary`, centered, line-height 1.15, max-width 600px
- Subtext: "Invite friends and family to send a video or a few words. On their birthday, it all comes together as one surprise." — 18px, `text-secondary`, centered, max-width 480px, margin-top 20px
- Button row (margin-top 32px): primary button **Create a Birthday Page** (accent bg, 12px radius, padding 14px 28px, 16px label) + text link "See how it works" (underline on hover) directly beside it on desktop, stacked below on mobile
- No hero image/illustration — hero is text-only, per "feels like a message, not a platform" brand principle

### 3-Step Explanation
- Section padding: 96px vertical desktop / 56px mobile
- 3-column grid, 32px gap, stacks to 1 column on mobile with 48px gap between
- Each step card: no border, no background — plain text block, left-aligned within its column
  - Small numeral "1" — 14px, `accent`, weight 600
  - H3: "Create" — 22px, Inter semibold, `text-primary`
  - Body: "Add their name and birthday, get a link in seconds." — 15px, `text-secondary`, line-height 1.6
- Repeat for **Collect** and **Reveal** per existing copy

### Example Reveal Preview
- Section background: `surface` band, full-width, padding 96px/56px vertical
- Section label: "What they'll see" — 13px uppercase `text-secondary`, centered, margin-bottom 32px
- Content: a static card stack mockup, centered, max-width 420px, slightly offset/fanned (2–3 cards peeking behind the front card, rotated ±2–3deg, `surface` bg with 1px `border`, 16px radius) — represents the reveal page's message cards without being interactive
- Front card example content:
  - Sender name: "Maya Chen" — 14px semibold, `text-primary`
  - Message preview: "Happy birthday!! Can't believe you're turning 30 — remember that trip to..." (text truncated at 2 lines, 14px, `text-secondary`)
  - Small video-camera icon badge, top-right corner of card, indicating a video message

### Use Cases
- Section padding: 96px/56px vertical
- H2 centered: "Made for every kind of celebration" — 34px/26px, `text-primary`
- 2x2 grid desktop (24px gap), 1-column mobile (16px gap)
- Each item: `surface` card, 1px `border`, 16px radius, padding 24px, no icon graphics (content over decoration) — instead a bolded lead-in word
  - **Milestone birthdays.** Turn 30, 40, 50 into something everyone contributed to.
  - **Long-distance friends.** Everyone's far away. The message still arrives together.
  - **Family surprises.** Grandparents, cousins, old friends, one link away.
  - **Work and team celebrations.** Collect messages from a whole team without a group chat.
- Hover: card background shifts ~2% darker, 150ms fade, no lift

### Final CTA
- Full-width band, background: `accent` at 8% opacity over `bg` (soft tint, not solid coral)
- Padding: 80px vertical
- Centered: H2 "Start their birthday page" — 34px, `text-primary`
- Button below, centered: **Create a Birthday Page** (primary style)

### Footer
- Background `bg`, top border 1px `border`, padding 64px top / 32px bottom
- 3-column desktop (wordmark+tagline / Product / Company+Legal), stacks to single column mobile with 32px gap between groups
- Wordmark repeated small (16px) + tagline "One link. Every message. One moment." — 14px `text-secondary`
- Column headers 13px uppercase `text-secondary`; links 14px `text-primary`, no underline default, underline on hover
- Bottom bar: 1px top `border`, padding-top 24px, "© Kudos Moments. All rights reserved." — 13px `text-secondary`, centered

### Mobile-first notes
- All section padding halves on mobile (96px → 48px, 64px → 32px)
- Hero button row stacks vertically, full-width buttons
- Card stack in "Example Reveal Preview" reduces to a single flat card (no fan effect) on screens under 480px, to avoid overflow

---

## HOW IT WORKS PAGE — MOCKUP

### Layout structure
```
┌─────────────────────────────────────┐
│ NAV (same as home, non-transparent) │
├─────────────────────────────────────┤
│         PAGE HERO (left-aligned)     │
├─────────────────────────────────────┤
│  FOR ORGANIZERS (4-step vertical)    │
├─────────────────────────────────────┤
│  FOR CONTRIBUTORS (3-step vertical)  │
├─────────────────────────────────────┤
│     REVEAL EXPLAINER (2-col)         │
├─────────────────────────────────────┤
│         FAQ (accordion)              │
├─────────────────────────────────────┤
│              CTA BAND                │
├─────────────────────────────────────┤
│              FOOTER                  │
└─────────────────────────────────────┘
```

### Page hero
- Left-aligned (unlike Home's centered hero, to differentiate a marketing sub-page from the primary landing moment), max-width 600px, padding-left matches nav (48px desktop / 20px mobile)
- Eyebrow: "How It Works" — 13px uppercase `accent`
- H1: "One page. Everyone's message. One reveal." — 40px/28px mobile, `text-primary`
- Top/bottom padding: 80px/40px mobile

### For Organizers (4-step vertical)
- Section padding 80px/48px vertical, max-width 720px, left-aligned under a section label "For organizers" (13px uppercase `text-secondary`)
- Each step is a horizontal row: numeral column (left, 48px wide, `accent` numeral 20px) + content column (title 18px semibold `text-primary`, body 15px `text-secondary` below)
- 32px vertical gap between rows; a thin 1px `border` vertical line connects the numerals top-to-bottom (subtle timeline feel, justified since these are genuinely sequential setup steps)
- Steps: Create the page / Share one link / Watch it fill up / It unlocks itself (copy exactly as in build spec)

### For Contributors (3-step vertical)
- Same row pattern as above, section label "For contributors," 3 rows instead of 4
- Positioned as a mirrored/secondary block — background tinted `surface` (full-width band) to visually separate "your job" vs. "their job"

### Reveal explainer
- 2-column layout desktop (text left 50%, simple static right panel showing a locked-card mockup: a `surface` card, 16px radius, containing a lock glyph — simple line icon, not skeuomorphic — and a countdown-style "3 days" label), stacks to single column mobile (text first, visual below)
- H2: "Sealed until the day it matters" — 28px
- Body: existing copy, 16px `text-secondary`, max-width 440px

### FAQ
- Section padding 80px/48px, max-width 680px, centered
- H2: "Questions" — 28px, centered, margin-bottom 32px
- Accordion component: each row is a full-width button (left-aligned question text 16px semibold `text-primary`, right-aligned chevron 16px `text-secondary`), 1px bottom `border` divider between rows, no border around the whole accordion
- Expanded state: answer text fades in below (200ms), 15px `text-secondary`, padding-top 8px, padding-bottom 20px
- Default state: all collapsed

### CTA band + Footer
- Identical component to Home's Final CTA and Footer, headline swapped to "Get their page started"

---

## ABOUT PAGE — MOCKUP

### Layout structure
```
┌───────────────────────────────────┐
│ NAV                                │
├───────────────────────────────────┤
│   STATEMENT HERO (centered,        │
│   large single-line headline)      │
├───────────────────────────────────┤
│   WHY WE BUILT THIS (1-col text)   │
├───────────────────────────────────┤
│   PRINCIPLES (3-row list)          │
├───────────────────────────────────┤
│   CTA BAND                         │
├───────────────────────────────────┤
│   FOOTER                           │
└───────────────────────────────────┘
```

### Statement hero
- Centered, max-width 720px, padding 120px/56px mobile vertical
- Single H1 line only, no subtext, no button: "Birthdays are better together" — 44px/30px mobile, `text-primary`, weight 600, line-height 1.2
- This is the one page in the site allowed a slightly larger/quieter moment of pure typography — no competing elements

### Why we built this
- Centered column, max-width 560px, padding 64px/40px vertical
- Body copy only, 17px, `text-secondary`, line-height 1.7 (slightly larger line-height than standard body for a reflective/editorial feel)
- No card, no background — just text on `bg`

### Principles
- 3 rows, max-width 640px, centered, 24px gap between rows
- Each row: bold lead-in phrase inline with body text (kept as prose rather than a feature list)
  - "**One link, no coordination** — no group chats, no reminders you have to send yourself."
  - "**No account required to contribute** — the easier it is, the more people actually send something."
  - "**Sealed until it matters** — nothing leaks early, nothing gets spoiled."
- 1px top `border` divider above the block to separate from the prose section above, no border between individual rows

### CTA + Footer
- Same components as other marketing pages, headline "Start their page today"

---

## CREATE BIRTHDAY PAGE — MOCKUP

### Layout structure
```
┌───────────────────────────────────┐
│ MINIMAL TOP BAR (logo + step count)│
├───────────────────────────────────┤
│                                     │
│      FORM (single column,          │
│      centered, max-width 480px)    │
│                                     │
├───────────────────────────────────┤
│  STICKY BOTTOM ACTION (mobile only)│
└───────────────────────────────────┘
```

### Top bar
- Height 64px, padding 20px horizontal
- Left: wordmark, small (16px), links back to Home
- Right: `ProgressSteps` component — two small dots/segments, filled `accent` for current+completed step, `border`-colored for upcoming — labeled subtly "Step 1 of 2" in 13px `text-secondary` beside the dots
- No nav links, no login/signup buttons — this is a focused task screen, not a marketing page

### Step 1 — Recipient details
- Centered column, max-width 480px, top padding 64px/32px mobile
- H1: "Who's this for?" — 32px/26px mobile, `text-primary`, margin-bottom 32px
- Form fields, 24px vertical gap between each:
  1. **Recipient name** — label 14px `text-secondary` above input; `Input` component (surface bg, 1px border, 12px radius, 12px/16px padding, 16px text)
  2. **Birthday date** — label above; `DatePicker` component, same visual treatment as Input, calendar icon right-aligned inside field
  3. **Recipient photo** (optional) — label "Recipient photo (optional)"; upload well: dashed 1px `border`, 12px radius, 96px height, centered "+" icon and "Add a photo" text 14px `text-secondary`; once uploaded, shows a 64px circular thumbnail + "Change" text link
  4. **Welcome note** (optional) — label "Add a note contributors will see"; `Textarea`, 3 rows visible, autogrow, same border/radius treatment as Input
- Primary button below form, full-width on mobile / auto-width right-aligned on desktop: **Continue**

### Step 2 — Confirm & generate link
- Same column width/position as Step 1
- H1: "Almost there" — 32px/26px
- Summary `Card`: `surface` bg, 1px `border`, 16px radius, padding 24px — shows recipient photo (if any, 48px circle, left) + recipient name (18px semibold) + birthday date (14px `text-secondary`) in a single row
- Primary button below card, full-width: **Create Page & Get Invite Link**
- Text link below button, centered, 14px: "Back to edit"

### Post-creation confirmation (same screen, replaces Step 2 content)
- H1: "[Recipient]'s page is live" — 32px, `text-primary`
- Body: "Share this link with anyone you want to contribute." — 16px `text-secondary`
- `CopyLinkField` component: `surface` input containing the full invite URL (truncated with ellipsis if long), 12px radius, with a solid **Copy Link** button docked to the right edge inside the same field container (button: `accent` bg, 12px radius matching field's right corners only, 14px label "Copy Link", changes to "Copied" with a checkmark for 2s on click)
- Secondary button below, full-width: **Go to Dashboard** (secondary style: transparent bg, 1px border)

### Mobile-first notes
- Form column becomes full-width minus 20px side padding
- Sticky bottom bar holds the primary action button (Continue / Create Page) pinned to viewport bottom with `surface` bg + top `border`, so the CTA is always reachable without scrolling on small screens

---

## INVITE CONTRIBUTOR PAGE — MOCKUP
### Route: `/invite/[inviteCode]`

### Layout structure
```
┌─────────────────────────────────┐
│ MINIMAL TOP BAR (logo only)      │
├───────────────────────────────── │
│  RECIPIENT HEADER (photo + copy) │
├───────────────────────────────── │
│  SUBMISSION FORM                 │
│  (type choice, fields, submit)   │
└─────────────────────────────────┘
```
This page has no footer and no outbound navigation — it is a single-purpose task screen. Single column throughout, max-width 480px, centered, mobile-first by default (most contributors arrive from a phone via text/DM).

### Top bar
- Height 56px, centered wordmark only (14px), no links — this is intentionally the quietest chrome in the whole product

### Recipient header
- Padding 40px/24px mobile top, centered
- Recipient photo (if provided): 96px circle, centered, `border` ring 2px
- H1: "Leave a birthday message for Maya Chen" — 28px/24px mobile, `text-primary`, centered, max-width 400px
- Subtext: "Their birthday is August 14. Add a video or a few words — it'll be a surprise." — 15px `text-secondary`, centered, margin-top 12px
- Welcome note (if organizer added one): shown as an italic quoted line below, 14px `text-secondary`, max-width 360px, centered, margin-top 20px, prefixed with a small left-border accent bar (4px, `accent`, 8px radius) rather than literal quotation marks

### Submission form
- Margin-top 40px
- **Type choice**: two large tappable option cards side-by-side (50/50 split desktop, stacked full-width mobile, 12px gap)
  - Card A: "Record or Upload a Video" — centered icon (simple line camera glyph) + label 15px semibold, `surface` bg, 1px `border`, 16px radius, 80px height, becomes `accent`-bordered (2px) + subtle `accent`-tinted bg (6% opacity) when selected
  - Card B: "Write a Message" — same treatment, text-glyph icon
- **Your name** field appears once a type is chosen (fades in, 200ms): label "So Maya knows who this is from," `Input` component
- **Conditional field:**
  - If Video selected: `VideoUpload` component — large dashed-border well (160px height, 16px radius), centered record icon + "Tap to record or upload" 14px `text-secondary`; once a video is attached, shows an inline video thumbnail with a small progress bar during upload and a duration badge (bottom-right of thumbnail, e.g. "0:24")
  - If Text selected: `Textarea`, 4 rows visible, autogrow, placeholder "Write your birthday message...", character counter bottom-right of field, 12px `text-secondary` ("0/500")
- Primary button, full-width, margin-top 32px: **Send Message** (disabled/50%-opacity state until name + content are present)

### Confirmation state (replaces form after submit)
- Same centered column
- Simple checkmark glyph (line style, `accent`, 40px), centered, margin-bottom 16px
- H1: "Your message is in" — 26px, centered
- Body: "Maya will see it on their birthday. Thanks for being part of it." — 15px `text-secondary`, centered
- Text link below, centered, margin-top 24px: "Send another message" (14px, underline on hover) — returns to the type-choice state

### Error/edge states
- Invalid/inactive invite: replaces entire page content with centered message — H1 "This invite link isn't active anymore." 24px, no form rendered, no further action offered
- Upload failure: inline muted-terracotta text (from the `accent` family, not a harsh alert red) directly below the upload well: "Upload didn't go through. Try again." + retry button; form state (name, type selection) is preserved, nothing is cleared

### Mobile-first notes
- This page's primary design target is mobile — desktop layout is simply the same single column, centered, with extra whitespace on either side (max-width 480px), not a reflowed multi-column layout
- Video recording defaults to invoking the device camera directly on mobile via native file input `capture` attribute

---

## BIRTHDAY REVEAL PAGE — MOCKUP
### Route: `/r/[revealCode]`

### Layout structure — Locked state
```
┌─────────────────────────────────┐
│ MINIMAL TOP BAR (logo only)      │
├───────────────────────────────── │
│                                   │
│   CENTERED LOCKED STATE           │
│   (photo, headline, countdown)    │
│                                   │
└─────────────────────────────────┘
```

### Layout structure — Unlocked state
```
┌─────────────────────────────────┐
│ MINIMAL TOP BAR (logo only)      │
├───────────────────────────────── │
│   UNLOCKED HEADER (name + count) │
├───────────────────────────────── │
│   "PLAY ALL" CONTROL (optional)  │
├───────────────────────────────── │
│   CONTRIBUTIONS GRID/SEQUENCE     │
└─────────────────────────────────┘
```

### Locked state
- Centered column, max-width 400px, vertically centered in viewport (not just top-padded — this state should occupy the full screen height, feeling like a held breath)
- Recipient photo (if provided): 120px circle, centered, 2px `border` ring
- H1: "Something's coming for Maya" — 28px, centered
- `Countdown` component below, margin-top 24px: two side-by-side blocks (Days / Hours), each a `surface` card 1px `border` 12px radius, padding 16px, large numeral 32px `text-primary` + small label 12px uppercase `text-secondary` beneath ("DAYS" / "HOURS")
- Body below countdown, margin-top 24px: "Come back on August 14 to see it." — 15px `text-secondary`, centered
- No contribution content is present in the DOM at all in this state — enforced at the API layer, not just visually hidden

### Unlocked header
- Padding 56px/32px mobile top, centered
- Recipient photo: 96px circle, centered
- H1: "Happy Birthday, Maya" — 32px/26px mobile, centered
- Subtext: "14 people sent you something." — 15px `text-secondary`, centered, margin-top 8px

### Play All control
- Centered button below header, margin 24px vertical: secondary-style button (transparent bg, 1px border, 12px radius) with a small play-triangle glyph + label "Play all" — 14px
- When active, advances through video contributions in sequence in a focused/lightbox-style overlay (`bg`-tinted scrim behind, contribution card centered, prev/next arrows either side, close "×" top-right) — text contributions are skipped in Play All sequence and simply display in the grid below

### Contributions grid/sequence
- Grid: 2 columns desktop, 1 column mobile, 24px gap, max-width 800px centered
- Each `ContributionCard`:
  - `surface` bg, 1px `border`, 16px radius, padding 16px (video thumbnail bleeds to card edges above the padding, i.e. thumbnail is full-bleed top with 16px radius on top corners only, text content below sits in the 16px padded area)
  - Video contribution: 16:9 video thumbnail with centered play glyph overlay, duration badge bottom-right ("0:24"), sender name below in 14px semibold `text-primary`, margin-top 12px
  - Text contribution: no thumbnail — message text directly, 15px `text-primary`, line-height 1.6, max 5 lines before a "Read more" text-link expansion, sender name below in 14px semibold, margin-top 12px, with a 1px top `border` divider separating message from sender name
- Cards are read-only: no like/comment/react controls anywhere on this page, consistent with "no social feed" product principle
- Order: sequential by submission time (oldest first) — no reordering/sorting controls exposed to the recipient

### Mobile-first notes
- Grid collapses to single column under 640px
- Play All lightbox becomes full-screen (no scrim visible) on mobile, swipe left/right replaces arrow buttons

---

## ORGANIZER DASHBOARD — MOCKUP
### Routes: `/dashboard` (list) and `/dashboard/[pageId]` (detail)

### Dashboard list layout
```
┌───────────────────────────────────┐
│ NAV (authenticated: logo + avatar) │
├───────────────────────────────────┤
│  H1 + "Create a Birthday Page" btn │
├───────────────────────────────────┤
│  BIRTHDAY PAGE CARDS (grid)        │
└───────────────────────────────────┘
```

### Nav (authenticated variant)
- Same 72px bar as marketing nav, but right side replaced with a single circular avatar/initials badge (36px, `accent` bg 15% opacity, `text-primary` initials) that opens a small dropdown (Settings, Log Out) on click — no marketing links (How It Works/About) shown once authenticated, since the organizer is now in the product, not the marketing site

### Header row
- Padding 48px/24px mobile top, flex row: H1 left ("Your Birthday Pages" — 30px/24px mobile), primary button right (**Create a Birthday Page**) — stacks (H1 above, full-width button below) on mobile

### Birthday Page Cards
- Grid: 2 columns desktop, 1 column mobile, 24px gap
- Each `BirthdayPageCard`: `surface` bg, 1px `border`, 16px radius, padding 20px, horizontal layout — recipient photo (56px circle, left) + content column (right): recipient name (16px semibold), birthday date (13px `text-secondary`), contribution count ("6 messages" — 13px `text-secondary`), and a `Badge` (top-right of card, pill shape, 12px text) reading one of **Collecting** (accent-tinted bg), **Locked** (border-gray bg), or **Revealed** (solid `accent` bg, white text)
- Hover: background shifts ~2% darker, entire card clickable, routes to detail view
- Empty state (no pages yet): centered `EmptyState` block replacing the grid — H3 "You haven't created a birthday page yet." + primary button "Create a Birthday Page" below, generous vertical padding (96px) to avoid a cramped empty screen

### Page detail layout (`/dashboard/[pageId]`)
```
┌───────────────────────────────────┐
│ NAV (authenticated)                 │
├───────────────────────────────────┤
│  HEADER (name, date, status, days) │
├───────────────────────────────────┤
│  INVITE LINK BLOCK                 │
├───────────────────────────────────┤
│  CONTRIBUTIONS LIST                │
├───────────────────────────────────┤
│  SETTINGS (collapsible section)    │
└───────────────────────────────────┘
```

### Header
- Padding 48px/24px top, flex row: recipient photo (64px circle) + name (24px semibold) + `Badge` (status) grouped left; "X days until reveal" (or "Revealed" state) right-aligned, 14px `text-secondary`
- 1px `border` divider below entire header block

### Invite link block
- `surface` `Card`, 1px `border`, 16px radius, padding 24px, margin-top 24px
- Label: "Invite link" — 13px uppercase `text-secondary`
- `CopyLinkField` (same component as Create flow confirmation)
- Below it, a text link (not a full button, to keep it secondary): "Copy a reminder message" — clicking copies the pre-written nudge text to clipboard and shows a small "Copied" toast near the link, 14px

### Contributions list
- Section label: "Contributions (6)" — 18px semibold, margin-top 32px, margin-bottom 16px
- List (not grid) — each row is a horizontal `ContributionCard` variant: small thumbnail/type-icon (48px, left) + sender name (15px semibold) + type label ("Video, 0:18" or "Text message") in 13px `text-secondary` beneath name + submitted date, right-aligned, 13px `text-secondary`
- Rows separated by 1px `border`, no individual card borders (list feels like a single continuous surface, `surface` bg card wrapping the whole list, 16px radius)
- Clicking a row expands it inline (video player or full text) rather than navigating away — organizer can preview early since organizer view is never locked
- Empty state (no contributions yet): centered within the list card, "No messages yet. Share the invite link to get started." 14px `text-secondary`

### Settings (collapsible)
- Collapsed by default, header row "Settings" (16px semibold) + chevron, click to expand (200ms fade)
- Expanded contents: same field set as Create flow Step 1 (recipient name, date, photo, welcome note) pre-filled and editable inline, each with its own **Save** text-link appearing only when that field is dirty
- Below fields, a distinctly separated danger zone (extra margin-top 32px, 1px `border-top`): "Force unlock reveal early" (secondary button) and "Delete this page" (text-only, muted terracotta color, requires a confirm step before executing — no silent destructive actions)

### Mobile-first notes
- Header row stacks: photo+name+badge on one line, days-remaining below it on mobile rather than right-aligned
- Contributions list rows keep the same horizontal structure down to small screens (thumbnail stays 48px, text truncates rather than wraps) to preserve scanability
