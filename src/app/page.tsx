'use client'
import {
  Navigation,
  HeroSection,
  PartnersSection,
  ServicesSection,
  TechnologySection,
  AboutSection,
  ProcessSection,
  ProjectGallery,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
  FloatingCTA,
  CookieBanner,
  PricingSection,
  KarriereSection
} from '@/components'
import { ScrollProgress } from '@/components/effects'
import FiberCableSystem from '@/components/FiberCableSystem'

export default function Home() {
  return (
    <main className="relative bg-dark-950">
      {/* Global Effects */}
      <ScrollProgress position="top" />
      <FiberCableSystem />

      {/* Page Content */}
      <Navigation />
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <PricingSection />
      <TechnologySection />
      <AboutSection />
      <ProcessSection />
      <ProjectGallery />
      <TestimonialsSection />
      <FAQSection />
      <KarriereSection />
      <CTASection />
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </main>
  )
}
