'use client'
import {
  Navigation,
  HeroSection,
  PartnersSection,
  ServicesSection,
  StatsSection,
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
  PricingSection
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
      <StatsSection />
      <AboutSection />
      <ProcessSection />
      <ProjectGallery />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </main>
  )
}
