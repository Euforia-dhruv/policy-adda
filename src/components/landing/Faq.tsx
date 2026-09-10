import { Icon } from "@/components/icons";
import { faqs } from "@/data/faqs";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            Questions, answered plainly
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Still curious? Call, WhatsApp, or drop by a branch — an advisor will take it from
            here.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-white/10 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 outline-none [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-semibold text-ivory sm:text-base">
                  {faq.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elevated text-ash ring-1 ring-white/10 transition-transform duration-300 group-open:rotate-180 group-open:text-cobalt">
                  <Icon name="chevron-down" size={16} />
                </span>
              </summary>
              <p className="pb-6 pr-10 text-sm leading-relaxed text-ash">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}