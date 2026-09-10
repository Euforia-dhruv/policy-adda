"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/icons";

const WHATSAPP_HREF = "https://wa.me/917677888748?text=Hi%20Policy%20Adda%2C%20I%27d%20like%20a%20quote.";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25d366]"
        animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        aria-hidden
      />
      <Icon name="chat" size={24} className="relative" />
    </motion.a>
  );
}