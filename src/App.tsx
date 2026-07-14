import { MotionConfig } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { WhyUs } from './components/WhyUs'
import { ProductGrid } from './components/ProductGrid'
import { LoansStrip } from './components/LoansStrip'
import { Process } from './components/Process'
import { ClaimsExperience } from './components/ClaimsExperience'
import { Comparison } from './components/Comparison'
import { BranchNetwork } from './components/BranchNetwork'
import { MeetYourAdvisor } from './components/MeetYourAdvisor'
import { Testimonials } from './components/Testimonials'
import { PartnerStrip } from './components/PartnerStrip'
import { Faq } from './components/Faq'
import { CTABand } from './components/CTABand'
import { Footer } from './components/Footer'
import { ToastProvider } from './components/Toast'
import { ScrollProgress, FloatingWhatsApp, StickyCTA } from './components/ui'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <a
          href="#products"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <TrustBar />
          <WhyUs />
          <ProductGrid />
          <LoansStrip />
          <Process />
          <ClaimsExperience />
          <Comparison />
          <BranchNetwork />
          <MeetYourAdvisor />
          <Testimonials />
          <PartnerStrip />
          <Faq />
          <CTABand />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <StickyCTA />
      </ToastProvider>
    </MotionConfig>
  )
}
