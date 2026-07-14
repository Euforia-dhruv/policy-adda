import { partners } from '../data/partners'

export function PartnerStrip() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-ink/10 bg-ink py-12 text-paper"
    >
      <div className="container-page">
        <h2
          id="partners-heading"
          className="text-center text-sm font-medium uppercase tracking-wide text-paper/60"
        >
          Backed by 20+ insurer partners — we compare, you choose
        </h2>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {partners.map((p) => (
            <li
              key={p}
              className="rounded-full border border-paper/15 bg-paper/[0.04] px-4 py-2 text-sm font-medium text-paper/85"
            >
              {p}
            </li>
          ))}
          <li className="rounded-full bg-ocher px-4 py-2 text-sm font-semibold text-ink">
            + 6 more
          </li>
        </ul>
      </div>
    </section>
  )
}
