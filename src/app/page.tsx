'use client'
import {
  Navigation,
  HeroSection,
  PartnersSection,
  ServicesSection,
  StatsSection,
  AboutSection,
  ProcessSection,
  ProjectGallery,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
  FloatingCTA,
  CookieBanner
} from '@/components'
import { ScrollProgress, GlowCursor } from '@/components/effects'
import FiberCableSystem from '@/components/FiberCableSystem'

export default function Home() {
  return (
    <main className="relative bg-dark-950">
      {/* Global Effects */}
      <ScrollProgress position="top" />
      <GlowCursor color="#06b6d4" size={24} trailLength={10} />
      <FiberCableSystem />

      {/* Page Content */}
      <Navigation />
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
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
