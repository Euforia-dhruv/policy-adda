import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name="message-square" size={15} />
            Support
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            We are here to help
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            Whether you have a question about your policy, need help with a claim,
            or want to understand your options — reach out and we will respond.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card-material rounded-xl p-8">
            <h2 className="text-lg font-medium text-ivory">Contact Support</h2>
            <div className="mt-4 space-y-3">
              <a
                href="tel:+917677888748"
                className="flex items-center gap-3 rounded-lg border border-white/10 p-4 transition-colors hover:bg-elevated"
              >
                <Icon name="phone" size={20} className="text-cobalt" />
                <div>
                  <p className="font-medium text-ivory">+91 76778 88748</p>
                  <p className="text-xs text-ash">Mon–Sat, 9:30 AM – 6 PM</p>
                </div>
              </a>
              <a
                href="https://wa.me/917677888748"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/10 p-4 transition-colors hover:bg-elevated"
              >
                <Icon name="chat" size={20} className="text-emerald-400" />
                <div>
                  <p className="font-medium text-ivory">WhatsApp</p>
                  <p className="text-xs text-ash">Quick responses during business hours</p>
                </div>
              </a>
              <a
                href="mailto:info@policyadda.co.in"
                className="flex items-center gap-3 rounded-lg border border-white/10 p-4 transition-colors hover:bg-elevated"
              >
                <Icon name="mail" size={20} className="text-amber-400" />
                <div>
                  <p className="font-medium text-ivory">info@policyadda.co.in</p>
                  <p className="text-xs text-ash">Within one working day</p>
                </div>
              </a>
            </div>
          </div>

          <div className="card-material rounded-xl p-8">
            <h2 className="text-lg font-medium text-ivory">Common Support Topics</h2>
            <ul className="mt-4 space-y-3">
              {[
                "How to file a claim",
                "Policy renewal assistance",
                "Document upload help",
                "Account and profile updates",
                "Premium payment queries",
                "Policy comparison guidance",
              ].map((topic) => (
                <li key={topic} className="flex items-center gap-3 text-sm text-ash">
                  <Icon name="chevron-right" size={16} className="text-cobalt" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
