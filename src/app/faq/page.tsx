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
            Frequently Asked Questions
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            Common questions, clear answers
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            Everything you need to know about Policy Adda and how we work.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card-material rounded-xl p-6">
              <h3 className="font-medium text-ivory">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 card-material rounded-xl p-6">
          <p className="text-xs leading-relaxed text-ash/80">
            <Icon name="info" size={14} className="mr-1 inline text-cobalt" />
            The information provided on this page is for general guidance only and
            does not constitute insurance advice. Policy features, benefits, and
            premiums may vary depending on the insurer, selected plan, add-ons,
            underwriting, and policy terms. Please refer to the policy wording of
            the respective insurer for complete details.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
