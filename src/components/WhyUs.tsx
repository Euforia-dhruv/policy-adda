import { Icon, type IconName } from './icons'

interface Contrast {
  icon: IconName
  bad: string
  good: string
  title: string
  detail: string
}

const contrasts: Contrast[] = [
  {
    icon: 'chat',
    title: 'A person, not a portal',
    bad: 'A chatbot and a toll-free number that drops your call.',
    good: 'A named advisor you can walk in and meet at your branch.',
    detail:
      'Every enquiry is handled by a consultant whose name and desk you know — the same person follows your case from quote to claim.',
  },
  {
    icon: 'shield',
    title: 'Claims we actually chase',
    bad: '“Submit online and wait” — you are on your own at the hard moment.',
    good: 'We liaise with the insurer and follow up till settlement.',
    detail:
      'When a loss happens, our team prepares the paperwork, coordinates with the insurer and stays on the claim until it is closed.',
  },
  {
    icon: 'pin',
    title: 'Local, since 2018',
    bad: 'A national app with no one in your city who knows your context.',
    good: '10 real desks across Jharkhand, Bihar & Noida.',
    detail:
      'From Plaza Chowk in Ranchi to Patna and Noida, there is a Policy Adda branch where you can sit down, talk it through and get documents in hand.',
  },
]

export function WhyUs() {
  return (
    <section id="why" className="bg-ink text-paper">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ocher">
            Why Adda, not a marketplace
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            The marketplace compares prices. We build relationships.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/75">
            Policybazaar wins on scale and price comparison. We are not trying to
            out-marketplace them. We are the human, local, relationship-driven
            alternative — the adda where your money matters get talked through.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {contrasts.map((c) => (
            <article
              key={c.title}
              className="rounded-blob border border-paper/10 bg-paper/[0.04] p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-clay text-paper">
                <Icon name={c.icon} size={22} />
              </span>
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>

              <div className="mt-4 space-y-3 text-sm">
                <p className="flex gap-2 text-paper/55">
                  <span className="shrink-0 text-clay-light" aria-hidden="true">
                    ✕
                  </span>
                  <span>
                    <span className="font-medium text-paper/70">Marketplace: </span>
                    {c.bad}
                  </span>
                </p>
                <p className="flex gap-2 text-sage-light">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0" />
                  <span>
                    <span className="font-medium text-paper">Adda: </span>
                    {c.good}
                  </span>
                </p>
              </div>

              <p className="mt-4 border-t border-paper/10 pt-4 text-sm leading-relaxed text-paper/70">
                {c.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
