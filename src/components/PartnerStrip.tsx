import { partners } from '../data/partners'
import { Reveal } from './ui'

export function PartnerStrip() {
  const loop = [...partners, ...partners]
  return (
    <section aria-labelledby="partners-heading" className="overflow-hidden border-y border-white/10 bg-elevated py-12 text-ivory">
      <Reveal className="container-page">
        <h2
          id="partners-heading"
          className="text-center text-sm font-medium uppercase tracking-[0.18em] text-ivory/60"
        >
          Backed by 20+ insurer partners — we compare, you choose
        </h2>
      </Reveal>

      <div className="mask-fade-x relative mt-8 flex overflow-hidden">
        <ul className="flex shrink-0 animate-marquee items-center gap-3 pr-3">
          {loop.map((p, i) => (
            <li
              key={`${p}-${i}`}
              className="whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-ivory/85"
              aria-hidden={i >= partners.length}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
