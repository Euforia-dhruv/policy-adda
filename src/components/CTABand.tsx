import { QuoteForm } from './QuoteForm'
import { Icon } from './icons'

export function CTABand() {
  return (
    <section id="contact" className="container-page py-16 lg:py-20">
      <div className="overflow-hidden rounded-blob bg-clay px-6 py-12 shadow-lift sm:px-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:px-14 lg:py-16">
        <div className="text-paper">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Talk to a real advisor today.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/85">
            Skip the call-centre queue. Tell us what you need and the Policy Adda
            desk nearest you will call back within one working day — with options,
            not a sales pitch.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a
              href="tel:+917677888748"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-semibold text-clay transition-colors hover:bg-sand"
            >
              <Icon name="phone" size={18} />
              +91 76778 88748
            </a>
            <a
              href="mailto:info@policyadda.co.in"
              className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-5 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              info@policyadda.co.in
            </a>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <QuoteForm compact />
        </div>
      </div>
    </section>
  )
}
