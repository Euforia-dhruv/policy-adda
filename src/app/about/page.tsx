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
            Policy Adda was built on a simple belief: insurance should be personal,
            transparent, and accountable. We are not a faceless marketplace — we are
            real people who stay until you understand your coverage.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "users",
              title: "Named Advisors",
              desc: "Every customer gets a dedicated advisor who knows their needs and speaks their language.",
            },
            {
              icon: "shield",
              title: "Multiple Insurer Options",
              desc: "We work with 12+ insurer partners so you can compare and choose the right coverage.",
            },
            {
              icon: "headphones",
              title: "Claims Assistance",
              desc: "We help guide you through the claims process with your insurer.",
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
          <h2 className="text-2xl font-medium text-ivory">Our Mission</h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            To make insurance accessible and understandable for families. We believe
            every customer deserves a named advisor, clear information, and guidance
            through the entire process — from selection to claims.
          </p>
        </div>

        <div className="mt-16 card-material rounded-xl p-8">
          <h2 className="text-2xl font-medium text-ivory">Important Disclosure</h2>
          <p className="mt-4 text-sm leading-relaxed text-ash">
            Policy Adda is an insurance and loan consultancy. We facilitate the
            comparison and purchase of insurance policies from licensed insurance
            companies. All policies are underwritten by the respective insurers and
            are subject to their terms and conditions. Policy Adda earns a commission
            from insurer partners — you pay the same premium as buying direct.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            Insurance is the subject matter of solicitation. For more details on
            coverage, terms, conditions, exclusions, and claims, please refer to the
            policy wording of the respective insurer.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
