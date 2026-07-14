import { Icon, type IconName } from './icons'
import { Reveal, Section, SectionHeading } from './ui'

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
    <Section id="process" tone="mist" as="div">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps. One relationship, start to claim."
        description="A calm, human process — built so you always know the next move and who is handling it."
      />

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
            <div className="flex h-full flex-col rounded-blob border border-ink/10 bg-paper p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-paper">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-display text-4xl font-semibold text-clay/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.detail}</p>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-clay/40 lg:block"
              >
                <Icon name="arrow" size={20} />
              </span>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
