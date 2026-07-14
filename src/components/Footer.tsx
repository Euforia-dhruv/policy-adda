import { branches, hq } from '../data/branches'
import { Icon } from './icons'
import { Logo } from './ui'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">
            Insurance &amp; loan consultancy based in Ranchi, serving Jharkhand,
            Bihar and Noida since 2018. Policy Aapka, Adda Apna.
          </p>
          <address className="mt-6 not-italic text-sm text-ash">
            <span className="flex items-start gap-2">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-cobalt" />
              {hq.address}
            </span>
            <a
              href="tel:+917677888748"
              className="mt-3 flex items-center gap-2 transition-colors hover:text-cobalt"
            >
              <Icon name="phone" size={16} className="shrink-0 text-cobalt" />
              +91 76778 88748
            </a>
            <a
              href="mailto:info@policyadda.co.in"
              className="mt-2 flex items-center gap-2 transition-colors hover:text-cobalt"
            >
              <Icon name="chat" size={16} className="shrink-0 text-cobalt" />
              info@policyadda.co.in
            </a>
          </address>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-medium uppercase tracking-wide text-ash">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ['#products', 'Insurance products'],
              ['#claims', 'Claims experience'],
              ['#branches', 'Branch network'],
              ['#advisors', 'Meet advisors'],
              ['#faq', 'FAQ'],
              ['#contact', 'Get a quote'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-ash transition-colors hover:text-cobalt">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wide text-ash">
            Branches ({branches.length})
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs">
            {branches.map((b) => (
              <li
                key={b.id}
                className="rounded-full border border-white/15 px-3 py-1.5 text-ash"
              >
                {b.city}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6">
          <p className="text-xs leading-relaxed text-ash">
            <strong className="font-medium text-ivory">Beware of spurious calls and
            fraudulent emails.</strong>{' '}
            Policy Adda will never ask for your bank passwords, OTPs or PINs. All
            official communication is from{' '}
            <span className="font-medium text-ivory">info@policyadda.co.in</span> or our
            verified number{' '}
            <span className="font-medium text-ivory">+91 76778 88748</span>. Report
            suspicious contact to your nearest branch. This is a prototype website;
            figures shown are illustrative and not a binding offer.
          </p>
          <p className="mt-4 text-xs text-ash">
            © {year} Policy Adda. Insurance products are sourced from respective
            insurers; Policy Adda acts as a distributor. IRDAI registration and
            license details to be displayed here once available.
          </p>
        </div>
      </div>
    </footer>
  )
}
