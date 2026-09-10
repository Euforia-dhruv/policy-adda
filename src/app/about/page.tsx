import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name="info" size={15} />
            About Policy Adda
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            Your neighbourhood insurance &amp; loan consultancy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            Founded in 2018 at Plaza Chowk, Ranchi by Gaurav Jayswal, Policy Adda was
            built on a simple belief: insurance should be personal, transparent, and
            accountable. We are not a faceless marketplace — we are real people with real
            branch desks who stay until your claim is settled.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "users",
              title: "Named Advisors",
              desc: "Every customer gets a dedicated advisor who knows their file and speaks their language.",
            },
            {
              icon: "pin",
              title: "Real Branch Desks",
              desc: "9+ branches across Jharkhand, Bihar, and Noida. Walk in, sit down, and talk to someone.",
            },
            {
              icon: "shield",
              title: "Claims Follow-Through",
              desc: "We do not disappear after checkout. Our team follows your claim to settlement.",
            },
          ].map((item) => (
            <div key={item.title} className="card-material rounded-xl p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt/10 text-cobalt">
                <Icon name={item.icon} size={24} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-ivory">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 card-material rounded-xl p-8">
          <h2 className="text-2xl font-medium text-ivory">Our Values</h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Teamwork · Respect for all people · Unquestionable integrity · Excellence
            in everything we do · Speed in servicing · Truthfulness
          </p>
        </div>

        <div className="mt-16 card-material rounded-xl p-8">
          <h2 className="text-2xl font-medium text-ivory">Our Mission</h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            To make insurance simple, accessible, and trustworthy for every family in
            Jharkhand, Bihar, and beyond. We believe every customer deserves a named
            advisor, clear information, and someone who stays until the job is done.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
