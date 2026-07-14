import { motion } from 'framer-motion'
import { Reveal, Section, SectionHeading, Button } from './ui'

const steps = [
  {
    title: 'Claim submitted',
    detail: 'You call or walk in. We log it the same day — no portal maze, no waiting on hold.',
  },
  {
    title: 'Advisor assigned',
    detail: 'A named claims specialist owns your case end to end. You always know who to call.',
  },
  {
    title: 'Documents reviewed',
    detail: 'We collect and check every paper before it reaches the insurer, so nothing bounces.',
  },
  {
    title: 'Insurer follow-up',
    detail: 'We coordinate with the insurer and chase status weekly — you are never the nagging caller.',
  },
  {
    title: 'Approval',
    detail: 'We explain the settlement in plain language and flag anything that looks off.',
  },
  {
    title: 'Settlement',
    detail: 'Payout released. We confirm you received it. The relationship does not end at checkout.',
  },
]

export function ClaimsExperience() {
  return (
    <Section id="claims" as="div">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Claims, handled with you"
            title="We stay with you until your claim is settled."
            description="A marketplace hands you a form and walks away. Policy Adda assigns a person who follows the claim to the finish line — because that is the moment you actually need us."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="rounded-blob border border-ink/10 bg-sand px-6 py-5 shadow-card">
                <p className="font-display text-4xl font-semibold text-clay">9 days</p>
                <p className="mt-1 text-xs font-medium text-ink-soft">Typical motor claim turnaround</p>
              </div>
              <Button href="#contact" icon="arrow">
                Talk to claims desk
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ol className="relative pl-12">
            <motion.span
              className="absolute left-[11px] top-3 bottom-3 w-0.5 origin-top rounded-full bg-gradient-to-b from-clay via-gold to-pine"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <li key={s.title} className="relative pb-9 last:pb-0">
                <span className="absolute -left-12 top-0 grid h-6 w-6 place-items-center rounded-full border-2 border-clay bg-paper text-clay shadow-soft">
                  <span className="h-2 w-2 rounded-full bg-clay" />
                </span>
                <div className="rounded-blob border border-ink/10 bg-paper p-5 shadow-card transition-transform duration-500 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-semibold text-clay-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
