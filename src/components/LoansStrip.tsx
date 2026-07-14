import { loans } from '../data/partners'
import { Icon } from './icons'

export function LoansStrip() {
  return (
    <section
      aria-labelledby="loans-heading"
      className="border-y border-ink/10 bg-sand/60"
    >
      <div className="container-page flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="lg:max-w-xs lg:shrink-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-clay-dark">
            Loans, the same way
          </p>
          <h2 id="loans-heading" className="text-2xl font-semibold">
            Need credit, not just cover?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            We match you with lenders and walk the paperwork with you — personal,
            home, business, vehicle and gold.
          </p>
        </div>

        <ul className="flex flex-wrap gap-3 lg:flex-1">
          {loans.map((l) => (
            <li key={l.id}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-sm font-medium text-ink shadow-card">
                <Icon name="check" size={16} className="text-sage" />
                {l.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
