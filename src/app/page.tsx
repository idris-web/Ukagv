'use client'

import {
  Navigation,
  HeroSection,
  PartnersSection,
  ServicesSection,
  StatsSection,
  AboutSection,
  ProcessSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer
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
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
