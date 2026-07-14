import { Icon, type IconName } from './icons'

interface Step {
  icon: IconName
  title: string
  detail: string
}

const steps: Step[] = [
  {
    icon: 'chat',
    title: 'Enquire',
    detail:
      'Drop into a branch or fill the form. Tell us what you need and we listen first — no script, no auto-dialer.',
  },
  {
    icon: 'spark',
    title: 'Compare',
    detail:
      'We shortlist plans from our 20+ insurer partners and lay them side by side in plain language, with the real trade-offs.',
  },
  {
    icon: 'shield',
    title: 'Decide',
    detail:
      'You choose what fits your budget and risk. We handle the paperwork and get your policy or loan documented the same week.',
  },
  {
    icon: 'check',
    title: 'Renew & Claim',
    detail:
      'We remind you before renewal and, if a loss occurs, we liaise with the insurer and chase the claim till it settles.',
  },
]

export function Process() {
  return (
    <section id="process" className="container-page py-16 lg:py-24">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-clay-dark">
          How it works
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Four steps. One relationship, start to claim.
        </h2>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-paper">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="font-display text-3xl font-semibold text-clay">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {s.detail}
            </p>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute right-[-0.75rem] top-6 hidden text-clay lg:block"
              >
                <Icon name="arrow" size={20} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
