import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { WhyUs } from './components/WhyUs'
import { ProductGrid } from './components/ProductGrid'
import { LoansStrip } from './components/LoansStrip'
import { Process } from './components/Process'
import { BranchNetwork } from './components/BranchNetwork'
import { Testimonials } from './components/Testimonials'
import { PartnerStrip } from './components/PartnerStrip'
import { CTABand } from './components/CTABand'
import { Footer } from './components/Footer'
import { ToastProvider } from './components/Toast'

export default function App() {
  return (
    <ToastProvider>
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <ProductGrid />
        <LoansStrip />
        <Process />
        <BranchNetwork />
        <Testimonials />
        <PartnerStrip />
        <CTABand />
      </main>
      <Footer />
    </ToastProvider>
  )
}
