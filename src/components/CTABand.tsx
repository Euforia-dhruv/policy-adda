import { QuoteForm } from './QuoteForm'
import { Icon, type IconName } from './icons'
import { Reveal } from './ui'

export function CTABand() {
  return (
    <section id="contact" className="container-page py-16 lg:py-24">
      <Reveal>
        <div className="aura-dark relative overflow-hidden rounded-4xl material-forest px-6 py-12 shadow-contact sm:px-12 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-16 lg:py-16">
          <div className="text-paper">
            <span className="eyebrow text-gold">
              <Icon name="spark" size={15} />
              Start the conversation
            </span>
            <h2 className="mt-4 text-display-md font-semibold sm:text-display-lg">
              Talk to a real advisor today.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/80">
              Skip the call-centre queue. Tell us what you need and the Policy Adda
              desk nearest you will call back within one working day — with options,
              not a sales pitch.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="tel:+917677888748"
                className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-clay transition-colors hover:bg-sand"
              >
                <Icon name="phone" size={18} />
                +91 76778 88748
              </a>
              <a
                href="https://wa.me/917677888748"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                <Icon name="chat" size={18} />
                Chat on WhatsApp
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-paper/80 sm:grid-cols-3">
              {(
                [
                  ['pin', '10 branch desks'],
                  ['shield', 'Claims handled'],
                  ['check', 'No spam, no bots'],
                ] as [IconName, string][]
              ).map(([icon, label]) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon name={icon} size={16} className="text-gold" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 lg:mt-0">
            <QuoteForm compact />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
