"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/icons";

const steps = [
  {
    icon: "phone",
    title: "Call or WhatsApp",
    description: "Intimate your claim. Your advisor is on it from the first message.",
  },
  {
    icon: "file-text",
    title: "Document pickup",
    description: "Advisor collects your RC, licence and policy papers — no chasing.",
  },
  {
    icon: "car",
    title: "Surveyor visit",
    description: "The insurer's surveyor assesses the damage at a time that suits you.",
  },
  {
    icon: "check",
    title: "Estimate approval",
    description: "We push for a fair assessment and settlement with the insurer.",
  },
  {
    icon: "settings",
    title: "Garage repair",
    description: "Cashless repair at a network garage near you — zero upfront cost.",
  },
  {
    icon: "check-circle",
    title: "Claim settled",
    description: "Money is credited to your account. We stay on it until it lands.",
  },
];

export function ClaimsExperience() {
  return (
    <section id="claims" className="scroll-mt-28 py-20">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <p className="eyebrow">Claims, hands-on</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ivory sm:text-4xl">
              Claims that feel like someone&rsquo;s got your back
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-ash">
              Online marketplaces hand you a helpline number at claim time. We hand you an
              advisor who picks up your papers, follows the file, and calls you back with
              updates. It&rsquo;s a six-step process — and we run it with you, not for you.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="card-raised flex w-full max-w-sm items-center gap-5 p-6"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cobalt/15 text-cobalt">
                <Icon name="shield-check" size={30} />
              </span>
              <div>
                <p className="font-heading text-4xl font-semibold tracking-tight text-ivory">
                  9 <span className="text-xl text-cobalt">days</span>
                </p>
                <p className="mt-1 text-sm text-ash">Average motor claim turnaround</p>
              </div>
              <span className="availability-dot ml-auto" />
            </motion.div>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10" aria-hidden />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-gradient-to-b from-cobalt via-cobalt to-cobalt/20"
              aria-hidden
            />

            <ol className="flex flex-col">
              {steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  <span className="relative z-10 flex h-8 w-10 shrink-0 items-center justify-center self-start rounded-full bg-elevated text-cobalt ring-1 ring-white/10">
                    <Icon name={step.icon} size={16} />
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold text-ivory">{step.title}</h3>
                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-ash">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}