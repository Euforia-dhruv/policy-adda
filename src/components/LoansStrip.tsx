import { loans } from '../data/partners'
import { Icon } from './icons'
import { Reveal } from './ui'

export function LoansStrip() {
  return (
    <section aria-labelledby="loans-heading" className="border-y border-ink/10 bg-sand/70">
      <div className="container-page flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:gap-12">
        <Reveal className="lg:max-w-sm lg:shrink-0">
          <span className="eyebrow">Loans, the same way</span>
          <h2 id="loans-heading" className="mt-3 text-display-md font-semibold">
            Need credit, not just cover?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            We match you with lenders and walk the paperwork with you — personal,
            home, business, vehicle and gold.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:flex-1">
          <ul className="flex flex-wrap gap-3">
            {loans.map((l) => (
              <li key={l.id}>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-sm font-medium text-ink shadow-card transition-colors hover:border-clay/40 hover:text-clay-dark">
                  <Icon name="check" size={16} className="text-pine" />
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
