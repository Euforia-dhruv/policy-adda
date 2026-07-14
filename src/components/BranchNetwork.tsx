import { branches, hq } from '../data/branches'
import { Icon } from './icons'

const stateOrder: Record<string, number> = {
  Jharkhand: 0,
  Bihar: 1,
  'Uttar Pradesh': 2,
}

export function BranchNetwork() {
  const others = [...branches]
    .filter((b) => !b.hq)
    .sort((a, b) => stateOrder[a.state] - stateOrder[b.state])

  return (
    <section id="branches" className="bg-sand/60">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-clay-dark">
            The Adda network
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ten real desks. Walk in, don&apos;t wait on hold.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Headquartered at Plaza Chowk, Ranchi since 2018, with branches across
            Jharkhand, Bihar and Noida. Every location is a place you can sit
            down with a consultant.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-blob border-2 border-clay bg-paper p-6 shadow-lift sm:p-8">
            <div className="flex items-center gap-2 text-clay-dark">
              <Icon name="pin" size={18} />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Headquarters
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              {hq.city}
            </h3>
            <p className="mt-2 text-sm font-medium text-ink-soft">{hq.state}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {hq.address}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="tel:+917677888748"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-clay-dark"
              >
                <Icon name="phone" size={16} />
                +91 76778 88748
              </a>
              <a
                href="mailto:info@policyadda.co.in"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand"
              >
                info@policyadda.co.in
              </a>
            </div>
          </article>

          <div className="rounded-blob border border-ink/10 bg-paper p-6 shadow-card sm:p-8">
            <h3 className="font-display text-xl font-semibold">
              Other branches
            </h3>
            <ul className="mt-4 divide-y divide-ink/10">
              {others.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      name="pin"
                      size={16}
                      className="shrink-0 text-clay"
                    />
                    <span className="font-medium">{b.city}</span>
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                    {b.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
