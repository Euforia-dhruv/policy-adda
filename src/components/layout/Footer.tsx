import Link from "next/link";
import { Icon } from "@/components/icons";

const quickLinks = [
  { label: "Why Policy Adda", href: "/about" },
  { label: "Insurance Products", href: "#products" },
  { label: "How Claims Work", href: "#claims" },
  { label: "Find a Branch", href: "#branches" },
  { label: "Meet the Advisors", href: "#advisors" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "/contact" },
];

const branchLinks = [
  { label: "Ranchi — Head Office", href: "#branches" },
  { label: "Jamshedpur", href: "#branches" },
  { label: "Dhanbad", href: "#branches" },
  { label: "Patna", href: "#branches" },
  { label: "Hazaribagh", href: "#branches" },
];

const contactDetails = [
  { icon: "phone" as const, label: "Phone", value: "+91 76778 88748", href: "tel:+917677888748" },
  { icon: "mail" as const, label: "Email", value: "info@policyadda.co.in", href: "mailto:info@policyadda.co.in" },
  { icon: "pin" as const, label: "Head Office", value: "Z Complex, Near Bata Showroom, Tharpakhna, Plaza Chowk, Ranchi 834001" },
  { icon: "clock" as const, label: "Hours", value: "Mon–Sat · 9:30 AM – 6 PM" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cobalt text-white">
              <Icon name="shield" size={18} />
            </span>
            <span className="text-lg font-semibold tracking-tight text-ivory">
              Policy <span className="text-cobalt">Adda</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-ash">
            Your neighbourhood insurance and loan consultancy. A named advisor, a real
            branch desk, and hands-on claims follow-through — since 2018.
          </p>
          <div className="flex items-center gap-2 text-xs text-ash">
            <span className="availability-dot" />
            Available now across 9+ branches
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ivory">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-ash transition-colors hover:text-cobalt">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ivory">Our Branches</h3>
          <ul className="flex flex-col gap-2">
            {branchLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-ash transition-colors hover:text-cobalt">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ivory">Get in Touch</h3>
          <ul className="flex flex-col gap-3">
            {contactDetails.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-elevated text-cobalt">
                  <Icon name={item.icon} size={15} />
                </span>
                <div>
                  <p className="text-xs text-ash">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-ivory transition-colors hover:text-cobalt">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-ivory">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ash">
            © {new Date().getFullYear()} Policy Adda. All rights reserved.
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-ash/80">
            Policies are underwritten by the respective insurer and are subject to their terms
            and conditions. Policy Adda is a licensed insurance facilitator and earns a commission
            from insurers — you pay the same premium as buying direct.
          </p>
        </div>
      </div>
    </footer>
  );
}