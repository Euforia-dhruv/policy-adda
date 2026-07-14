import { testimonials } from '../data/testimonials'

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="container-page py-16 lg:py-24"
    >
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-clay-dark">
          From the Adda
        </p>
        <h2 id="testimonials-heading" className="text-3xl font-semibold sm:text-4xl">
          People who came back because someone picked up.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="flex h-full flex-col rounded-blob border border-ink/10 bg-sand/50 p-6 shadow-card"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-ink">
              <span className="font-display text-4xl leading-none text-clay">
                &ldquo;
              </span>
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-semibold text-paper">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold">{t.clientType}</span>
                <span className="block text-xs text-ink-soft">{t.location}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
