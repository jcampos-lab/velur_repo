# Velur — MVP Plan

> **Status source of truth:** the live task board lives in **Notion**:
> - Build hub: https://app.notion.com/p/37f66f87500081ee99a0f61d52d51c99
> - Task board: https://app.notion.com/p/4923081158e94d18a90b729ff6540aab
>
> This file is the durable spec; Notion is where we mark Not started / In progress / Done.
> Last updated: 2026-06-15.

---

## 0. What we are building (and what we are NOT)

**The MVP is the thinnest vertical slice that proves the daily brief is worth paying for.**

> Shopify + Stripe → nightly sync → Claude writes a daily revenue brief → Resend emails it at 8am.

We are **not** building: all 8 integrations, a self-serve onboarding flow, billing, or a full
dashboard. Those come *after* one real brand pays for the brief.

**Guiding rules**
- Charge from client #1. Cost scales *behind* revenue, never ahead of it.
- Fixed costs stay near zero (~€70/mo) until paying clients justify scaling.
- Privacy is the product. See §3 — the egress boundary is decided before any code.

---

## 1. Architecture (MVP)

| Layer | Choice | Notes |
|---|---|---|
| Frontend / dashboard | Next.js (reuse velur-web patterns) | Thin: login, connect tools, view latest brief + history |
| Backend | Next.js API routes / server actions | Or a small separate service later |
| Database | **Supabase (Postgres), EU region** | `raw` → `stage` → `mart` schemas; RLS + `tenant_id` everywhere |
| Connectors | **Shopify + Stripe** first (read-only OAuth) | Meta Ads next, once the slice works |
| Orchestration | **Inngest** (or Trigger.dev) | Nightly sync + 8am brief; durable, retried jobs |
| AI / reasoning | **Claude API** — Opus 4.8 (briefs) / Sonnet 4.6 (cheap paths) | Aggregates only — never raw PII (see §3) |
| Email | **Resend** | Delivers the daily brief |
| Auth | Supabase Auth (or Clerk) | |
| Monitoring | Sentry + PostHog | Add once there's traffic |

---

## 2. Accounts & secrets needed

- [ ] Supabase project (EU region)
- [ ] Anthropic API key (+ review commercial DPA / Zero-Data-Retention terms)
- [ ] Resend account + verified sending domain
- [ ] Inngest account
- [ ] Shopify Partner account + a dev app (read-only scopes)
- [ ] Stripe account + restricted read-only API key
- [ ] New repo for the product (e.g. `velur-app`) — decide monorepo vs separate

Env vars (`.env.local`, never committed): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `INNGEST_*`, `SHOPIFY_*`, `STRIPE_SECRET_KEY`.

---

## 3. Privacy & the egress boundary (decide FIRST)

**The rule:** raw PII (customer names, emails, individual transactions) **stays in Postgres**.
Only **derived aggregates** (revenue by channel, churn by cohort, MRR, ROAS) are sent to Claude.

- [ ] Write the explicit list of fields allowed to leave the DB → the brief prompt
- [ ] EU residency end-to-end (Supabase EU region; confirm sub-processors are EU/GDPR-ok)
- [ ] Tenant isolation: RLS policies on every table keyed to `tenant_id`
- [ ] Read-only OAuth scopes only — never request write access
- [ ] DPA template for clients (Velur = processor); sub-processor list (Anthropic, Supabase, Vercel, Resend)
- [ ] Data deletion / offboarding flow (a client can leave and take/erase their data)
- [ ] Audit logging on data access

Anthropic API does not train on API data by default; ZDR available on request — **verify in the DPA**.

---

## 4. Build phases (the to-do map)

### Phase 0 — Manual validation (no code) ⭐ do this first
- [ ] Pick 1 real brand; get read access or data exports
- [ ] Hand-write ONE daily brief in a doc (the output we're testing)
- [ ] Show it to the owner: would they pay for this every morning?
- [ ] Capture exactly which numbers/questions they cared about → shapes the prompt

### Phase 1 — Foundation
- [ ] Create product repo + Next.js skeleton
- [ ] Supabase project (EU); `raw` / `stage` / `mart` schemas
- [ ] `tenant_id` + RLS policies (write the isolation test first)
- [ ] Auth (login, one tenant)
- [ ] Secrets management wired

### Phase 2 — Shopify connector
- [ ] Shopify dev app, read-only OAuth (orders, customers, products)
- [ ] Pull → `raw` schema
- [ ] Normalize → `stage` → `mart` (one revenue timeline)
- [ ] Idempotent nightly sync (Inngest) — re-runs never duplicate

### Phase 3 — Stripe connector
- [ ] Restricted read-only key
- [ ] Charges / refunds / MRR → `raw` → `mart`
- [ ] Reconcile with Shopify on the customer record

### Phase 4 — The brief (the actual product)
- [ ] Aggregation queries = the egress boundary (only these numbers leave the DB)
- [ ] Claude prompt: metrics in → written brief out (Opus 4.8)
- [ ] Resend email delivery
- [ ] 8am schedule (Inngest cron)
- [ ] Compare generated brief vs the Phase 0 hand-written one — close the gap

### Phase 5 — Thin dashboard
- [ ] Login → connect tools → view latest brief → brief history

### Phase 6 — Privacy / compliance hardening
- [ ] DPA + sub-processor list live
- [ ] Deletion flow + audit logging verified
- [ ] (Later, not MVP) SOC 2 readiness

---

## 5. Definition of done (MVP)

One real brand, connected via read-only OAuth, receives an automated, accurate daily revenue
brief by email at 8am — built on EU-hosted, tenant-isolated infrastructure where raw customer
data never leaves the database — and says it's worth paying for.
