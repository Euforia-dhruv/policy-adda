import { branches, hq } from '../data/branches'
import { Icon } from './icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay text-paper">
              <Icon name="chat" size={20} />
            </span>
            <span className="font-display text-lg font-semibold">
              Policy<span className="text-clay">Adda</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Insurance &amp; loan consultancy based in Ranchi, serving Jharkhand,
            Bihar and Noida since 2018. Policy Aapka, Adda Apna.
          </p>
          <address className="mt-4 not-italic text-sm text-ink-soft">
            <span className="flex items-start gap-2">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-clay" />
              {hq.address}
            </span>
            <span className="mt-2 flex items-center gap-2">
              <Icon name="phone" size={16} className="shrink-0 text-clay" />
              <a href="tel:+917677888748" className="hover:text-clay">
                +91 76778 88748
              </a>
            </span>
          </address>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#products" className="text-ink-soft hover:text-clay">
                Insurance products
              </a>
            </li>
            <li>
              <a href="#process" className="text-ink-soft hover:text-clay">
                How it works
              </a>
            </li>
            <li>
              <a href="#branches" className="text-ink-soft hover:text-clay">
                Branch network
              </a>
            </li>
            <li>
              <a href="#contact" className="text-ink-soft hover:text-clay">
                Get a quote
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Branches ({branches.length})
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs">
            {branches.map((b) => (
              <li
                key={b.id}
                className="rounded-full border border-ink/15 px-3 py-1.5 text-ink-soft"
              >
                {b.city}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-page py-6">
          <p className="text-xs leading-relaxed text-ink-soft">
            <strong className="text-ink">Beware of spurious calls and
            fraudulent emails.</strong>{' '}
            Policy Adda will never ask for your bank passwords, OTPs or PINs. All
            official communication is from{' '}
            <span className="font-medium text-ink">info@policyadda.co.in</span> or
            our verified number{' '}
            <span className="font-medium text-ink">+91 76778 88748</span>. Report
            suspicious contact to your nearest branch. This is a prototype website;
            figures shown are illustrative and not a binding offer.
          </p>
          <p className="mt-4 text-xs text-ink-soft">
            © {year} Policy Adda. Insurance products are sourced from respective
            insurers; Policy Adda acts as a distributor. IRDAI registration and
            license details to be displayed here once available.
          </p>
        </div>
      </div>
    </footer>
  )
}
