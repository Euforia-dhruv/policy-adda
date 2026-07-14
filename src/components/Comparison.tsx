import { Reveal, Section, SectionHeading, cx } from './ui'
import { Icon } from './icons'

const rows: { marketplace: string; adda: string }[] = [
  { marketplace: 'A call centre & chatbot', adda: 'A named advisor you can meet' },
  { marketplace: 'Online only, no local desk', adda: 'A branch desk in your city' },
  { marketplace: 'Shows you the cheapest price', adda: 'Compares & explains the policy' },
  { marketplace: 'Relationship ends at checkout', adda: 'Relationship continues to renewal' },
  { marketplace: 'You chase the insurer on claims', adda: 'We handle claims hands-on' },
  { marketplace: 'A faceless national app', adda: 'Your neighbours since 2018' },
]

export function Comparison() {
  return (
    <Section tone="sand" as="div">
      <SectionHeading
        align="center"
        eyebrow="Marketplace vs Adda"
        title="Same products. A completely different experience."
        description="We place the same insurer plans. The difference is who stands next to you — a screen, or a person."
      />

      <Reveal className="relative mx-auto mt-12 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-blob border border-ink/10 bg-paper p-7 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
              The Marketplace
            </p>
            <ul className="mt-5 space-y-4">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-soft" aria-hidden="true">
                    <Icon name="chat" size={13} />
                  </span>
                  {r.marketplace}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-blob bg-gradient-to-br from-clay to-clay-dark p-7 text-paper shadow-lift">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-paper/80">
              Policy Adda
            </p>
            <ul className="mt-5 space-y-4">
              {rows.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-paper">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-paper/15 text-paper" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  {r.adda}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-paper bg-ink font-display text-sm font-bold text-paper shadow-lift md:grid"
          aria-hidden="true"
        >
          VS
        </div>
      </Reveal>

      <p className={cx('mt-8 text-center text-sm text-ink-soft')}>
        Both compare prices. Only one stays for the claim.
      </p>
    </Section>
  )
}
