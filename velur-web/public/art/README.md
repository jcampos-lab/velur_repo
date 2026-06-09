# Velur brand art — river-merge motif (approved 2026-06-10)

Run `node scripts/fetch-art.mjs` from `velur-web/` to download all four files
into this folder. Source: Higgsfield generations (jobs `2e359bcf`, `b5e1c522`,
`aeb98018`, `d4df8ebc`).

## Files

| File | Size | Use |
|---|---|---|
| `hero-river-wide.png` | 3168×1344 (21:9) | Hero background still / video poster |
| `hero-river-wide.mp4` | 2016×864, 8s | Hero background loop |
| `confluence-y.png` | 2752×1536 (16:9) | Section or CTA band still / poster |
| `confluence-y.mp4` | 1920×1080, 8s | Section/CTA background loop |

## Usage notes

- The mp4s ship with an audio track — strip it (`ffmpeg -an`, command printed
  by the fetch script) or rely on the `muted` attribute. Autoplay only works
  when muted.
- Always set `poster` to the matching still so first paint is instant.
- Respect reduced motion: render the still instead of the video when
  `prefers-reduced-motion` is set.

```tsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  src="/art/hero-river-wide.mp4"
  poster="/art/hero-river-wide.png"
  autoPlay
  muted
  loop
  playsInline
  aria-hidden="true"
/>
```

```css
@media (prefers-reduced-motion: reduce) {
  video { display: none; } /* fall back to the poster as a background image */
}
```

- Overlay text in white (`--color-on-dark`) sits best on the left third of
  `hero-river-wide` and the upper area of `confluence-y` — both were composed
  with that negative space.
- These two motifs replace the earlier flat-editorial direction. Coral
  (`#FF6B4A`) already appears inside the artwork — avoid adding more coral UI
  elements on top (one-accent rule).
