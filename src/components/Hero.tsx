import { useRef, type ReactNode, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { QuoteForm } from './QuoteForm'
import { Button, Reveal } from './ui'
import { Icon } from './icons'

function FloatCard({
  mx,
  my,
  depth = 12,
  className,
  children,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
  depth?: number
  className?: string
  children: ReactNode
}) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth])
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth])
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  )
}

function AdvisorCard() {
  return (
    <div className="material-leather w-56 rounded-2xl p-4 text-paper shadow-contact">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-clay to-gold text-sm font-bold text-paper shadow-soft">
          PS
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight">Priya Sinha</p>
          <p className="text-xs text-paper/70">Senior Advisor</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-paper/85">
        <span className="availability-dot" />
        Online now · Ranchi HQ
      </div>
    </div>
  )
}

function PolicyCard() {
  return (
    <div className="relative w-64 overflow-hidden rounded-2xl bg-gradient-to-br from-clay to-gold p-5 text-paper shadow-contact">
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-60" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold">Policy Adda</span>
          <span className="h-7 w-9 rounded bg-white/30" aria-hidden="true" />
        </div>
        <p className="mt-5 text-xs uppercase tracking-wide text-paper/80">Car · Comprehensive</p>
        <p className="mt-1 font-display text-2xl font-semibold">Zero Dep</p>
        <p className="mt-3 text-xs text-paper/80">ID PA-4821 · Renews Mar 2026</p>
      </div>
    </div>
  )
}

function ClaimCard() {
  return (
    <div className="card-material w-60 rounded-2xl p-4 shadow-emboss">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Claim PA-2291</p>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-pine text-paper">
          <Icon name="check" size={14} />
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <motion.span
          className="block h-full rounded-full bg-gradient-to-r from-clay to-gold"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-pine">Settled · in 9 days</p>
    </div>
  )
}

function BranchCard() {
  return (
    <div className="card-material flex w-48 items-center gap-3 rounded-2xl p-3.5 shadow-emboss">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay/10 text-clay">
        <Icon name="pin" size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">Ranchi HQ</p>
        <p className="text-xs text-ink-soft">Open · 10 AM – 7 PM</p>
      </div>
    </div>
  )
}

function WhatsAppCard() {
  return (
    <div className="material-forest flex w-52 items-center gap-3 rounded-2xl p-3.5 text-paper shadow-contact">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-paper/15 text-paper">
        <Icon name="chat" size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold text-paper">WhatsApp help</p>
        <p className="text-xs text-paper/75">Replies in ~4 min</p>
      </div>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const stage = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const onMove = (e: PointerEvent) => {
    if (reduce || !stage.current) return
    const r = stage.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section id="top" className="relative">
      <div className="aura pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <span className="eyebrow">
              <Icon name="pin" size={15} />
              Your neighbourhood insurance &amp; loan consultancy
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-display-xl font-normal">
              Policy Aapka,
              <br />
              <span className="text-gradient">Adda Apna.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Not a marketplace that disappears after checkout. Policy Adda is a
              real relationship — a named advisor, a branch desk near you, and
              someone who stays until your claim is settled.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#quote" size="lg" icon="arrow">
                Get your free quote
              </Button>
              <Button href="#claims" size="lg" variant="secondary" iconRight={false} icon="shield">
                How claims work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3.5 py-1.5 text-sm font-medium text-ink-soft shadow-soft">
                <span className="availability-dot" />
                Advisors online now
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                <Icon name="pin" size={16} className="text-clay" /> Ranchi HQ · since 2018
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                <Icon name="shield" size={16} className="text-pine" /> 20+ partners
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div
            ref={stage}
            onPointerMove={onMove}
            className="relative mx-auto min-h-[480px] w-full max-w-md xl:min-h-[560px]"
          >
            {/* Floating desk objects (large screens) */}
            <FloatCard mx={mx} my={my} depth={16} className="absolute -left-6 -top-4 z-0 hidden xl:block">
              <AdvisorCard />
            </FloatCard>
            <FloatCard mx={mx} my={my} depth={-12} className="absolute -right-6 top-10 z-0 hidden xl:block">
              <PolicyCard />
            </FloatCard>
            <FloatCard mx={mx} my={my} depth={14} className="absolute -left-8 bottom-12 z-0 hidden xl:block">
              <BranchCard />
            </FloatCard>
            <FloatCard mx={mx} my={my} depth={-16} className="absolute -right-4 bottom-20 z-0 hidden xl:block">
              <ClaimCard />
            </FloatCard>
            <FloatCard mx={mx} my={my} depth={10} className="absolute bottom-0 left-1/2 z-0 hidden -translate-x-1/2 xl:block">
              <WhatsAppCard />
            </FloatCard>

            {/* The premium quote form, centred and forward */}
            <div id="quote" className="relative z-10 mx-auto w-full max-w-md">
              <QuoteForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
