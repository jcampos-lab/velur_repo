/**
 * Velur, ArtBackdrop
 * Full-bleed background art for dark surfaces (river/dunes/delta motif,
 * public/art/).
 *
 * Two modes:
 *  - Video pair (default): pass `base` (path without extension). Mobile (<md)
 *    gets the still only; desktop (md+) gets the muted autoplay loop with the
 *    still as poster; prefers-reduced-motion always gets the still.
 *  - Still only: pass `still` (full path incl. extension). One image at every
 *    breakpoint, used for hero cards and bands that carry a single artwork.
 *
 * Pure CSS variants, no JS, stays a server component.
 */

type ArtBackdropProps = {
  /** Path under /public without extension, e.g. "/art/hero-river-wide". Implies a .png + .mp4 pair. */
  base?: string;
  /** Full still path incl. extension, e.g. "/art/dunes-quiet.png". Disables the video. */
  still?: string;
  /** Overlay gradient or color above the art, below the content. */
  overlay?: string;
  /** Focal point for crops, e.g. "35% center". */
  objectPosition?: string;
};

export function ArtBackdrop({
  base,
  still,
  overlay = "rgba(10, 26, 47, 0.55)",
  objectPosition = "center",
}: ArtBackdropProps) {
  const stillSrc = still ?? `${base}.png`;
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Still, always present; the video paints over it when active */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stillSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        loading="lazy"
        decoding="async"
      />
      {/* Loop, only in video mode, desktop only, hidden for reduced-motion users */}
      {!still && base && (
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:motion-safe:block"
          style={{ objectPosition }}
          src={`${base}.mp4`}
          poster={`${base}.png`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
