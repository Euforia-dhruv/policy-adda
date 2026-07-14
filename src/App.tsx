import { MotionConfig } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { MeetYourAdvisor } from './components/MeetYourAdvisor'
import { ProductGrid } from './components/ProductGrid'
import { ClaimsExperience } from './components/ClaimsExperience'
import { Comparison } from './components/Comparison'
import { BranchNetwork } from './components/BranchNetwork'
import { Testimonials } from './components/Testimonials'
import { PartnerStrip } from './components/PartnerStrip'
import { Faq } from './components/Faq'
import { ConceptScreens } from './components/ConceptScreens'
import { CTABand } from './components/CTABand'
import { Footer } from './components/Footer'
import { ToastProvider } from './components/Toast'
import {
  ScrollProgress,
  FloatingWhatsApp,
  StickyCTA,
  CursorGlow,
} from './components/ui'

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
        <CursorGlow />
        <Nav />
        <main>
          <Hero />
          <TrustBar />
          <MeetYourAdvisor />
          <ProductGrid />
          <ClaimsExperience />
          <Comparison />
          <BranchNetwork />
          <Testimonials />
          <PartnerStrip />
          <Faq />
          <ConceptScreens />
          <CTABand />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <StickyCTA />
      </ToastProvider>
    </MotionConfig>
  )
}
