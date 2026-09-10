import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { MeetYourAdvisor } from "@/components/landing/MeetYourAdvisor";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { ClaimsExperience } from "@/components/landing/ClaimsExperience";
import { Comparison } from "@/components/landing/Comparison";
import { BranchNetwork } from "@/components/landing/BranchNetwork";
import { Testimonials } from "@/components/landing/Testimonials";
import { PartnerStrip } from "@/components/landing/PartnerStrip";
import { Faq } from "@/components/landing/Faq";
import { ConceptScreens } from "@/components/landing/ConceptScreens";
import { CTABand } from "@/components/landing/CTABand";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { StickyCTA } from "@/components/landing/StickyCTA";

export default function Home() {
  return (
    <>
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-elevated focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <ScrollProgress />
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
    </>
  );
}
