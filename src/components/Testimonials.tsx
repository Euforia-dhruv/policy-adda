import { testimonials } from '../data/testimonials'
import { Reveal, Section } from './ui'

export function Testimonials() {
  return (
    <Section tone="sand" as="div">
      <Reveal className="max-w-2xl">
        <span className="eyebrow">
          <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
          From the Adda
        </span>
        <h2 className="mt-4 text-display-md font-semibold sm:text-display-lg">
          People who came back because someone picked up.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-blob border border-white/60 bg-paper p-7 shadow-emboss">
              <span className="font-display text-5xl leading-none text-clay/30" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="-mt-3 flex-1 text-[15px] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-clay to-gold text-sm font-bold text-paper">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.clientType}</span>
                  <span className="block text-xs text-ink-soft">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
