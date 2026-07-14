import { Icon, type IconName } from './icons'
import { Reveal, Section, SectionHeading } from './ui'

interface Pillar {
  icon: IconName
  title: string
  body: string
  verse: string
}

const pillars: Pillar[] = [
  {
    icon: 'chat',
    title: 'A person, not a portal',
    body: 'Every enquiry is handled by a consultant whose name and desk you know. The same person follows your case from the first quote to the final claim.',
    verse: 'Marketplace: a chatbot and a toll-free number. Adda: a named advisor you can meet.',
  },
  {
    icon: 'shield',
    title: 'Claims we actually chase',
    body: 'When a loss happens, our team prepares the paperwork, coordinates with the insurer and stays on the claim until it is closed — not “submit online and wait”.',
    verse: 'Marketplace: you are on your own at the hard moment. Adda: we follow through.',
  },
  {
    icon: 'pin',
    title: 'Local, since 2018',
    body: 'Ten real desks across Jharkhand, Bihar and Noida. There is a Policy Adda branch where you can sit down, talk it through and leave with documents in hand.',
    verse: 'Marketplace: a national app, no one in your city. Adda: a neighbour who knows your context.',
  },
]

export function WhyUs() {
  return (
    <Section id="why" tone="ink" as="div">
      <SectionHeading
        tone="ink"
        eyebrow="Why Adda, not a marketplace"
        title="The marketplace compares prices. We build relationships."
        description="Policybazaar wins on scale and price comparison. We are not trying to out-marketplace them. We are the human, local, relationship-driven alternative — the adda where your money matters get talked through."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:bg-white/[0.07]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cobalt text-ivory shadow-soft">
                <Icon name={p.icon} size={22} />
              </span>
              <h3 className="mt-5 text-xl font-medium text-ivory">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/70">
                {p.body}
              </p>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-ivory/55">
                {p.verse}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
