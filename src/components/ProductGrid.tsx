import { products } from '../data/products'
import { Icon } from './icons'

export function ProductGrid() {
  return (
    <section id="products" className="container-page py-16 lg:py-24">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-clay-dark">
          Insurance, made personal
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Eight covers, one advisor who knows your file.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We place these with 20+ insurer partners and explain the fine print in
          plain Hindi and English — so you buy what fits, not what is pushed.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <article className="group flex h-full flex-col rounded-blob border border-ink/10 bg-paper p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-clay transition-colors group-hover:bg-clay group-hover:text-paper">
                <Icon name={p.icon} size={24} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-clay-dark">
                {p.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {p.description}
              </p>
              <p className="mt-4 border-t border-ink/10 pt-3 text-xs font-medium uppercase tracking-wide text-ink-soft">
                For: {p.who}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
