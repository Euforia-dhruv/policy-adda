import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/icons";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Icon name="mail" size={15} />
            Contact Us
          </span>
          <h1 className="mt-5 text-4xl font-medium text-ivory sm:text-5xl">
            Talk to an advisor today
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            Reach us directly for honest, personalised guidance on insurance and
            loan options.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <a
            href="tel:+917677888748"
            className="card-material flex flex-col items-center rounded-xl p-8 text-center transition-colors hover:bg-white/[0.04]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-cobalt/10 text-cobalt">
              <Icon name="phone" size={24} />
            </div>
            <h3 className="mt-4 font-medium text-ivory">Call Us</h3>
            <p className="mt-1 text-sm text-ash">+91 76778 88748</p>
            <p className="text-xs text-ash">Mon–Sat, 9:30 AM – 6 PM</p>
          </a>

          <a
            href="https://wa.me/917677888748"
            target="_blank"
            rel="noopener noreferrer"
            className="card-material flex flex-col items-center rounded-xl p-8 text-center transition-colors hover:bg-white/[0.04]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Icon name="chat" size={24} />
            </div>
            <h3 className="mt-4 font-medium text-ivory">WhatsApp</h3>
            <p className="mt-1 text-sm text-ash">Chat with us</p>
            <p className="text-xs text-ash">Quick response during business hours</p>
          </a>

          <a
            href="mailto:info@policyadda.co.in"
            className="card-material flex flex-col items-center rounded-xl p-8 text-center transition-colors hover:bg-white/[0.04]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-500/10 text-amber-400">
              <Icon name="mail" size={24} />
            </div>
            <h3 className="mt-4 font-medium text-ivory">Email</h3>
            <p className="mt-1 text-sm text-ash">info@policyadda.co.in</p>
            <p className="text-xs text-ash">We respond within one working day</p>
          </a>
        </div>

        <div className="mt-12 card-material rounded-xl p-8">
          <h2 className="text-xl font-medium text-ivory">Head Office</h2>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            Z Complex, Near Bata Showroom<br />
            Tharpakhna, Plaza Chowk<br />
            Ranchi, Jharkhand 834001
          </p>
          <p className="mt-2 text-sm text-ash">
            Mon–Sat · 9:30 AM – 6 PM
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
