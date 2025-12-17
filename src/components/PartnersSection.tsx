'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Building, Zap, Network, Server, Cpu, Radio, Satellite, Award, Shield, CheckCircle, BadgeCheck, Verified } from 'lucide-react'
import { RevealOnScroll } from './effects'

// Main highlight partner - Telekom Deutschland
const mainPartner = {
  name: 'Telekom Deutschland',
  description: 'Als offizieller und zertifizierter Partner der Telekom Deutschland setzen wir Glasfaser-Ausbauprojekte in höchster Qualität um. Vertrauen Sie auf unsere langjährige Zusammenarbeit.',
  features: [
    { title: 'Zertifizierter Partner', desc: 'Offizielle Anerkennung' },
    { title: 'Bevorzugter Dienstleister', desc: 'Prioritäre Aufträge' },
    { title: 'Direkter Projektzugang', desc: 'Schnelle Umsetzung' },
    { title: 'Qualitätsstandards', desc: 'Höchste Anforderungen' }
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

      {/* Subtle static orbs */}
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#e20074]/3 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-fiber-500/3 blur-3xl" />

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

        {/* TELEKOM HIGHLIGHT SECTION - Enhanced */}
        <RevealOnScroll direction="center" className="mb-20">
          <div className="relative group">
            {/* Magenta Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#e20074]/20 via-[#e20074]/30 to-[#e20074]/20 rounded-[2rem] blur-3xl opacity-60 group-hover:opacity-90 transition-all duration-700" />

              <div className="relative p-10 md:p-14 rounded-[2rem] bg-gradient-to-br from-dark-900/95 to-dark-950/95 border-2 border-[#e20074]/40 group-hover:border-[#e20074]/60 transition-all overflow-hidden backdrop-blur-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #e20074 0, #e20074 1px, transparent 0, transparent 50%)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>


                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                  {/* Left - Logo & Badge */}
                  <div className="text-center md:text-left">
                    {/* Official Partner Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#e20074]/15 border border-[#e20074]/40 mb-8">
                      <BadgeCheck className="w-5 h-5 text-[#e20074]" />
                      <span className="text-sm font-bold text-[#e20074] tracking-wide">OFFIZIELLER PARTNER</span>
                      <Verified className="w-5 h-5 text-[#e20074]" />
                    </div>

                    <div className="flex items-center gap-5 mb-8 justify-center md:justify-start">
                      <motion.div
                        className="w-24 h-24 rounded-2xl bg-[#e20074] flex items-center justify-center shadow-2xl shadow-[#e20074]/40"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-white font-bold text-4xl">T</span>
                      </motion.div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white">{mainPartner.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle className="w-4 h-4 text-[#e20074]" />
                          <p className="text-[#e20074] font-semibold">Verifizierter Glasfaser-Ausbaupartner</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-dark-200 leading-relaxed mb-8 text-lg">
                      {mainPartner.description}
                    </p>

                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#e20074] text-white font-semibold text-lg hover:bg-[#e20074]/90 transition-all shadow-lg shadow-[#e20074]/30"
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(226,0,116,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Telekom-Projekt anfragen
                      <Zap className="w-5 h-5" />
                    </motion.a>
                  </div>

                  {/* Right - Features */}
                  <div className="grid grid-cols-2 gap-5">
                    {mainPartner.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-5 rounded-2xl bg-dark-800/60 border border-[#e20074]/20 hover:border-[#e20074]/50 transition-all backdrop-blur-sm"
                      >
                        <CheckCircle className="w-7 h-7 text-[#e20074] mb-3" />
                        <p className="font-bold text-white mb-1">{feature.title}</p>
                        <p className="text-sm text-dark-400">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </RevealOnScroll>

        {/* Other Partners - Seamless Infinite Scroll */}
        <div className="relative mb-20">
          {/* Softer Gradient Overlays - Much longer fade */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-dark-900 via-dark-900/80 to-transparent z-10 pointer-events-none" />

          {/* Section Title */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-xl font-semibold text-dark-300 mb-10"
          >
            Weitere Partner & Auftraggeber
          </motion.h3>

          {/* CSS-based Infinite Marquee for truly seamless loop */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {/* Triple the content for seamless loop */}
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 mx-4 p-6 rounded-2xl glass border border-fiber-500/10 hover:border-fiber-500/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fiber-500/20 to-primary-500/20 flex items-center justify-center group-hover:from-fiber-500/30 group-hover:to-primary-500/30 transition-all">
                      <partner.icon className="w-7 h-7 text-fiber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{partner.name}</p>
                      <p className="text-xs text-dark-400">{partner.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add CSS for the marquee animation */}
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
          `}</style>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center text-xl font-semibold text-dark-300 mb-10">
            Zertifizierungen & Qualifikationen
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-8 rounded-2xl glass border border-fiber-500/20 hover:border-fiber-500/30 transition-colors text-center"
              >
                <Award className="w-10 h-10 text-fiber-400 mx-auto mb-4" />
                <div className="text-2xl font-bold gradient-text mb-2">{cert.name}</div>
                <div className="text-sm text-dark-400">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-10 mt-20 pt-12 border-t border-dark-800"
        >
          {[
            'Zertifizierter Fachbetrieb',
            'Meisterbetrieb',
            'Projekte in ganz Bayern',
            '24/7 Notdienst verfügbar',
          ].map((text, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <Shield className="w-5 h-5 text-fiber-400" />
              <span className="text-dark-200 font-medium">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
