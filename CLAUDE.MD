# VELUR WEBSITE — BUILD PROMPT FOR CLAUDE DESIGN

> Copy everything below the dashed line and paste into Claude Design.
> Make sure your DESIGN.md and your four logo SVGs are attached as project context.

---

## CONTEXT

You are building the production website for **Velur** (velur.io), a revenue
intelligence practice for high-growth DTC and subscription brands. The
brand identity is fully defined in the attached `DESIGN.md` — follow it
literally. Every color, type rule, voice rule, and anti-pattern in that
document is binding. When `DESIGN.md` and any other reference conflict,
`DESIGN.md` wins.

The four logo SVGs are also attached. Embed them directly. Never redraw.

---

## STRUCTURAL INFLUENCE (read carefully)

A reference screenshot of "Asterisk" agency is provided. **Use only its
structural and compositional moves. Do NOT copy its visual style.**

What to take from the reference:
- Oversized hero headline that visually breaks the grid (text overflows
  past content boundaries, creating tension)
- A subtle 12-column grid that's faintly visible behind the hero content
- A small status indicator near the hero ("● Available — taking 2 clients
  this quarter")
- A discreet floating side-rail with social/contact links (right edge)
- A bottom row of large numerical stats
- A pill-shaped primary CTA button
- Generous vertical whitespace

What to explicitly REJECT from the reference:
- The pink/purple/magenta gradient background — REPLACE with Velur's cream
  (`--velur-cream` #F5F2EC) as primary surface, with a single subtle warm
  gradient moment per section (cream-to-paper or paper-to-stone, never
  amber-saturated)
- The dark glassy/glassmorphism aesthetic — REPLACE with editorial flatness
- The asterisk sparkle icon — Velur uses its Quartet mark only
- The "Discover Innovation" generic SaaS language — Velur copy is concrete
  and outcome-led (see DESIGN.md Section 07)
- Glow effects, neon, shadows on cards — all forbidden

The result should feel like the **structural confidence** of Asterisk
combined with the **editorial restraint** of the Financial Times product
pages and Linear's marketing site.

---

## TECH STACK

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS, configured with the tokens from `DESIGN.md`
- **Fonts:** Bricolage Grotesque, Fraunces, JetBrains Mono — loaded via
  `next/font/google`
- **Animation:** Framer Motion for entrance and scroll-triggered animations
  only. Keep it minimal — DESIGN.md Section 09.
- **Forms:** None on v1 (no email collection, no newsletter signup)
- **Booking:** Cal.com embed on the Contact page
- **Deployment target:** Vercel (the velur.io domain will be connected
  there)

Output a single Next.js project with clean folder structure:

```
/app
  /(marketing)
    /page.tsx               → Home
    /services/page.tsx      → Services
    /case-studies/page.tsx  → Case Studies (placeholder, see notes)
    /company/page.tsx       → Company
    /blog/page.tsx          → Blog index (placeholder)
    /contact/page.tsx       → Contact
  /layout.tsx
  /globals.css
/components
  /ui            → buttons, cards, sections, etc.
  /marketing     → page-specific composite components
/lib
/public
  /logos         → the four Velur SVGs go here
tailwind.config.ts
```

---

## GLOBAL ELEMENTS (every page)

### Header

- Sticky on scroll, with a subtle background blur once scrolled
  (`backdrop-blur-md` + `bg-paper/80`) — this is the ONE place
  glassmorphism is allowed, because it's functional, not decorative
- Left: Velur mark (icon SVG) + "velur" wordmark, height 28px
- Center: nav links — Services, Case Studies, Company, Blog
- Right: pill-shaped CTA button "Book a call →" linking to /contact
- Mobile: hamburger that opens a full-screen overlay nav

### Footer

- Cream background (`--velur-cream`)
- Three columns: Velur (mark + tagline + © 2026), Pages (links), Connect
  (LinkedIn, X, email)
- Below: a single line of editorial Fraunces italic text — *"Built in
  Barcelona. Numbers are the only language that doesn't lie."*
- Above the editorial line: an oversized version of the Velur wordmark in
  ink color, set as a section break (similar to Mastercard's footer)

### Status indicator (homepage hero only, optional on Services)

Small pill, top of hero: `● Available — taking 2 new clients this quarter`
The dot is `--velur-positive` green, pulsing softly (1s cycle, very subtle).

---

## PAGE 1 — HOME (highest priority, conversion-focused)

The homepage's job is to convert a visitor into a booked call. Nothing else.

### Section 1: Hero

- Top of viewport
- Status indicator pill (see above)
- Massive headline (h1, 80px+ on desktop), set in Bricolage 700, tracking
  -0.04em, line-height 1.0. Two lines.
- Headline copy:
  > *Your data already knows.*
  > *We help you act on it.*
- The first line is in `--velur-ink`. The second line is in `--velur-amber`.
  This is the ONE moment of amber on the page (per the one-accent-per-screen
  rule).
- Subhead, 20px Bricolage 400, max-width 540px:
  > Velur turns your Shopify, Klaviyo, and Meta data into the three numbers
  > that decide your next quarter. No new dashboard. No new SaaS bill. Built
  > by analysts, owned by you.
- Two buttons side by side: Primary "Book a 30-min call →" (links to
  /contact) and Secondary "See what we do" (anchor scroll to Section 2)
- Below buttons: small mono caption — `velur.io · barcelona · est. 2026`

### Section 2: The cost of not knowing (the WHY)

This is the conversion driver. Don't sell the service — sell the pain.

Heading: *"What's actually happening in your business right now."*

Below it, a 2x2 or 2x3 grid of bordered cards. Each card has:
- A large number set in JetBrains Mono (the lost-revenue figure)
- A 2-line claim
- A 1-line citation in caption style

Use these (all real, all citable — verify with web search if needed):

1. **€47,000/year** — *The average DTC brand wastes this much on duplicate
   SaaS analytics tools they only use 30% of.* (Source: Gartner SaaS Spend
   Report 2025)

2. **23%** — *DTC brands using proper cohort analysis see this much higher
   12-month LTV vs those who don't.* (Source: Klaviyo State of Email
   Marketing 2025)

3. **8 hours** — *The time the average e-commerce founder spends every week
   in Excel reconciling numbers that should be automated.* (Source:
   Shopify SMB Report 2024)

4. **42%** — *of mid-market e-commerce brands cannot accurately attribute
   revenue post-iOS14, leading to 20-40% misallocated ad spend.*
   (Source: AppsFlyer Performance Index 2025)

5. **3.4x** — *higher conversion rate for brands that segment customers
   beyond RFM into behavioral cohorts.* (Source: Bloomreach Personalization
   Index 2025)

6. **€2,400** — *what brands save monthly by replacing Triple Whale,
   Northbeam, or Daasity with a custom-owned analytics layer.*
   (Source: Velur engagement data, projected)

> [SEARCH: verify each statistic before publishing. If a stat doesn't
> validate, replace with another from a recent (2024-2025) named source.
> Never invent a number.]

Below the grid: a single line of Fraunces italic editorial copy:
> *"You don't have a data problem. You have an action problem."*

### Section 3: How Velur is different

Heading: *"Three things we don't do."*

Three rows. Each row: a small mono-set "01 / 02 / 03" on the left, then a
bold sub-heading and 2 lines of body copy.

- **01 / We don't sell another dashboard.** You already have five.
  We replace them with one you own — built in your warehouse, on your
  domain, with your data.

- **02 / We don't lock you in.** Every model, every query, every dashboard
  we build is yours. SQL files in your GitHub. No hidden infrastructure.
  Cancel us tomorrow and nothing breaks.

- **03 / We don't pretend to be an AI agency.** We use AI to ship faster.
  We use Claude, Cursor, and modern tooling because they make us 5x
  faster than agencies still writing PowerPoints. That speed becomes
  your savings.

### Section 4: Stats row (the Asterisk-inspired moment)

A horizontal row of 3 oversized numbers, JetBrains Mono, 80px:

- **5+** — *Years analyzing DTC and subscription data*
- **$1B+** — *In combined revenue at the brands our team has worked with*
- **14 days** — *Average time from kickoff to your first dashboard live*

Below each: tiny caption text. The Asterisk reference shows this layout
exactly — borrow the composition, swap the styling.

### Section 5: Final CTA

Centered, 60% viewport height, cream background.

Headline (Fraunces italic, 56px): *"The number that decides your quarter
is already in your data. Let's find it together."*

Single primary button: "Book a 30-min call → "

Below: small text — *"30 minutes. Free. No deck. We'll look at your actual
data together."*

---

## PAGE 2 — SERVICES

Goal: turn an interested visitor into a booked call by clarifying what
they get, when, and for how much.

### Hero

- Smaller than the home hero (reuse Section spacing patterns)
- Headline: *"Three ways to work with Velur."*
- Subhead: *"All three start with a 30-minute call. Most clients begin with
  the Audit and grow from there."*

### Three offer cards

Stacked vertically on mobile, side-by-side (3-column) on desktop. Each
card is a bordered cream surface with:

#### Card 1 — The Audit (one-time)

- Big mono price: **€2,500**
- Tag: **One-time · 14 days**
- Title (Bricolage 700, 28px): *Revenue Diagnostic*
- Body: *We connect to your Shopify, Klaviyo, and ad platforms. We deliver
  a dashboard, a 20-page revenue report, and a 90-minute strategy call.
  You walk away knowing exactly which products drive your margin, where
  your ad spend leaks, and which cohort retains best.*
- Bullet list of deliverables (5 items, mono caption style)
- "Best for: brands doing €500K–€5M doing analysis in spreadsheets"
- Button: "Book a call about this →"

#### Card 2 — The Build (project)

- Big mono price: **From €6,000**
- Tag: **Project · 4–6 weeks**
- Title: *Custom Analytics Stack*
- Body: *We build the analytics layer your business actually needs.
  Warehouse setup, data modeling, dashboards, and the playbook to operate
  them. Built on tools you own — BigQuery, Looker Studio, Metabase. No
  per-seat fees. No vendor lock-in.*
- Deliverables list
- "Best for: brands ready to leave Triple Whale, Northbeam, or Daasity"
- Button: "Book a call about this →"

#### Card 3 — The Retainer (ongoing)

- Big mono price: **From €3,500/month**
- Tag: **Monthly · part-time analyst access**
- Title: *Embedded Analytics Partner*
- Body: *We become your part-time data team. Weekly KPI reviews, ad-hoc
  analyses, dashboard maintenance, and quarterly strategy sessions. We
  ship faster than hiring, cost less than a full-time analyst, and we
  know your data better than any consultant.*
- Deliverables list
- "Best for: brands without an in-house data hire yet"
- Button: "Book a call about this →"

### "Who we are" section

A short paragraph, NOT a full company page. Two columns:

Left column — a Fraunces italic editorial blockquote:
> *"The founders of Velur have spent the last five years inside the data
> stacks of high-growth DTC and subscription brands across the US and
> Europe — companies you've heard of. We've built the dashboards executives
> rely on every Monday. Now we're building them for the next generation
> of brands."*

Right column — three small mono-prefixed lines:
- `Stack ·` BigQuery, dbt, Looker Studio, Metabase, Python, SQL, Cursor, Claude
- `Tools ·` Shopify, Klaviyo, Meta, Google, TikTok, Recharge, Stripe
- `Method ·` Modern Data Stack + AI-augmented delivery

### Process section

A horizontal 4-step timeline. Each step is a numbered card with a 2-line
description.

01. **Discovery call** — *30 minutes. We listen. You explain. No pitch.*
02. **Scope & quote** — *Within 48 hours, you get a written scope and fixed price. No surprises.*
03. **Build sprint** — *We work in 1-week sprints with daily Loom updates. You see progress every day.*
04. **Handoff & ownership** — *Everything we built is in your accounts, your repos. We document everything. You own it forever.*

### Final CTA

Same pattern as homepage Section 5, different copy:
*"The right service is usually the smallest one. Let's figure out which
that is."*

---

## PAGE 3 — CONTACT (priority)

Single-purpose page. Get them to book.

### Hero

- Headline: *"Let's look at your numbers together."*
- Subhead: *"30 minutes. Your screen, your data. No deck. By the end of
  the call you'll know if Velur is right for you — or what to do next
  even if it isn't."*

### Cal.com embed

Centered, 80% width, max 720px. Embed Cal.com directly:

```tsx
<iframe
  src="https://cal.com/velur/30min"  // user replaces with real cal.com link
  width="100%"
  height="700"
  frameBorder="0"
/>
```

> [Note for user: create a free Cal.com account, set up a "30-min discovery
> call" event, replace the URL above. Same outcome as Calendly but free
> and looks better.]

### "What to expect" sidebar (right column on desktop, below on mobile)

Small mono-formatted checklist:
- `0:00` Quick intro — what your business does
- `0:05` Tour of your current analytics setup (you share screen)
- `0:15` Where we'd start, what it would cost
- `0:25` Q&A — anything you want to ask

### Below the embed

Three small lines, mono caption:
- *Don't have time for a call? Email hello@velur.io*
  > [Note: set this up via Cloudflare Email Routing, free, forwards to
  > your real inbox]
- *Based in Barcelona. We work async with clients across timezones.*
- *We respond within 24 hours, weekdays.*

---

## PAGE 4 — CASE STUDIES (PLACEHOLDER — see honest note below)

⚠️ **HONEST NOTE FOR THE BUILDER:**

The user has zero case studies as of April 2026. We will NOT fabricate
results from competitors and present them as Velur's. Instead this page
becomes a credibility-by-proxy page using REAL, CITED industry benchmarks.

### Hero

- Headline: *"What good analytics actually unlocks."*
- Subhead: *"We're early. Our first Velur case studies will be published
  here as they happen — with full client permission. Until then, here's
  the kind of impact proper analytics delivers, drawn from public industry
  research."*

### Industry benchmark cards (3-4 cards)

Each card has:
- The metric improved (large mono number)
- A 2-sentence description of HOW it's typically achieved
- A CITED source link (real, current, verifiable)

Examples to use (verify each before publishing):

1. **+23% LTV** — *Brands that segment customers into behavioral cohorts
   (rather than basic RFM) see meaningfully higher retention and lifetime
   value.* — Source: Klaviyo State of Email Marketing 2025
2. **-32% CAC** — *DTC brands that implement proper post-iOS14 attribution
   (server-side tagging + first-party data) recover most of the
   measurement loss and reduce CAC accordingly.* — Source: AppsFlyer
   Performance Index 2025
3. **+3.4x conversion** — *Personalization based on real-time behavioral
   signals outperforms generic email blasts by this margin on average.*
   — Source: Bloomreach Personalization Index 2025

> [SEARCH: confirm each citation is real and current before deploying.]

### Bottom CTA

Honest copy: *"Your numbers will be here next. Let's start with a call."*

---

## PAGE 5 — COMPANY

### Hero

- Headline: *"A small practice. A big stack."*
- Subhead: *"Velur is a Barcelona-based revenue intelligence practice. We
  exist because the gap between what your data could do and what it
  actually does is the most expensive thing in your business."*

### "Our position" section

Editorial layout, two columns:

Left: Fraunces italic blockquote:
> *"We're not a leader in this market yet. We're a pioneer in how to
> deliver it — small, AI-augmented, owner-aligned. We use modern data
> tooling and AI agents because they let one person do what an agency
> needed five for. That speed is your margin."*

Right: a tight list of beliefs (mono caption, ink color):
- `01 ·` Modern data stacks beat legacy SaaS dashboards
- `02 ·` AI as leverage, not as marketing
- `03 ·` Founders should own their data, always
- `04 ·` Small teams ship faster and cheaper
- `05 ·` Numbers are the only language that doesn't lie

### "Where we're going" section

A short roadmap, written as plain prose, 3 paragraphs:

> *In 2026, Velur is a service. We sit beside your analytics team — or
> become it — for as long as you need.*

> *In 2027, Velur becomes a product. The patterns we discover working
> with dozens of brands will become reusable: a templated DTC analytics
> stack, an AI revenue forecaster, an attribution model trained on
> first-party data.*

> *In 2028 and beyond, Velur is a platform. The brands we work with own
> the best analytics layer in their category. The ones we don't work
> with want to.*

### Tech & method section

A short technical credibility section. Two columns:

Left — Stack:
> *We build on the modern data stack — BigQuery, dbt, Fivetran, Looker
> Studio, Metabase, Python, SQL. No proprietary tools. No black boxes.*

Right — Method:
> *We deliver in weekly sprints with daily Loom updates. Every artifact
> we produce — every SQL query, every dashboard config, every Python
> notebook — is in your repository under your name from day one.*

### Bottom CTA

*"Want to know if Velur is right for you?"* → Book a call

---

## PAGE 6 — BLOG (PLACEHOLDER — see honest note below)

⚠️ **HONEST NOTE FOR THE BUILDER:**

Empty blog pages signal abandonment. This page should NOT launch with the
v1 site. Build the page template, but only link it from the nav once at
least 3 articles exist. Until then, the nav link should redirect to home
or be removed.

### Page structure (build now, hide from nav until 3 posts exist)

Editorial-magazine layout (Fraunces emphasis is appropriate here, this
is the one place that section can shine):

- Hero featured post: oversized title, byline, date in mono, single
  cover image
- Below: 2-column grid of post cards, each with title, excerpt, mono date
  & read-time
- Categories filter at top: AI · Analytics · Strategy · Decision Making

Use a simple `posts.ts` array for now — markdown files via MDX
recommended for v2.

---

## DESIGN PRINCIPLES (must follow)

1. **No purple/pink/magenta gradients.** Anywhere. The reference
   screenshot shows them; we explicitly reject them.
2. **One amber moment per screen.** Hero second-line color OR primary CTA
   button — never both.
3. **Numbers are JetBrains Mono.** Always. Especially the stat numbers.
4. **No drop shadows on cards.** Borders only (1px `--velur-line`).
5. **No glassmorphism** except the sticky header on scroll.
6. **Generous whitespace.** When in doubt, double the spacing.
7. **Asymmetric editorial layouts** preferred over centered ones.
8. **Mobile-first.** Test every breakpoint.
9. **Accessibility AA minimum.** Contrast ratios, focus states, reduced
   motion respected.

---

## DELIVERABLES

1. The complete Next.js project (file tree per spec above)
2. `tailwind.config.ts` with all DESIGN.md tokens
3. A `README.md` with: setup instructions, how to deploy to Vercel, how
   to connect the velur.io domain, how to add the Cal.com link, how to
   set up Cloudflare Email Routing for hello@velur.io
4. Performance: Lighthouse 95+ on all four metrics
5. Each page is a single, scrollable, self-contained route

Build the pages in this order:
1. Home (priority)
2. Services (priority)
3. Contact (priority)
4. Company
5. Case Studies (with placeholder warning visible)
6. Blog (template only, hidden from nav)

---

## FINAL CHECK

Before considering the site done, run through DESIGN.md Section 11 (the
Don't list). For every item, verify the site doesn't violate it. Common
violations to watch for:

- Are any backgrounds purple/blue gradients? → fix
- Are there sparkle/star icons next to AI mentions? → remove
- Is amber appearing in more than one place per screen? → reduce
- Are any numbers set in a non-mono font? → fix
- Are there drop shadows on cards? → replace with borders
- Are headlines in title case? → convert to sentence case
- Does the copy use "leverage," "unlock," "empower"? → rewrite

Build it. Then audit it against this list.# Project Overview


Build a lightweight web application. This guide is instructions to get Claude Code to behave the way I want.
Each feature does one thing, the code is easy to follow, and the app is easy to run locally and deploy.


---


# Design
You are a senior UI designer and frontend developer. Build premium, modern, elegant interfaces. Use subtle animations, proper spacing, and visual hierarchy. No emoji icons. No generic gradients.
Claude Code to behave the way I want. Each feature does one thing, the code is easy to follow, and the app is easy to run locally and deploy.




# Development Rules


**Rule 1: Always read first**
Before taking any action, always read:
- `CLAUDE.md`
- `project_specs.md`


If either file doesn't exist, create it before doing anything else.


**Rule 2: Define before you build**
Before writing any code:
1. Create or update `project_specs.md` and define:
  - What the app does and who uses it
  - Tech stack (framework, database, auth, hosting)
  - Pages and user flows (public vs authenticated)
  - Data models and where data is stored
  - Third-party services being used (Stripe, Supabase, etc.)
  - What "done" looks like for this task
2. Show the file
3. Wait for approval


No code should be written before this file is approved.


**Rule 3: Look before you create**
Always look at existing files before creating new ones. Don't start building until you understand what's being asked. If anything is unclear, ask before starting.


**Rule 4: Test before you respond**
After making any code changes, run the relevant tests or start the dev server to check for errors before responding. Never say "done" if the code is untested.


**Core Rule**
Do exactly what is asked. Nothing more, nothing less. If something is unclear, ask before starting.


---


# How to Respond


Always explain like you're talking to a 15 year old with no coding background.


For every response, include:
- **What I just did** — plain English, no jargon
- **What you need to do** — step by step, assume they've never seen this before
- **Why** — one sentence explaining what it does or why it matters
- **Next step** — one clear action
- **Errors** — if something went wrong, explain it simply and say exactly how to fix it


When a task involves external tools or technical elements that a non-coder wouldn’t know (Supabase, Vercel, Stripe, localhost:3000, etc.):
- Walk through exactly where to find what they need (e.g. "go to your Supabase dashboard → Settings → API")
- Describe what each key or setting does in one plain sentence
- If there's SQL to run, explain what it's doing before they run it
- If there's a bucket, folder, or config to create manually, explain what it is and why it exists
- Be as concise as possible. Do not ramble. Less is more


---


# Tech Stack


- **Language:** TypeScript
- **Framework:** Next.js@latest (App Router. Website must be built in Next.js - do not build a static HTML site unless explicitly asked.
- **Backend-as-a-Service:** Supabase (Auth, Postgres, Storage, RLS)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS
- **Key libraries:** `@supabase/supabase-js`, `@supabase/ssr`


---


# Running the Project


1. Ensure `.env.local` has all necessary keys
2. Install dependencies: `npm install`
3. Run: `npm run dev`
4. Open your browser at `http://localhost:3000`


---


# File Structure


- `/app` → All the pages your users actually see
- `/app/api/` → The behind-the-scenes code that handles data (saving, fetching, etc.)
- `/app/(admin)/` → Pages only the employer can see (dashboard, jobs, reviewing candidates)
- `/app/interview/[token]/` → The page candidates land on when they click their invite link
- `/components/` → Reusable building blocks (buttons, cards, forms) used across pages
- `/lib/` → Shared helper code used throughout the app
- `/lib/supabase/` → The code that connects the app to your Supabase database
- `/supabase/` → The instructions that set up your database tables
- `/public/` → Images and other static files
- `.env.local` → Your secret keys — never share or commit this to GitHub
- `project_specs.md` → The blueprint Claude reads before doing anything




**Code organisation rules:**
- Keep API routes thin — call a service or lib function, don't put business logic in the route handler
- One component per file; co-locate page-specific components with the page
- Supabase server client (SSR) for server components and API routes; browser client only in client components
- Don't create new top-level folders without asking first


---


# How the App Is Built


Think of the app like a series of requests and responses:


1. A user visits a page or clicks a button — that's the **input**
2. A route or server action receives the request and calls the right service
3. The service does **one job** and returns a result
4. The route sends the result back to the user — that's the **output**
5. If something fails, show a clear error — don't silently break


---


# How to Write Code


- Write simple, readable code — clarity matters more than cleverness
- Make one change at a time
- Don't change code that isn't related to the current task
- Don't over-engineer — build exactly what's needed, nothing more
- Add a `console.log` at the start and end of each API route so it's easy to follow what's happening


If a big structural change is needed, explain why before making it.


---


# Supabase Rules


- Always use RLS — never disable it
- Server-side Supabase client for all sensitive operations (API routes, server components)
- Candidate operations go through API routes so RLS doesn't need to expose candidate rows publicly
- Signed URLs for all video access — never make the storage bucket public
- Never expose the `service_role` key in client-side code


---


# Secrets & Safety


- Never put API keys or passwords directly in the code
- Never commit `.env.local` to GitHub
- Never expose Supabase `service_role` key in frontend code
- Ask before deleting or renaming any important files


---


# Testing


Before marking any task as done:
- Run `npm run build` and fix any TypeScript or build errors
- Start the dev server with `npm run dev` and check for runtime errors in the console
- Manually verify the feature works end-to-end in the browser
- Check that existing features weren't broken by the change


When building a new page or API route:
- Test the happy path (everything works as expected)
- Test the error path (what happens if something goes wrong)
- Check that auth is working — logged-in vs logged-out behaviour
- Confirm Supabase RLS is doing what it should (data is scoped correctly per user)


Never say "done" if:
- The build is failing
- There are console errors
- The feature hasn't been tested in the browser


---


# Scope


Only build what is described in `project_specs.md`.
If anything is unclear, ask before starting.
