"use client";

import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Icon } from "@/components/icons";
import { QuoteForm } from "@/components/landing/QuoteForm";

function AdvisorCard() {
  return (
    <div className="flex w-52 items-center gap-3 rounded-2xl border border-white/10 bg-surface/95 p-3.5 backdrop-blur-xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-cobalt/70 text-sm font-semibold text-white">
        PS
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ivory">Priya Sinha</p>
        <p className="text-xs text-ash">Senior Advisor · Motor</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400">
          <span className="availability-dot h-1.5 w-1.5" />
          Available now
        </p>
      </div>
    </div>
  );
}

function PolicyCard() {
  return (
    <div className="w-48 rounded-2xl border border-white/10 bg-surface/95 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs text-ash">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cobalt/15 text-cobalt">
          <Icon name="car" size={14} />
        </span>
        Car Insurance
      </div>
      <div className="mt-2 text-xl font-semibold text-ivory">₹6,240<span className="text-xs font-normal text-ash">/yr</span></div>
      <p className="mt-1 text-[11px] text-ash">Zero dep · Roadside assist</p>
    </div>
  );
}

function ClaimCard() {
  return (
    <div className="w-52 rounded-2xl border border-white/10 bg-surface/95 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between text-xs text-ash">
        <span>Claim settled</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Icon name="check" size={13} />
        </span>
      </div>
      <p className="mt-2 text-xl font-semibold text-ivory">₹82,000</p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-elevated">
        <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cobalt to-emerald-400" />
      </div>
      <p className="mt-2 text-[11px] text-ash">Settled in 8 days</p>
    </div>
  );
}

function BranchCard() {
  return (
    <div className="flex w-48 items-center gap-2.5 rounded-2xl border border-white/10 bg-surface/95 p-3.5 backdrop-blur-xl">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cobalt/15 text-cobalt">
        <Icon name="building" size={16} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ivory">Ranchi HQ</p>
        <p className="text-[11px] text-ash">Open now · 9:30 AM – 6 PM</p>
      </div>
    </div>
  );
}

function WhatsAppCard() {
  return (
    <div className="flex w-44 items-center gap-2.5 rounded-2xl border border-white/10 bg-surface/95 p-3 backdrop-blur-xl">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25d366]/15 text-[#25d366]">
        <Icon name="chat" size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ivory">WhatsApp us</p>
        <p className="text-[11px] text-ash">Replies in minutes</p>
      </div>
    </div>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const advisorX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const policyX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const claimX = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const claimY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const branchX = useTransform(sx, [-0.5, 0.5], [9, -9]);
  const branchY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const whatsappX = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 aura" aria-hidden />
      <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-xl flex-col items-start gap-6"
        >
          <p className="eyebrow">
            <span className="availability-dot" />
            Ranchi&rsquo;s trusted neighbourhood advisor
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
            Policy <span className="text-gradient">Aapka</span>,<br />
            Adda Apna.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-ash sm:text-lg">
            Policy Adda is your neighbourhood insurance and loan Adda in Ranchi. Get a named
            advisor, a real branch desk, and hands-on claims follow-through — compare 10+
            insurers without the online checkout chaos.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cobalt px-7 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dark"
            >
              <Icon name="spark" size={16} />
              Get a Free Quote
            </a>
            <a
              href="#products"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory/30 px-7 text-sm font-semibold text-ivory transition-colors hover:border-ivory hover:bg-white/5"
            >
              Explore Products
              <Icon name="arrow" size={16} />
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-ash">
            <span className="flex items-center gap-1.5">
              <Icon name="star" size={13} className="text-cobalt" />
              4.8/5 from 1,200+ reviews
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>9+ branches · 12+ insurers</span>
          </div>
        </motion.div>

        <div
          className="relative mx-auto w-full max-w-md md:h-[560px] md:max-w-none"
          onMouseMove={onMouseMove}
        >
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt/10 blur-3xl" aria-hidden />

          <motion.div
            style={{ perspective: 1000, rotateX, rotateY }}
            className="relative flex items-center justify-center md:h-full"
          >
            <QuoteForm className="relative z-20 w-full max-w-sm" />

            <motion.div style={{ x: advisorX }} className="absolute right-[2%] top-1/2 z-10 hidden -translate-y-[118%] md:block">
              <div className="animate-float">
                <AdvisorCard />
              </div>
            </motion.div>
            <motion.div style={{ x: policyX }} className="absolute bottom-[15%] left-0 z-10 hidden md:block" >
              <div className="animate-float" style={{ animationDelay: "0.8s" }}>
                <PolicyCard />
              </div>
            </motion.div>
            <motion.div style={{ x: claimX, y: claimY }} className="absolute bottom-[8%] right-0 z-10 hidden md:block">
              <div className="animate-float" style={{ animationDelay: "1.6s" }}>
                <ClaimCard />
              </div>
            </motion.div>
            <motion.div style={{ x: branchX, y: branchY }} className="absolute left-[4%] top-[6%] z-10 hidden md:block">
              <div className="animate-float" style={{ animationDelay: "2.4s" }}>
                <BranchCard />
              </div>
            </motion.div>
            <motion.div style={{ x: whatsappX }} className="absolute top-[14%] right-[10%] z-10 hidden md:block">
              <div className="animate-float" style={{ animationDelay: "3.2s" }}>
                <WhatsAppCard />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}