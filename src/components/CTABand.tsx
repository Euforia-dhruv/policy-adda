import { QuoteForm } from './QuoteForm'
import { Icon, type IconName } from './icons'
import { Reveal } from './ui'

export function CTABand() {
  return (
    <section id="contact" className="container-page py-16 lg:py-24">
      <Reveal>
        <div className="aura-dark relative overflow-hidden rounded-xl material-forest px-6 py-12 shadow-contact sm:px-12 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-16 lg:py-16">
          <div className="text-ivory">
            <span className="eyebrow text-cobalt">
              <Icon name="spark" size={15} />
              Start the conversation
            </span>
            <h2 className="mt-4 text-display-md font-medium sm:text-display-lg">
              Talk to a real advisor today.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory/80">
              Skip the call-centre queue. Tell us what you need and the Policy Adda
              desk nearest you will call back within one working day — with options,
              not a sales pitch.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="tel:+917677888748"
                className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-medium text-cobalt transition-colors hover:bg-surface"
              >
                <Icon name="phone" size={18} />
                +91 76778 88748
              </a>
              <a
                href="https://wa.me/917677888748"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/40 px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-white/10"
              >
                <Icon name="chat" size={18} />
                Chat on WhatsApp
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-ivory/80 sm:grid-cols-3">
              {(
                [
                  ['pin', '10 branch desks'],
                  ['shield', 'Claims handled'],
                  ['check', 'No spam, no bots'],
                ] as [IconName, string][]
              ).map(([icon, label]) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon name={icon} size={16} className="text-cobalt" />
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
