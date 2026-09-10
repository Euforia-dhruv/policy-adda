"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";

const navLinks = [
  { label: "Why Adda", href: "/about" },
  { label: "Products", href: "#products" },
  { label: "Claims", href: "#claims" },
  { label: "Branches", href: "#branches" },
  { label: "Advisors", href: "#advisors" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
];

const PHONE_DISPLAY = "+91 76778 88748";
const PHONE_HREF = "tel:+917677888748";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cobalt text-white">
            <Icon name="shield" size={18} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-ivory">
            Policy <span className="text-cobalt">Adda</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ash transition-colors hover:bg-white/5 hover:text-ivory"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cobalt-dark sm:inline-flex"
          >
            <Icon name="phone" size={16} />
            {PHONE_DISPLAY}
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-elevated text-ivory transition-colors hover:bg-white/5 lg:hidden"
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/10 bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ivory transition-colors hover:bg-white/5"
                >
                  {link.label}
                  <Icon name="chevron-right" size={16} className="text-ash" />
                </motion.a>
              ))}
              <a
                href={PHONE_HREF}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-cobalt px-5 py-3 text-sm font-medium text-white"
              >
                <Icon name="phone" size={16} />
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}