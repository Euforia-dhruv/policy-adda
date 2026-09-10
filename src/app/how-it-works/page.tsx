import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";

const steps = [
  { num: "01", title: "Tell us what you need", desc: "Fill out the form or give us a call. We will understand your requirements in minutes." },
  { num: "02", title: "Compare your options", desc: "We compare plans from 20+ insurers and explain the differences in plain language." },
  { num: "03", title: "Choose with confidence", desc: "Pick the plan that fits. No pressure, no hidden fees — just honest advice." },
  { num: "04", title: "We handle the rest", desc: "Policy issuance, documentation, renewals — we manage it all. You just live your life." },
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
            Insurance made simple, in four steps
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            From first call to claim settlement, Policy Adda makes the entire
            process effortless. Here is how it works.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.num} className="card-material rounded-xl p-8">
              <span className="font-display text-4xl font-medium text-cobalt/30">{step.num}</span>
              <h3 className="mt-4 text-xl font-medium text-ivory">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
