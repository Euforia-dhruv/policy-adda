import Link from "next/link";
import { Icon } from "@/components/icons";

const quickLinks = [
  { label: "About Policy Adda", href: "/about" },
  { label: "Insurance Products", href: "/policies" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
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
            Your neighbourhood insurance and loan consultancy. Named advisors,
            multiple insurer options, and guidance through the entire process.
          </p>
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

        <div className="flex flex-col gap-3 lg:col-span-2">
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
        <div className="container-page py-6">
          <div className="flex flex-col gap-4 text-xs text-ash/80">
            <p>
              © {new Date().getFullYear()} Policy Adda. All rights reserved.
            </p>
            <p className="leading-relaxed">
              Policy Adda is an insurance and loan consultancy. We facilitate the
              comparison and purchase of insurance policies from licensed insurance
              companies. All policies are underwritten by the respective insurers
              and are subject to their terms and conditions.
            </p>
            <p className="leading-relaxed">
              Insurance is the subject matter of solicitation. For more details on
              coverage, terms, conditions, exclusions, and claims, please refer to
              the policy wording of the respective insurer. Product features,
              benefits, and premiums may vary depending on the insurer, selected
              plan, add-ons, and underwriting.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
