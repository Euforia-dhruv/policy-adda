import { useState } from 'react'
import { motion } from 'framer-motion'
import { branches } from '../data/branches'
import { Icon } from './icons'
import { Reveal, Section, SectionHeading, cx } from './ui'

const lines: Array<[string, string]> = [
  ['ranchi-hq', 'lalpur'],
  ['ranchi-hq', 'ramgarh'],
  ['ranchi-hq', 'hazaribagh'],
  ['ranchi-hq', 'dhanbad'],
  ['ranchi-hq', 'jamshedpur'],
  ['ranchi-hq', 'patna'],
  ['patna', 'biharsharif'],
  ['ramgarh', 'hazaribagh'],
  ['hazaribagh', 'giridih'],
  ['giridih', 'dhanbad'],
  ['dhanbad', 'jamshedpur'],
  ['ranchi-hq', 'noida'],
]

export function BranchNetwork() {
  const [selectedId, setSelectedId] = useState('ranchi-hq')
  const selected = branches.find((b) => b.id === selectedId) ?? branches[0]
  const coord = (id: string) => branches.find((b) => b.id === id)!.map

  return (
    <Section id="branches" as="div">
      <SectionHeading
        eyebrow="The Adda network"
        title="Ten real desks. Tap one to visit."
        description="Headquartered at Plaza Chowk, Ranchi since 2018, with branches across Jharkhand, Bihar and Noida. Every location is a place you can sit down with a consultant."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Interactive map */}
        <Reveal className="relative">
          <div className="map-grid relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-white/10 bg-surface/60 shadow-card sm:aspect-[16/10]">
            <div className="aura pointer-events-none absolute inset-0" aria-hidden="true" />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {lines.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={coord(a).x}
                  y1={coord(a).y}
                  x2={coord(b).x}
                  y2={coord(b).y}
                  stroke="currentColor"
                  className="text-cobalt/30"
                  strokeWidth={0.35}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1, delay: i * 0.06, ease: 'easeInOut' }}
                />
              ))}
            </svg>

            {branches.map((b) => {
              const isHq = !!b.hq
              const isSel = b.id === selectedId
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedId(b.id)}
                  aria-pressed={isSel}
                  aria-label={`Select ${b.city}${isHq ? ' headquarters' : ''} branch`}
                  className={cx(
                    'group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none',
                    b.pos,
                  )}
                >
                  {isHq && (
                    <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt/30 animate-pulse-soft" aria-hidden="true" />
                  )}
                  <span
                    className={cx(
                      'relative block rounded-full transition-all duration-300',
                      isHq ? 'h-4 w-4 bg-cobalt ring-4 ring-cobalt/25' : 'h-3 w-3 bg-white/70 ring-2 ring-ivory',
                      isSel && !isHq && 'bg-cobalt ring-4 ring-cobalt/25 scale-125',
                      'group-hover:scale-125',
                    )}
                  />
                  {(isHq || isSel) && (
                    <span
                      className={cx(
                        'absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ',
                        isHq ? 'bg-cobalt text-ivory' : 'bg-elevated text-ivory',
                      )}
                    >
                      {b.city}
                      {isHq && ' · HQ'}
                    </span>
                  )}
                </button>
              )
            })}

            <span className="absolute bottom-4 left-4 flex items-center gap-3 text-xs font-medium text-ash">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-cobalt ring-4 ring-cobalt/25" /> HQ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-white/70 ring-2 ring-ivory" /> Branch
              </span>
            </span>
          </div>
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.1}>
          <div
            className="card-material flex h-full flex-col rounded-xl p-6 shadow-emboss sm:p-7"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-medium text-ivory">{selected.city}</h3>
                <p className="mt-0.5 text-sm font-medium text-ash">{selected.state}</p>
              </div>
              {selected.hq && (
                <span className="rounded-full bg-cobalt px-3 py-1 text-xs font-medium text-ivory">
                  Headquarters
                </span>
              )}
            </div>

            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ash">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-cobalt" />
              {selected.address}
            </p>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-ash/80">
                Services
              </p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {selected.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-ash">
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-ivory" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <a
                href="tel:+917677888748"
                className="inline-flex items-center gap-2 rounded-full bg-elevated px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-cobalt"
              >
                <Icon name="phone" size={16} />
                Call / WhatsApp
              </a>
              {selected.hq && (
                <a
                  href="mailto:info@policyadda.co.in"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-surface"
                >
                  info@policyadda.co.in
                </a>
              )}
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-ash">
                <Icon name="spark" size={16} className="text-cobalt" />
                {selected.hours}
              </span>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ash/80">
                All branches
              </p>
              <div className="flex flex-wrap gap-2">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedId(b.id)}
                    aria-pressed={b.id === selectedId}
                    className={cx(
                      'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      b.id === selectedId
                        ? 'border-cobalt bg-cobalt text-ivory'
                        : 'border-white/15 text-ash hover:border-cobalt/40 hover:text-cobalt',
                    )}
                  >
                    {b.city}
                    {b.hq && ' · HQ'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
