import { useEffect, useId, useState } from 'react'
import { Icon } from './icons'

const links = [
  { href: '#why', label: 'Why Adda' },
  { href: '#products', label: 'Products' },
  { href: '#process', label: 'How it works' },
  { href: '#branches', label: 'Branches' },
  { href: '#contact', label: 'Contact' },
]

function Logo() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2 rounded-lg"
      aria-label="Policy Adda home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay text-paper">
        <Icon name="chat" size={20} />
      </span>
      <span className="font-display text-lg font-semibold leading-none">
        Policy<span className="text-clay">Adda</span>
      </span>
    </a>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? 'border-ink/10 bg-paper/90 backdrop-blur'
          : 'border-transparent bg-paper'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded text-sm font-medium text-ink-soft transition-colors hover:text-clay"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="tel:+917677888748"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-clay sm:inline-flex"
          >
            <Icon name="phone" size={16} />
            +91 76778 88748
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 text-ink md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id={panelId}
        className={`overflow-hidden border-t border-ink/10 md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        } transition-[max-height] duration-300`}
      >
        <ul className="container-page flex flex-col gap-1 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-ink hover:bg-sand"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="tel:+917677888748"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-base font-semibold text-paper"
            >
              <Icon name="phone" size={18} />
              +91 76778 88748
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
