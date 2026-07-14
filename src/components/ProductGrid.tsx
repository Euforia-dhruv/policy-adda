import { products } from '../data/products'
import { Icon } from './icons'
import { Button, Reveal, Section, SectionHeading, cx } from './ui'

export function ProductGrid() {
  return (
    <Section id="products" as="div">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Insurance, made personal"
          title="Eight covers, one advisor who knows your file."
          description="We place these with 20+ insurer partners and explain the fine print in plain Hindi and English — so you buy what fits, not what is pushed."
        />
        <Reveal className="shrink-0">
          <Button href="#contact" variant="secondary" icon="arrow">
            Compare all quotes
          </Button>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal as="li" key={p.id} delay={Math.min(i * 0.05, 0.3)}>
            <article className="card-hover group flex h-full flex-col rounded-blob border border-ink/10 bg-paper p-6 shadow-card hover:shadow-lift">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand text-clay transition-colors duration-500 group-hover:bg-clay group-hover:text-paper">
                  <Icon name={p.icon} size={24} />
                </span>
                <span className="translate-y-1 text-clay opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
                  <Icon name="arrow" size={18} />
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-clay-dark">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.description}</p>

              <ul className="mt-4 space-y-2">
                {p.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-pine" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-ink-soft/80">
                  Best for: {p.who}
                </span>
                <a
                  href="#contact"
                  className={cx(
                    'inline-flex items-center gap-1 text-sm font-semibold text-clay transition-colors hover:text-clay-dark',
                  )}
                >
                  Learn more
                  <Icon name="arrow" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
