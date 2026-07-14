import { loans } from '../data/partners'
import { Icon } from './icons'
import { Reveal } from './ui'

export function LoansStrip() {
  return (
    <section aria-labelledby="loans-heading" className="border-y border-white/10 bg-surface/70">
      <div className="container-page flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:gap-12">
        <Reveal className="lg:max-w-sm lg:shrink-0">
          <span className="eyebrow">Loans, the same way</span>
          <h2 id="loans-heading" className="mt-3 text-display-md font-medium">
            Need credit, not just cover?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            We match you with lenders and walk the paperwork with you — personal,
            home, business, vehicle and gold.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:flex-1">
          <ul className="flex flex-wrap gap-3">
            {loans.map((l) => (
              <li key={l.id}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-surface px-4 py-2.5 text-sm font-medium text-ivory shadow-card transition-colors hover:border-cobalt/40 hover:text-cobalt">
                  <Icon name="check" size={16} className="text-ivory" />
                  {l.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
