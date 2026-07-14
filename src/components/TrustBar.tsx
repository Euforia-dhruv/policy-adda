import { Counter, Reveal, cx } from './ui'
import { Icon, type IconName } from './icons'

interface Stat {
  icon: IconName
  value?: number
  prefix?: string
  suffix?: string
  plain?: string
  label: string
  decimals?: number
}

const stats: Stat[] = [
  { icon: 'pin', value: 10, suffix: '', label: 'Branch desks across 3 states' },
  { icon: 'shield', value: 20, suffix: '+', label: 'Insurer & loan partners' },
  { icon: 'check', value: 9, suffix: ' days', label: 'Typical claim turnaround' },
  { icon: 'chat', plain: '2018', label: 'Serving families since' },
]

export function TrustBar() {
  return (
    <section className="relative -mt-4 lg:-mt-8" aria-label="Why trust Policy Adda">
      <div className="container-page">
        <Reveal>
          <div className="card-material overflow-hidden rounded-xl">
            <dl className="grid grid-cols-2 divide-ink/10 lg:grid-cols-4 lg:divide-x">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cx(
                    'flex items-center gap-4 px-6 py-7',
                    i % 2 === 1 && 'lg:border-l lg:border-white/10',
                    i >= 2 && 'border-t border-white/10 lg:border-t-0',
                  )}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cobalt/10 text-cobalt">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <div>
                    <dt className="font-display text-3xl font-medium text-ivory">
                      {s.plain ? (
                        s.plain
                      ) : (
                        <Counter to={s.value ?? 0} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                      )}
                    </dt>
                    <dd className="mt-1 text-xs font-medium leading-snug text-ash">
                      {s.label}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
