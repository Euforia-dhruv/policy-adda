import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";

const steps = [
  { number: "01", title: "Explore", desc: "Browse insurance categories and learn about different types of coverage available." },
  { number: "02", title: "Share Your Needs", desc: "Tell us what you're looking for — vehicle type, family size, budget, or specific requirements." },
  { number: "03", title: "Compare Options", desc: "Your advisor presents options from multiple insurer partners with clear comparisons." },
  { number: "04", title: "Get Guided Support", desc: "From paperwork to claims — your advisor stays with you throughout the process." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name="spark" size={15} />
            How It Works
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            Simple process, real guidance
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            From first call to claims assistance — here&apos;s how we work.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cobalt/10 text-cobalt">
                <span className="text-lg font-medium">{step.number}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-ivory">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 card-material rounded-xl p-8">
          <p className="text-xs leading-relaxed text-ash/80">
            <Icon name="info" size={14} className="mr-1 inline text-cobalt" />
            Policy Adda facilitates the comparison and purchase of insurance
            policies from licensed insurance companies. The final policy is issued
            by and subject to the terms of the respective insurer.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
