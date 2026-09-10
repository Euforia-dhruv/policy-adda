"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { branches, type Branch } from "@/data/branches";

export function BranchNetwork() {
  const hq = useMemo(() => branches.find((b) => b.hq) ?? branches[0], []);
  const [selected, setSelected] = useState<Branch>(hq);

  return (
    <section id="branches" className="scroll-mt-28 py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">Branch network</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            Ten branches, one neighbourhood feel
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            From Ranchi to Patna to Noida — walk into any desk and talk to a real human.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="map-grid relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-surface/60"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-canvas/60" aria-hidden />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              aria-hidden
            >
              {branches.map((b) => (
                <line
                  key={b.id}
                  x1={hq.map.x * 10}
                  y1={hq.map.y * 10}
                  x2={b.map.x * 10}
                  y2={b.map.y * 10}
                  stroke="#5266eb"
                  strokeOpacity={b.id === selected.id ? 0.8 : 0.18}
                  strokeWidth={b.id === selected.id ? 2 : 1}
                  strokeLinecap="round"
                  strokeDasharray="5 5"
                />
              ))}
            </svg>

            {branches.map((b) => {
              const isSelected = b.id === selected.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelected(b)}
                  aria-label={`${b.city} branch`}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none",
                    b.pos
                  )}
                >
                  <span className="relative flex items-center justify-center">
                    {isSelected && (
                      <span className="absolute h-10 w-10 animate-ping rounded-full bg-cobalt/30" />
                    )}
                    <span
                      className={cn(
                        "relative flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
                        isSelected
                          ? "border-cobalt bg-cobalt text-white"
                          : "border-cobalt/40 bg-elevated text-cobalt"
                      )}
                    >
                      <Icon name="pin" size={14} />
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-canvas/80 px-3.5 py-2 text-xs font-medium text-ash ring-1 ring-white/10 backdrop-blur">
              {branches.length} branches · tap a pin
            </div>
          </motion.div>

          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card-raised flex h-fit flex-col gap-5 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cobalt/15 text-cobalt">
                <Icon name="building" size={20} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ivory">{selected.city}</h3>
                  {selected.hq && (
                    <span className="rounded-full bg-cobalt/20 px-2 py-0.5 text-[10px] font-semibold text-cobalt">
                      HQ
                    </span>
                  )}
                </div>
                <p className="text-xs text-ash">{selected.state}</p>
              </div>
            </div>

            <p className="flex items-start gap-2 text-sm text-ash">
              <Icon name="pin" size={15} className="mt-0.5 shrink-0 text-cobalt" />
              {selected.address}
            </p>
            <p className="flex items-center gap-2 text-sm text-ash">
              <Icon name="clock" size={15} className="shrink-0 text-cobalt" />
              {selected.hours}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {selected.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-elevated px-2.5 py-1 text-[11px] font-medium text-ash ring-1 ring-white/10"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="divider" />

            <div className="flex flex-col gap-2">
              <a
                href={`tel:+919431012345`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cobalt text-sm font-semibold text-white transition-colors hover:bg-cobalt-dark"
              >
                <Icon name="phone" size={15} />
                Call {selected.city}
              </a>
              <a
                href="#quote"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold text-ivory transition-colors hover:bg-white/5"
              >
                Book a visit
                <Icon name="arrow" size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}