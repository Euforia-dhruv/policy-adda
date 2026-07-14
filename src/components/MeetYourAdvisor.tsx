import { advisors } from '../data/advisors'
import { Icon } from './icons'
import { Reveal, Section, SectionHeading, cx } from './ui'

export function MeetYourAdvisor() {
  return (
    <Section id="advisors" tone="mist" as="div">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Meet your advisor"
          title="Real people. Named, and accountable."
          description="You are not a ticket number. Every policy and claim is owned by a consultant you can call by name — here are a few of the people across our desks."
        />
        <Reveal className="shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sand"
          >
            <Icon name="chat" size={18} />
            Request a specific advisor
          </a>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {advisors.map((a, i) => (
          <Reveal as="li" key={a.id} delay={Math.min(i * 0.07, 0.28)}>
            <article className="card-hover group flex h-full flex-col rounded-blob border border-white/60 bg-paper p-6 shadow-emboss hover:shadow-contact">
              <div className="flex items-center gap-4">
                <span
                  className={cx(
                    'grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-lg font-bold text-paper shadow-soft',
                    a.accent,
                  )}
                  aria-hidden="true"
                >
                  {a.initials}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{a.name}</h3>
                  <p className="text-sm font-medium text-clay-dark">{a.role}</p>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Icon name="spark" size={16} className="mt-0.5 shrink-0 text-clay" />
                  <span>
                    <dt className="sr-only">Specialisation</dt>
                    {a.specialization}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={16} className="shrink-0 text-pine" />
                  <span>
                    <dt className="sr-only">Experience</dt>
                    {a.experience} experience
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="chat" size={16} className="mt-0.5 shrink-0 text-ink-soft" />
                  <span>
                    <dt className="sr-only">Languages</dt>
                    {a.languages.join(' · ')}
                  </span>
                </div>
              </dl>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-soft/80">
                  <span className="availability-dot" />
                  {a.city}
                </span>
                <div className="flex gap-2">
                  <a
                    href="tel:+917677888748"
                    aria-label={`Call ${a.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <Icon name="phone" size={15} />
                  </a>
                  <a
                    href="https://wa.me/917677888748"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Message ${a.name} on WhatsApp`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-pine hover:text-paper"
                  >
                    <Icon name="chat" size={15} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
