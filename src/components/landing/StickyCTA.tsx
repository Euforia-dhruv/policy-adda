"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/icons";

const PHONE_HREF = "tel:+917677888748";

export function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-canvas/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl lg:hidden"
      id="sticky-cta"
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href="#quote"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-cobalt text-sm font-semibold text-white transition-colors hover:bg-cobalt-dark"
        >
          <Icon name="spark" size={16} />
          Get Quote
        </a>
        <a
          href={PHONE_HREF}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold text-ivory transition-colors hover:bg-white/5"
        >
          <Icon name="phone" size={16} />
          Call Now
        </a>
      </div>
    </motion.div>
  );
}