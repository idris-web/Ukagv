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

export default function Home() {
  return (
    <main className="relative">
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
