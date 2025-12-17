'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Building, Zap, Globe, Network, Server, Cpu, Radio, Satellite, Star, Award, Shield, CheckCircle } from 'lucide-react'
import { InfiniteMarquee, CardTilt3D, RevealOnScroll, TextMarquee } from './effects'

// Main highlight partner - Telekom Deutschland
const mainPartner = {
  name: 'Telekom Deutschland',
  description: 'Als offizieller Partner der Telekom Deutschland setzen wir Glasfaser-Ausbauprojekte in höchster Qualität um.',
  features: [
    'Zertifizierter Glasfaser-Partner',
    'Bevorzugter Dienstleister',
    'Direkter Projektzugang',
    'Gemeinsame Qualitätsstandards'
  ]
}

const partners = [
  { name: 'Vodafone', icon: Network, category: 'Netzbetreiber' },
  { name: 'Deutsche Glasfaser', icon: Zap, category: 'Netzbetreiber' },
  { name: 'Stadt Nürnberg', icon: Building, category: 'Kommune' },
  { name: 'EWE', icon: Server, category: 'Netzbetreiber' },
  { name: 'M-Net', icon: Cpu, category: 'Netzbetreiber' },
  { name: 'NetCologne', icon: Radio, category: 'Netzbetreiber' },
  { name: 'Tele Columbus', icon: Satellite, category: 'Netzbetreiber' },
  { name: 'Stadtwerke Fürth', icon: Building, category: 'Kommune' },
]

const certifications = [
  { name: 'ISO 9001', desc: 'Qualitätsmanagement' },
  { name: 'ISO 45001', desc: 'Arbeitssicherheit' },
  { name: 'DVGW', desc: 'Zertifiziert' },
  { name: 'TÜV', desc: 'Geprüft' },
]

export default function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Animated Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#e20074]/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-fiber-500/5 blur-3xl"
      />

      {/* Decorative Fiber Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="partnerFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="telekomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#e20074" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-100 100 Q 400 50, 800 100 T 1600 50 T 2100 100"
          stroke="url(#partnerFiber)"
          strokeWidth="1"
          fill="none"
          opacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M-100 700 Q 400 750, 800 700 T 1600 750 T 2100 700"
          stroke="url(#telekomGradient)"
          strokeWidth="1"
          fill="none"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
            Partner & Zertifizierungen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Starke Partnerschaften
            <br />
            <span className="gradient-text">für Ihren Erfolg</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Wir arbeiten mit den führenden Netzbetreibern und Kommunen in der Region Nürnberg zusammen.
          </p>
        </motion.div>

        {/* TELEKOM HIGHLIGHT SECTION */}
        <RevealOnScroll direction="center" className="mb-16">
          <div className="relative group">
            {/* Magenta Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#e20074]/30 via-[#e20074]/20 to-[#e20074]/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-500" />

            <CardTilt3D tiltAmount={5} glareEnabled={true}>
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-dark-900/90 to-dark-950/90 border-2 border-[#e20074]/30 group-hover:border-[#e20074]/50 transition-all overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #e20074 0, #e20074 1px, transparent 0, transparent 50%)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Left - Logo & Badge */}
                  <div className="text-center md:text-left">
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e20074]/10 border border-[#e20074]/30 mb-6"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4 text-[#e20074]" />
                      <span className="text-sm font-semibold text-[#e20074]">Offizieller Partner</span>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                      <motion.div
                        className="w-20 h-20 rounded-2xl bg-[#e20074] flex items-center justify-center shadow-lg shadow-[#e20074]/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-white font-bold text-2xl">T</span>
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{mainPartner.name}</h3>
                        <p className="text-[#e20074] font-medium">Glasfaser-Ausbaupartner</p>
                      </div>
                    </div>

                    <p className="text-dark-300 leading-relaxed mb-6">
                      {mainPartner.description}
                    </p>

                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#e20074] text-white font-medium hover:bg-[#e20074]/90 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Projekt anfragen
                      <Zap className="w-4 h-4" />
                    </motion.a>
                  </div>

                  {/* Right - Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {mainPartner.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-4 rounded-xl bg-dark-800/50 border border-[#e20074]/10 hover:border-[#e20074]/30 transition-all"
                      >
                        <CheckCircle className="w-6 h-6 text-[#e20074] mb-2" />
                        <p className="text-sm text-dark-200 font-medium">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardTilt3D>
          </div>
        </RevealOnScroll>

        {/* Text Marquee */}
        <div className="mb-12 -mx-4 md:-mx-8">
          <TextMarquee
            text="GLASFASER • TIEFBAU • HAUSANSCHLÜSSE • FTTH • GEWERBEANSCHLÜSSE • NETZAUSBAU"
            speed={40}
            className="py-4 border-y border-fiber-500/10"
            textClassName="text-2xl font-bold text-dark-600"
          />
        </div>

        {/* Other Partners - Infinite Marquee */}
        <div className="relative mb-16">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10" />

          {/* Section Title */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-lg font-semibold text-dark-400 mb-8"
          >
            Weitere Partner & Auftraggeber
          </motion.h3>

          {/* Infinite Marquee */}
          <InfiniteMarquee speed={35} pauseOnHover={true} gap={24}>
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-56 p-5 rounded-2xl glass border border-fiber-500/10 hover:border-fiber-500/30 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fiber-500/20 to-primary-500/20 flex items-center justify-center group-hover:from-fiber-500/30 group-hover:to-primary-500/30 transition-all">
                    <partner.icon className="w-6 h-6 text-fiber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{partner.name}</p>
                    <p className="text-xs text-dark-400">{partner.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </InfiniteMarquee>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center text-lg font-semibold text-dark-400 mb-8">
            Zertifizierungen & Qualifikationen
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <CardTilt3D key={index} tiltAmount={8} glareEnabled={true}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-fiber-500/20 to-primary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative p-6 rounded-2xl glass border border-fiber-500/20 text-center">
                    <Award className="w-8 h-8 text-fiber-400 mx-auto mb-3" />
                    <div className="text-xl font-bold gradient-text mb-1">{cert.name}</div>
                    <div className="text-sm text-dark-400">{cert.desc}</div>
                  </div>
                </motion.div>
              </CardTilt3D>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t border-dark-800"
        >
          {[
            'Zertifizierter Fachbetrieb',
            'Meisterbetrieb',
            'Projekte in ganz Bayern',
            '24/7 Notdienst verfügbar',
          ].map((text, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <Shield className="w-4 h-4 text-fiber-400" />
              <span className="text-dark-300">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
