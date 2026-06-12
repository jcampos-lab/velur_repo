/**
 * Velur — ArtBand
 * Standalone full-width artwork band (rounded image inside the page
 * container) for light pages where art can't sit behind ink text.
 * Height is clamped responsively; the artwork crops via object-cover.
 * Decorative only — hidden from assistive tech.
 */

type ArtBandProps = {
  /** Full image path, e.g. "/art/delta-aerial.png". */
  src: string;
  /** Focal point for the responsive crop. */
  objectPosition?: string;
  /** Band height — defaults tuned for a cinematic strip. */
  className?: string;
};

export function ArtBand({
  src,
  objectPosition = "center",
  className = "h-[200px] md:h-[320px] lg:h-[400px]",
}: ArtBandProps) {
  return (
    <section aria-hidden="true" className="bg-canvas" style={{ padding: "0 var(--gutter)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className={`relative overflow-hidden rounded-2xl ${className}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="art-live absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
