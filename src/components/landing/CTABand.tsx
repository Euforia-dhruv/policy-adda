import { Icon } from "@/components/icons";
import { QuoteForm } from "@/components/landing/QuoteForm";

const PHONE_DISPLAY = "+91 76778 88748";
const PHONE_HREF = "tel:+917677888748";
const WHATSAPP_HREF = "https://wa.me/917677888748?text=Hi%20Policy%20Adda%2C%20I%27d%20like%20a%20quote.";

export function CTABand() {
  return (
    <section id="quote" className="scroll-mt-28 py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl material-forest px-6 py-14 sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cobalt/15 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cobalt/10 blur-3xl" aria-hidden />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <p className="eyebrow">
                <span className="availability-dot" />
                Free · No obligation
              </p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ivory sm:text-4xl">
                Policy Aapka, Adda Apna — <span className="text-gradient">start here.</span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-ash">
                Tell us what you need and a named advisor will call you back in minutes with a
                side-by-side comparison — at the same price you&rsquo;d pay online.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-cobalt px-7 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dark"
                >
                  <Icon name="phone" size={16} />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory/25 px-7 text-sm font-semibold text-ivory transition-colors hover:bg-white/5"
                >
                  <Icon name="chat" size={16} />
                  WhatsApp us
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ash">
                <span className="flex items-center gap-1.5">
                  <Icon name="check" size={13} className="text-cobalt" />
                  Same premium as direct
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" size={13} className="text-cobalt" />
                  No advisory fee
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" size={13} className="text-cobalt" />
                  Hindi + English
                </span>
              </div>
            </div>

            <QuoteForm className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}