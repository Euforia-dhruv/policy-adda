import { QuoteForm } from './QuoteForm'
import { Icon } from './icons'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 80% at 85% -10%, rgba(224,164,88,0.35), transparent 55%), radial-gradient(90% 70% at 0% 0%, rgba(194,73,43,0.12), transparent 50%)',
        }}
      />

      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-sm font-medium text-clay-dark">
            <Icon name="pin" size={16} />
            Ranchi-based · serving since 2018 · 10 branches
          </p>

          <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Policy Aapka,
            <br />
            <span className="text-clay">Adda Apna.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Policy Adda is your neighbourhood insurance &amp; loan consultancy —
            not a faceless marketplace. You get a named advisor, a real branch
            desk near you, and someone who stays with you through the claim.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="check" size={18} className="text-sage" />
              <span>20+ insurer partners</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="check" size={18} className="text-sage" />
              <span>Hands-on claims help</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="check" size={18} className="text-sage" />
              <span>Car, Health, Life &amp; Loans</span>
            </div>
          </div>

          <a
            href="#products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-clay"
          >
            Explore what we offer
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="lg:justify-self-end lg:w-full">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
