import { motion, useReducedMotion } from 'framer-motion'
import { QuoteForm } from './QuoteForm'
import { Button, Reveal } from './ui'
import { Icon } from './icons'

const trustPills = [
  { icon: 'pin' as const, label: 'Ranchi HQ · since 2018' },
  { icon: 'check' as const, label: '10 branch desks' },
  { icon: 'shield' as const, label: '20+ insurer partners' },
]

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="aura pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-clay/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <span className="eyebrow">
              <Icon name="pin" size={15} />
              Your neighbourhood insurance &amp; loan consultancy
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-display-xl font-semibold">
              Policy Aapka,
              <br />
              <span className="text-gradient">Adda Apna.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Not a marketplace that disappears after checkout. Policy Adda is a
              real relationship — a named advisor, a branch desk near you, and
              someone who stays until your claim is settled.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#quote" size="lg" icon="arrow">
                Get your free quote
              </Button>
              <Button href="#claims" size="lg" variant="secondary" iconRight={false} icon="shield">
                How claims work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {trustPills.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-clay/10 text-clay">
                    <Icon name={p.icon} size={15} />
                  </span>
                  {p.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative lg:justify-self-end">
          <div id="quote" className="relative w-full max-w-md lg:w-[30rem]">
            <QuoteForm />

            {/* Floating advisor chip */}
            <motion.div
              className="glass absolute -left-6 -top-6 hidden rounded-2xl px-4 py-3 sm:flex"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-clay to-gold text-sm font-bold text-paper">
                PS
              </span>
              <div className="ml-3">
                <p className="text-xs font-semibold text-ink">Priya Sinha</p>
                <p className="text-[11px] text-ink-soft">Advisor · Health &amp; Term</p>
              </div>
            </motion.div>

            {/* Floating claim-settled chip */}
            <motion.div
              className="glass absolute -bottom-7 -right-4 hidden items-center gap-2 rounded-2xl px-4 py-3 sm:flex"
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-pine text-paper">
                <Icon name="check" size={16} />
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">Claim settled</p>
                <p className="text-[11px] text-ink-soft">in 9 days · Giridih</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
