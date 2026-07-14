import { faqs } from '../data/faqs'
import { Accordion, Reveal, Section, SectionHeading } from './ui'

export function Faq() {
  return (
    <Section id="faq" as="div">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="Good to know"
          title="Questions, answered plainly."
          description="Still unsure how a relationship-led consultancy works? Here are the things families in Jharkhand and Bihar ask us most."
        />
        <Reveal delay={0.1}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  )
}
