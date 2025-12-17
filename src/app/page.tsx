'use client'

import {
  Navigation,
  HeroSection,
  ServicesSection,
  AboutSection,
  ProcessSection,
  TestimonialsSection,
  CTASection,
  Footer
} from '@/components'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
