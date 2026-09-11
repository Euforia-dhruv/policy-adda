"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Shield,
  Car,
  HeartPulse,
  Users,
  Briefcase,
  ArrowRight,
  Phone,
  CheckCircle2,
  MapPin,
  Clock,
  FileCheck,
  Headphones,
  Sparkles,
  ChevronRight,
  Play,
  MessageCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Policies", href: "/policies" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0f1011]/80 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#847dff]">
            <Shield size={18} className="text-white" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#f5f5f7]">
            POLICY<span className="text-[#847dff]">ADDA</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#9f9fa0] transition-colors hover:bg-white/5 hover:text-[#f5f5f7]"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+917677888748"
            className="hidden items-center gap-2 rounded-lg bg-[#f5f5f7] px-5 py-2.5 text-sm font-medium text-[#0f1011] transition-colors hover:bg-white sm:inline-flex"
          >
            <Phone size={16} />
            Get Assistance
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#f5f5f7] lg:hidden"
            aria-label="Menu"
          >
            <span className="text-lg">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.06] bg-[#0f1011]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[#f5f5f7] hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+917677888748"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#f5f5f7] px-5 py-3 text-sm font-medium text-[#0f1011]"
              >
                <Phone size={16} />
                Get Assistance
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0f1011]">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-30"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230f1011' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1011]/60 via-[#0f1011]/80 to-[#0f1011]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1011]/90 via-transparent to-[#0f1011]/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#847dff]/30 bg-[#847dff]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[#d1c9ff] uppercase">
              <Sparkles size={14} />
              Your trusted insurance advisor
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-5xl font-light leading-[0.95] tracking-tight text-[#f5f5f7] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Policy Aapka.
            <br />
            <span className="italic text-[#847dff]">Adda</span> Humara.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[#9f9fa0] sm:text-xl"
          >
            Instant assistance, human touch. Navigate the complexity of coverage
            with zero confusion.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/policies"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#f5f5f7] px-7 py-3.5 text-sm font-medium text-[#0f1011] transition-colors hover:bg-white"
            >
              Explore Policies
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+917677888748"
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-medium text-[#f5f5f7] transition-colors hover:bg-white/5"
            >
              <Headphones size={16} />
              Speak to an Expert
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center gap-6 text-xs text-[#6a6b6b]"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#847dff]" />
              12+ Insurer Partners
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-[#847dff]" />
              Since 2018
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#6a6b6b]">Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#847dff] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   INTERACTIVE SCROLL SECTION
   ───────────────────────────────────────────── */

const benefits = [
  {
    icon: "🛣️",
    title: "Roadside Assistance",
    desc: "Breakdown support may be available as an add-on depending on your insurer and plan. Coverage, response time, and service area vary by provider.",
    color: "#847dff",
  },
  {
    icon: "🏥",
    title: "Cashless Claims",
    desc: "Many insurers offer cashless claim settlement at network hospitals and garages. Eligibility depends on your policy, insurer network, and pre-authorization.",
    color: "#00b3dd",
  },
  {
    icon: "🛡️",
    title: "Personal Accident Cover",
    desc: "Personal accident cover provides financial protection in case of accidental death or disability. Coverage terms and limits vary by insurer and plan.",
    color: "#dd90d8",
  },
  {
    icon: "📋",
    title: "Zero Depreciation",
    desc: "An optional add-on available with select motor insurance plans. Reduces or eliminates depreciation deduction on claimable parts. Availability and terms vary by insurer.",
    color: "#90b8f0",
  },
];

function ScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* The floating card slides down as user scrolls */
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  /* Each benefit highlights at its own scroll band */
  const activeIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  return (
    <section ref={sectionRef} className="relative bg-[#0f1011] py-32" style={{ height: "300vh" }}>
      {/* Section header */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-10">
        <div className="mb-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#847dff]/30 bg-[#847dff]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[#d1c9ff] uppercase">
            <FileCheck size={14} />
            Why Policy Adda
          </span>
          <h2 className="mt-6 text-4xl font-light tracking-tight text-[#f5f5f7] sm:text-5xl">
            Coverage that <span className="italic text-[#847dff]">actually</span> works
          </h2>
          <p className="mt-4 text-base text-[#9f9fa0]">
            Not just a policy — a relationship until the claim is settled.
          </p>
        </div>
      </div>

      {/* Sticky two-column layout */}
      <div className="sticky top-16 mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:px-10">
        {/* LEFT — Floating Policy Document */}
        <div className="hidden lg:block">
          <div className="relative h-[500px]">
            <motion.div
              style={{ y: cardY }}
              className="absolute inset-x-0 top-0"
            >
              <div className="rounded-2xl border border-white/10 bg-[#2e2e2e] p-8 shadow-2xl shadow-black/30">
                {/* Document header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#847dff]/15">
                    <Shield size={24} className="text-[#847dff]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f5f5f7]">Policy Adda Insurance</p>
                    <p className="text-xs text-[#9f9fa0]">Digital Policy Document</p>
                  </div>
                </div>

                {/* Document body */}
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-white/[0.04] p-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6a6b6b]">Policy Holder</p>
                    <p className="mt-1 text-sm font-medium text-[#f5f5f7]">Protected Member</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/[0.04] p-3">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6a6b6b]">Coverage</p>
                      <p className="mt-1 text-lg font-medium text-[#f5f5f7]">Comprehensive</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] p-3">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6a6b6b]">Status</p>
                      <p className="mt-1 flex items-center gap-1.5 text-lg font-medium text-emerald-400">
                        <CheckCircle2 size={16} />
                        Active
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {benefits.map((b, i) => (
                      <BenefitIndicator key={i} title={b.title} color={b.color} index={i} activeIndex={activeIndex} />
                    ))}
                  </div>
                </div>

                {/* Document footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#6a6b6b]">Policy ID: PA-2024-001</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#6a6b6b]">Valid: 2024–2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — Benefits */}
        <div className="flex flex-col justify-center gap-32 py-32">
          {benefits.map((b, i) => (
            <BenefitBlock key={i} benefit={b} index={i} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitIndicator({ title, color, index, activeIndex }: { title: string; color: string; index: number; activeIndex: ReturnType<typeof useTransform<number, number>> }) {
  const isActive = useTransform(activeIndex, (v) => Math.round(v) === index);
  const [active, setActive] = useState(false);

  useEffect(() => {
    return isActive.on("change", setActive);
  }, [isActive]);

  return (
    <div className={`flex items-center gap-3 rounded-lg p-2.5 transition-all duration-500 ${active ? "bg-white/[0.06]" : ""}`}>
      <div className={`flex h-2 w-2 shrink-0 rounded-full transition-all duration-500 ${active ? "scale-125" : ""}`} style={{ backgroundColor: active ? color : "#3f4041" }} />
      <span className={`text-xs font-medium transition-colors duration-500 ${active ? "text-[#f5f5f7]" : "text-[#6a6b6b]"}`}>{title}</span>
    </div>
  );
}

function BenefitBlock({ benefit, index, activeIndex }: { benefit: typeof benefits[0]; index: number; activeIndex: ReturnType<typeof useTransform<number, number>> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    return activeIndex.on("change", (v) => setActive(Math.round(v) === index));
  }, [activeIndex, index]);

  return (
    <div ref={ref} className={`transition-all duration-700 ${active ? "opacity-100" : "opacity-30"}`}>
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: `${benefit.color}15` }}>
          {benefit.icon}
        </div>
        <div>
          <h3 className="text-2xl font-light text-[#f5f5f7] sm:text-3xl">{benefit.title}</h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-[#9f9fa0]">{benefit.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   POLICY CATEGORIES
   ───────────────────────────────────────────── */

const categories = [
  { icon: Car, title: "Motor Insurance", desc: "Car, bike, and commercial vehicle coverage.", color: "#847dff" },
  { icon: HeartPulse, title: "Health Insurance", desc: "Individual and family floater plans.", color: "#00b3dd" },
  { icon: Users, title: "Family Insurance", desc: "Life cover for your loved ones.", color: "#dd90d8" },
  { icon: Briefcase, title: "Business & SME", desc: "Corporate and employee benefit plans.", color: "#90b8f0" },
];

function Categories() {
  return (
    <section className="bg-[#090a0b] py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#847dff]/30 bg-[#847dff]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[#d1c9ff] uppercase">
            <Shield size={14} />
            Our Products
          </span>
          <h2 className="mt-6 text-4xl font-light tracking-tight text-[#f5f5f7] sm:text-5xl">
            Everything Policy. <span className="italic text-[#847dff]">One Place.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href="/policies"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#2e2e2e] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl hover:shadow-black/20"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <cat.icon size={26} style={{ color: cat.color }} />
              </div>
              <h3 className="mt-6 text-lg font-light text-[#f5f5f7]">{cat.title}</h3>
              <p className="mt-2 text-sm text-[#9f9fa0]">{cat.desc}</p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-[#847dff] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRUST & HOW IT WORKS
   ───────────────────────────────────────────── */

const steps = [
  { icon: Sparkles, label: "Explore", desc: "Browse policies" },
  { icon: FileCheck, label: "Submit", desc: "Share your needs" },
  { icon: Users, label: "Connect", desc: "Talk to an advisor" },
  { icon: Shield, label: "Assisted", desc: "We handle the rest" },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0f1011] py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#847dff]/30 bg-[#847dff]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[#d1c9ff] uppercase">
            <Clock size={14} />
            Simple Process
          </span>
          <h2 className="mt-6 text-4xl font-light tracking-tight text-[#f5f5f7] sm:text-5xl">
            How it <span className="italic text-[#847dff]">works</span>
          </h2>
          <p className="mt-4 text-base text-[#9f9fa0]">
            Four steps. One advisor. Zero confusion.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center gap-0 sm:flex-row sm:items-start sm:justify-between">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-1 flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#2e2e2e]">
                  <step.icon size={24} className="text-[#847dff]" />
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 hidden h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-white/10 to-transparent sm:block" />
                )}
              </div>
              <h3 className="mt-5 text-lg font-light text-[#f5f5f7]">{step.label}</h3>
              <p className="mt-1 text-sm text-[#9f9fa0]">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="mt-4 h-8 w-[1px] bg-white/10 sm:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER CTA + FOOTER
   ───────────────────────────────────────────── */

function FooterCTA() {
  return (
    <section className="bg-[#090a0b] py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#2e2e2e] p-12 text-center sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#847dff]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#847dff]/10 blur-3xl" />

          <h2 className="relative text-3xl font-light tracking-tight text-[#f5f5f7] sm:text-4xl">
            Your Policy Journey <span className="italic text-[#847dff]">Starts Here.</span>
          </h2>
          <p className="relative mt-4 text-base text-[#9f9fa0]">
            Talk to an advisor today. No spam. No pressure. Just honest guidance.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/policies"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#f5f5f7] px-7 py-3.5 text-sm font-medium text-[#0f1011] transition-colors hover:bg-white"
            >
              Explore Policies
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+917677888748"
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/20 px-7 py-3.5 text-sm font-medium text-[#f5f5f7] transition-colors hover:bg-white/5"
            >
              <Phone size={16} />
              Get Assistance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090a0b]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#847dff]">
                <Shield size={18} className="text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-[#f5f5f7]">
                POLICY<span className="text-[#847dff]">ADDA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9f9fa0]">
              Your neighbourhood insurance and loan consultancy. Named advisors,
              real branch desks, hands-on claims follow-through — since 2018.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-medium text-[#f5f5f7]">Policies</h3>
            <ul className="mt-4 space-y-2.5">
              {["Motor Insurance", "Health Insurance", "Life Insurance", "Business & SME"].map((l) => (
                <li key={l}>
                  <Link href="/policies" className="text-sm text-[#9f9fa0] transition-colors hover:text-[#847dff]">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium text-[#f5f5f7]">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#9f9fa0] transition-colors hover:text-[#847dff]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-[#f5f5f7]">Get in Touch</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-[#9f9fa0]">
                <Phone size={14} className="mt-0.5 shrink-0 text-[#847dff]" />
                <a href="tel:+917677888748" className="hover:text-[#847dff]">+91 76778 88748</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#9f9fa0]">
                <MessageCircle size={14} className="mt-0.5 shrink-0 text-[#847dff]" />
                <a href="https://wa.me/917677888748" target="_blank" rel="noopener noreferrer" className="hover:text-[#847dff]">WhatsApp</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#9f9fa0]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#847dff]" />
                <span>Plaza Chowk, Ranchi 834001</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#9f9fa0]">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#847dff]" />
                <span>Mon–Sat · 9:30 AM – 6 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center text-xs text-[#6a6b6b]">
          © {new Date().getFullYear()} Policy Adda. All rights reserved. Policies are underwritten by respective insurer partners.
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE EXPORT
   ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollSection />
        <Categories />
        <HowItWorks />
        <FooterCTA />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/917677888748?text=Hi%20Policy%20Adda%2C%20I%27d%20like%20help%20with%20a%20policy."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </>
  );
}
