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
      <article className="card-material flex h-full flex-col rounded-xl p-5 shadow-emboss">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ivory">{title}</p>
          <span className="rounded-full bg-cobalt/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cobalt">
            {tag}
          </span>
        </div>
        <div className="mt-4 flex-1 rounded-2xl border border-white/5 bg-white/70 p-4 shadow-inset">
          {children}
        </div>
      </article>
    </Reveal>
  )
}

function DashboardMock() {
  return (
    <div>
      <p className="text-xs text-ash">Good morning, Amit</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ['Policies', '4'],
          ['Renewals', '1'],
          ['Claims', '0'],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl bg-surface p-2 text-center shadow-soft">
            <p className="font-display text-lg font-medium text-cobalt">{v}</p>
            <p className="text-[10px] text-ash">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-surface p-2.5 shadow-soft">
        <div>
          <p className="text-xs font-medium text-ivory">Car · Comprehensive</p>
          <p className="text-[10px] text-ash">Renews 12 Mar 2026</p>
        </div>
        <span className="rounded-full bg-cobalt/15 px-2 py-0.5 text-[10px] font-medium text-ivory">
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
            className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-medium ${
              i < 2
                ? 'bg-elevated text-ivory'
                : i === 2
                  ? 'bg-cobalt text-ivory'
                  : 'bg-white/10 text-ash'
            }`}
          >
            {i < 3 ? '✓' : ''}
          </span>
          <span className={`text-xs ${i === 2 ? 'font-medium text-ivory' : 'text-ash'}`}>
            {s}
          </span>
          {i === 2 && (
            <span className="ml-auto rounded-full bg-cobalt/10 px-2 py-0.5 text-[10px] font-medium text-cobalt">
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
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-sm font-medium text-ivory shadow-soft">
        PS
      </span>
      <p className="mt-2 text-sm font-medium text-ivory">Priya Sinha</p>
      <p className="text-[11px] text-ash">Senior Advisor · 4.9 ★</p>
      <p className="mt-1 text-[10px] text-ash">Hindi · English · Angika</p>
      <div className="mt-3 flex gap-2">
        <span className="flex-1 rounded-full bg-elevated px-3 py-1.5 text-[11px] font-medium text-ivory">
          Message
        </span>
        <span className="flex-1 rounded-full border border-white/15 px-3 py-1.5 text-center text-[11px] font-medium text-ivory">
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
      <p className="text-xs text-ash">Upcoming renewals</p>
      <div className="mt-3 flex items-center justify-between">
        {months.map((m, i) => (
          <div key={m} className="flex flex-col items-center gap-1">
            <span
              className={`h-2.5 w-2.5 rounded-full ${i === 3 ? 'bg-cobalt ring-4 ring-cobalt/20' : 'bg-white/15'}`}
            />
            <span className={`text-[10px] ${i === 3 ? 'font-medium text-cobalt' : 'text-ash'}`}>
              {m}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-surface p-2.5 text-center shadow-soft">
        <p className="text-xs font-medium text-ivory">Car policy renews 12 Mar</p>
        <p className="text-[10px] text-ash">We will remind you 30 days early</p>
      </div>
    </div>
  )
}

function WhatsAppMock() {
  return (
    <div>
      <div className="flex justify-start">
        <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-surface px-3 py-1.5 text-[11px] text-ivory shadow-soft">
          Hi! Your claim PA-2291 is in review 🔍
        </p>
      </div>
      <div className="mt-2 flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-elevated px-3 py-1.5 text-[11px] text-ivory">
          Thanks, when can I expect settlement?
        </p>
      </div>
      <div className="mt-2 flex justify-start">
        <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-surface px-3 py-1.5 text-[11px] text-ivory shadow-soft">
          Usually 9 days. I will update you. ✅
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 shadow-inset">
        <Icon name="chat" size={14} className="text-ivory" />
        <span className="text-[10px] text-ash">Type a message…</span>
      </div>
    </div>
  )
}

export function ConceptScreens() {
  return (
    <Section as="div" className="bg-surface">
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
            <span className="grid h-12 w-12 place-items-center rounded-full bg-cobalt/10 text-cobalt">
              <Icon name="spark" size={22} />
            </span>
            <p className="mt-3 text-sm font-medium text-ash">
              A native app, video advisory &amp; instant endorsements — on the roadmap.
            </p>
          </div>
        </ConceptFrame>
      </div>
    </Section>
  )
}
