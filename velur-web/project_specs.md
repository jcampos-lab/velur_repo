# Velur Web — Project Specs

## Change log

### 2026-06-10 — River-merge brand art on homepage

**What:** Integrate the approved Higgsfield-generated brand art
(`public/art/`, river-merge motif) into the homepage for desktop and mobile.

**Touched files:**

- `components/velur/ArtBackdrop.tsx` (new) — reusable full-bleed art
  background. Mobile (<md) renders the still PNG only; desktop (md+) renders
  the 8s muted autoplay loop; `prefers-reduced-motion` users always get the
  still. Pure CSS variants, server component, no hydration cost.
- `components/marketing/HeroSection.tsx` — hero flipped to dark: river video
  behind copy, text moved to on-dark tokens (white headline, sage `#4FB78D`
  second line, on-dark CTAs), left-weighted midnight scrim for AA contrast.
- `components/marketing/CtaSection.tsx` — midnight CTA band now carries the
  Y-confluence loop behind a vertical midnight scrim.
- `scripts/fetch-art.mjs` (new) — downloads the four assets into
  `public/art/`.

**Prerequisite:** run `node scripts/fetch-art.mjs` once from `velur-web/`
(assets are not committed; the script pulls them from the Higgsfield CDN).

**Done means:** `tsc --noEmit` clean (verified), hero and CTA show the still
on mobile and the loop on desktop, text readable over the art, reduced-motion
respected.
