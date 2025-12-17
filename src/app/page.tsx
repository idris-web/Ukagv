'use client'

import dynamic from 'next/dynamic'
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

// Dynamic import for Three.js scene to avoid SSR issues
const FiberScene3D = dynamic(
  () => import('@/components/effects/FiberScene3D'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="relative">
      {/* Global Effects */}
      <ScrollProgress position="top" />
      <GlowCursor color="#06b6d4" size={24} trailLength={10} />
      <FiberScene3D />

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
