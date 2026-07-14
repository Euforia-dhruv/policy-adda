import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { Icon, type IconName } from './icons'

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* ------------------------------------------------------------------ */
/* Reveal — scroll-into-view entrance                                 */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'ul'
}) {
  const MotionTag = motion[as] as typeof motion.div
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <MotionTag className={className}>
        {children}
      </MotionTag>
    )
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ */
/* Section + SectionHeading                                           */
/* ------------------------------------------------------------------ */
export function Section({
  id,
  children,
  className,
  tone = 'paper',
  as: Tag = 'section',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'paper' | 'sand' | 'ink' | 'mist'
  as?: 'section' | 'div'
}) {
  const tones: Record<string, string> = {
    paper: 'bg-canvas text-ivory',
    sand: 'bg-surface text-ivory',
    mist: 'bg-surface text-ivory',
    ink: 'bg-elevated text-ivory',
  }
  return (
    <Tag id={id} className={cx('py-[72px]', tones[tone], className)}>
      <div className="container-page">{children}</div>
    </Tag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'paper',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'paper' | 'ink'
  className?: string
}) {
  return (
    <Reveal
      className={cx(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-display-md font-medium text-ivory sm:text-display-lg">
        {title}
      </h2>
      {description && (
        <p
          className={cx(
            'mt-5 text-lg leading-relaxed',
            tone === 'ink' ? 'text-ivory/75' : 'text-ash',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Button                                                             */
/* ------------------------------------------------------------------ */
type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary: 'bg-cobalt text-white shadow-soft hover:bg-cobalt-dark',
  secondary: 'border border-white/15 bg-surface text-ivory hover:bg-white/5',
  ghost: 'text-ivory hover:bg-white/5',
  gold: 'bg-cobalt text-white hover:bg-cobalt-dark',
}
const sizeClass: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: Variant
  size?: Size
  className?: string
  icon?: IconName
  iconRight?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconRight = true,
  onClick,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const classes = cx(
    'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300',
    variantClass[variant],
    sizeClass[size],
    className,
  )
  const inner = (
    <>
      {icon && !iconRight && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconRight && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  )
  if (href) {
    const external = href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto') || href.startsWith('wa')
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={ariaLabel}
    >
      {inner}
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/* Counter — animated number on scroll                                */
/* ------------------------------------------------------------------ */
export function Counter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* ScrollProgress — top reading bar                                   */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cobalt via-cobalt/70 to-cobalt"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  )
}

/* ------------------------------------------------------------------ */
/* FloatingWhatsApp                                                   */
/* ------------------------------------------------------------------ */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href="https://wa.me/917677888748?text=Hi%20Policy%20Adda%2C%20I%27d%20like%20a%20quote."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with an advisor on WhatsApp"
      className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-elevated text-ivory shadow-lift sm:h-16 sm:w-16"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.09-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
      </svg>
    </motion.a>
  )
}

/* ------------------------------------------------------------------ */
/* StickyCTA — appears after scrolling past the hero                 */
/* ------------------------------------------------------------------ */
export function StickyCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-6"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container-page">
            <div className="glass flex items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-6">
              <p className="hidden text-sm font-medium text-ash sm:block">
                Talk to a real advisor — callback within one working day.
              </p>
              <p className="text-sm font-medium text-ash sm:hidden">
                Free quote, no spam
              </p>
              <Button href="#contact" size="sm" icon="arrow">
                Get a quote
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/* Accordion — accessible FAQ                                         */
/* ------------------------------------------------------------------ */
export function Accordion({
  items,
  tone = 'paper',
}: {
  items: { q: string; a: string }[]
  tone?: 'paper' | 'ink'
}) {
  const [open, setOpen] = useState<number | null>(0)
  const reduce = useReducedMotion()
  return (
    <div
      className={cx(
        'divide-y rounded-xl border',
        tone === 'ink' ? 'border-white/10 bg-white/[0.03]' : 'border-white/10 bg-surface',
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `faq-panel-${i}`
        const btnId = `faq-btn-${i}`
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
              >
                <span className="font-display text-lg font-medium">{item.q}</span>
                <span
                  className={cx(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform duration-300',
                    tone === 'ink' ? 'border-white/20 text-ivory' : 'border-white/15 text-ivory',
                    isOpen && 'rotate-45',
                  )}
                  aria-hidden="true"
                >
                  <Icon name="spark" size={16} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cx(
                      'px-5 pb-6 pt-0 text-base leading-relaxed sm:px-7',
                      tone === 'ink' ? 'text-ivory/75' : 'text-ash',
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Logo                                                               */
/* ------------------------------------------------------------------ */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx('flex items-center gap-2.5', className)}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-elevated text-ivory ring-1 ring-white/10">
        <Icon name="chat" size={22} />
      </span>
      <span className="font-display text-xl font-medium leading-none text-ivory">
        Policy<span className="text-cobalt">Adda</span>
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* CursorGlow — soft light that follows the pointer                    */
/* ------------------------------------------------------------------ */
export function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[3] h-80 w-80 rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(82,102,235,0.18), rgba(82,102,235,0.08) 42%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

