import { Icon } from "@/components/icons";
import { partners } from "@/data/partners";

export function PartnerStrip() {
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="py-16">
      <div className="container-page">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="eyebrow">Insurer partners</p>
          <p className="text-sm text-ash">
            We compare policies from {partners.length}+ of India&rsquo;s leading insurers — and you
            pay the same premium as buying direct.
          </p>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-4 pr-4">
          {marqueeItems.map((partner, i) => (
            <span
              key={`${partner}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-surface px-6 py-3 text-sm font-medium text-ash"
            >
              <Icon name="shield-check" size={15} className="text-cobalt" />
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}