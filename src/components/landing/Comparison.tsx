import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";

const rows = [
  {
    marketplace: "A checkout page, then silence",
    adda: "A named advisor who knows you by name",
  },
  {
    marketplace: "Upload every document yourself",
    adda: "Advisor collects papers and handles paperwork",
  },
  {
    marketplace: "File your own claim and chase the insurer",
    adda: "Hands-on claim follow-through till settlement",
  },
  {
    marketplace: "Call centre, long hold times",
    adda: "WhatsApp, call, or walk into a branch",
  },
  {
    marketplace: "English-only PDFs and jargon",
    adda: "Hindi + regional languages, plain & simple",
  },
  {
    marketplace: "See you at the next renewal",
    adda: "In touch all year, before you even ask",
  },
];

export function Comparison() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">Why Policy Adda</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            Marketplace vs. Adda
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            The difference between buying a price and buying a relationship — measured at the
            moments that actually matter.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-7">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-elevated text-ash">
                <Icon name="x-circle" size={20} />
              </span>
              <div>
                <h3 className="font-semibold text-ivory">The Marketplace</h3>
                <p className="text-xs text-ash">Self-serve price comparison</p>
              </div>
            </div>
            <ul className="mt-5 flex flex-col gap-4">
              {rows.map((row) => (
                <li key={row.marketplace} className="flex items-start gap-3 text-sm text-ash">
                  <Icon name="x-circle" size={16} className="mt-0.5 shrink-0 text-ash/60" />
                  {row.marketplace}
                </li>
              ))}
            </ul>
          </div>

          <div className="material-forest rounded-2xl border border-cobalt/30 p-7">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt text-white">
                <Icon name="check-circle" size={20} />
              </span>
              <div>
                <h3 className="font-semibold text-ivory">Policy Adda</h3>
                <p className="text-xs text-ash">Your neighbourhood advisor</p>
              </div>
            </div>
            <ul className="mt-5 flex flex-col gap-4">
              {rows.map((row) => (
                <li
                  key={row.adda}
                  className={cn("flex items-start gap-3 text-sm font-medium text-ivory")}
                >
                  <Icon name="check-circle" size={16} className="mt-0.5 shrink-0 text-cobalt" />
                  {row.adda}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}