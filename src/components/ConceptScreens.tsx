import { type ReactNode } from 'react'
import { Icon } from './icons'
import { Reveal, Section, SectionHeading } from './ui'

function ConceptFrame({
  title,
  tag = 'Concept',
  children,
}: {
  title: string
  tag?: string
  children: ReactNode
}) {
  return (
    <Reveal>
      <article className="card-material flex h-full flex-col rounded-blob p-5 shadow-emboss">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">{title}</p>
          <span className="rounded-full bg-clay/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-clay-dark">
            {tag}
          </span>
        </div>
        <div className="mt-4 flex-1 rounded-2xl border border-ink/5 bg-white/70 p-4 shadow-inset">
          {children}
        </div>
      </article>
    </Reveal>
  )
}

function DashboardMock() {
  return (
    <div>
      <p className="text-xs text-ink-soft">Good morning, Amit</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ['Policies', '4'],
          ['Renewals', '1'],
          ['Claims', '0'],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl bg-paper p-2 text-center shadow-soft">
            <p className="font-display text-lg font-semibold text-clay">{v}</p>
            <p className="text-[10px] text-ink-soft">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-paper p-2.5 shadow-soft">
        <div>
          <p className="text-xs font-semibold text-ink">Car · Comprehensive</p>
          <p className="text-[10px] text-ink-soft">Renews 12 Mar 2026</p>
        </div>
        <span className="rounded-full bg-pine/15 px-2 py-0.5 text-[10px] font-semibold text-pine">
          Active
        </span>
      </div>
    </div>
  )
}

function ClaimsMock() {
  const steps = ['Submitted', 'Advisor assigned', 'In review', 'Settled']
  return (
    <ul className="space-y-2.5">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2.5">
          <span
            className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
              i < 2
                ? 'bg-pine text-paper'
                : i === 2
                  ? 'bg-clay text-paper'
                  : 'bg-ink/10 text-ink-soft'
            }`}
          >
            {i < 3 ? '✓' : ''}
          </span>
          <span className={`text-xs ${i === 2 ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
            {s}
          </span>
          {i === 2 && (
            <span className="ml-auto rounded-full bg-clay/10 px-2 py-0.5 text-[10px] font-semibold text-clay-dark">
              In review
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

function AdvisorMock() {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-clay to-gold text-sm font-bold text-paper shadow-soft">
        PS
      </span>
      <p className="mt-2 text-sm font-semibold text-ink">Priya Sinha</p>
      <p className="text-[11px] text-ink-soft">Senior Advisor · 4.9 ★</p>
      <p className="mt-1 text-[10px] text-ink-soft">Hindi · English · Angika</p>
      <div className="mt-3 flex gap-2">
        <span className="flex-1 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-paper">
          Message
        </span>
        <span className="flex-1 rounded-full border border-ink/15 px-3 py-1.5 text-center text-[11px] font-semibold text-ink">
          Call
        </span>
      </div>
    </div>
  )
}

function RenewalMock() {
  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr']
  return (
    <div>
      <p className="text-xs text-ink-soft">Upcoming renewals</p>
      <div className="mt-3 flex items-center justify-between">
        {months.map((m, i) => (
          <div key={m} className="flex flex-col items-center gap-1">
            <span
              className={`h-2.5 w-2.5 rounded-full ${i === 3 ? 'bg-clay ring-4 ring-clay/20' : 'bg-ink/15'}`}
            />
            <span className={`text-[10px] ${i === 3 ? 'font-semibold text-clay-dark' : 'text-ink-soft'}`}>
              {m}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-paper p-2.5 text-center shadow-soft">
        <p className="text-xs font-semibold text-ink">Car policy renews 12 Mar</p>
        <p className="text-[10px] text-ink-soft">We will remind you 30 days early</p>
      </div>
    </div>
  )
}

function WhatsAppMock() {
  return (
    <div>
      <div className="flex justify-start">
        <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-paper px-3 py-1.5 text-[11px] text-ink shadow-soft">
          Hi! Your claim PA-2291 is in review 🔍
        </p>
      </div>
      <div className="mt-2 flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-pine px-3 py-1.5 text-[11px] text-paper">
          Thanks, when can I expect settlement?
        </p>
      </div>
      <div className="mt-2 flex justify-start">
        <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-paper px-3 py-1.5 text-[11px] text-ink shadow-soft">
          Usually 9 days. I will update you. ✅
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 shadow-inset">
        <Icon name="chat" size={14} className="text-pine" />
        <span className="text-[10px] text-ink-soft">Type a message…</span>
      </div>
    </div>
  )
}

export function ConceptScreens() {
  return (
    <Section as="div" className="bg-mist">
      <SectionHeading
        eyebrow="The future, not just a website"
        title="A relationship you can hold in your hand."
        description="Policy Adda is building the product around the promise — dashboards, claims tracking, advisor chat and renewals, all in one calm place. These are concept previews of what is coming."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ConceptFrame title="Customer Dashboard">
          <DashboardMock />
        </ConceptFrame>
        <ConceptFrame title="Claims Tracking">
          <ClaimsMock />
        </ConceptFrame>
        <ConceptFrame title="Advisor Profile">
          <AdvisorMock />
        </ConceptFrame>
        <ConceptFrame title="Renewal Timeline">
          <RenewalMock />
        </ConceptFrame>
        <ConceptFrame title="WhatsApp Support">
          <WhatsAppMock />
        </ConceptFrame>
        <ConceptFrame title="And more" tag="Roadmap">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-clay/10 text-clay">
              <Icon name="spark" size={22} />
            </span>
            <p className="mt-3 text-sm font-medium text-ink-soft">
              A native app, video advisory &amp; instant endorsements — on the roadmap.
            </p>
          </div>
        </ConceptFrame>
      </div>
    </Section>
  )
}
