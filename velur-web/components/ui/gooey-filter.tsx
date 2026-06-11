/**
 * Velur — GooeyFilter
 * SVG goo filter (blur → alpha contrast → composite) that visually
 * fuses adjacent shapes sharing the same filtered layer. Render once
 * per page; reference by id via `filter: url(#<id>)`.
 *
 * Ported from the 21st.dev gooey-tabs pattern, dependency-free.
 */
const GooeyFilter = ({
  id = "goo-filter",
  strength = 10,
}: {
  id?: string
  strength?: number
}) => {
  return (
    <svg className="hidden absolute" aria-hidden="true">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

export { GooeyFilter }
