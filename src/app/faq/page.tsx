import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";
import { faqs } from "@/data/faqs";

export default function FaqPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name="info" size={15} />
            FAQ
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            Questions, answered plainly
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            Here are the things families in Jharkhand and Bihar ask us most.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="card-material rounded-xl group">
              <summary className="flex cursor-pointer items-center justify-between p-6 text-ivory">
                <span className="font-medium">{faq.question}</span>
                <Icon name="chevron-down" size={18} className="shrink-0 text-ash transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm leading-relaxed text-ash">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
