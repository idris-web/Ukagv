'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />

      {/* Animated Background Fibers */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ctaFiber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#0ea5e9" />
            <stop offset="70%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="ctaGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <motion.path
          d="M-200 200 Q 400 400, 800 200 T 1600 300 T 2200 200"
          stroke="url(#ctaFiber)"
          strokeWidth="2"
          fill="none"
          filter="url(#ctaGlow)"
          opacity={0.3}
          style={{ y }}
        />
        <motion.path
          d="M-200 800 Q 400 600, 800 800 T 1600 700 T 2200 800"
          stroke="url(#ctaFiber)"
          strokeWidth="2"
          fill="none"
          filter="url(#ctaGlow)"
          opacity={0.3}
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
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
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Bereit für die
            <br />
            <span className="gradient-text">Zukunft des Internets?</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Kontaktieren Sie uns noch heute für eine kostenlose Beratung.
            Wir erstellen Ihnen ein individuelles Angebot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="animated-border">
              <form className="relative p-8 rounded-2xl bg-dark-900/80 backdrop-blur-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Vorname</label>
                    <input
                      type="text"
                      placeholder="Max"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nachname</label>
                    <input
                      type="text"
                      placeholder="Mustermann"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">E-Mail</label>
                  <input
                    type="email"
                    placeholder="max@beispiel.de"
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    placeholder="+49 123 456789"
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interesse</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="privat">Privatanschluss</option>
                    <option value="gewerbe">Gewerbeanschluss</option>
                    <option value="quartier">Quartierserschließung</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nachricht</label>
                  <textarea
                    rows={4}
                    placeholder="Erzählen Sie uns von Ihrem Projekt..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Anfrage senden
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-xs text-dark-400 text-center">
                  Mit dem Absenden stimmen Sie unseren Datenschutzbestimmungen zu.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: 'Telefon', value: '+49 (0) 123 456 789', href: 'tel:+49123456789' },
                { icon: Mail, label: 'E-Mail', value: 'info@fiberconnect.de', href: 'mailto:info@fiberconnect.de' },
                { icon: MapPin, label: 'Adresse', value: 'Musterstraße 123, 12345 Berlin', href: '#' },
                { icon: Clock, label: 'Öffnungszeiten', value: 'Mo-Fr: 8:00 - 18:00 Uhr', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">{item.label}</p>
                    <p className="font-medium group-hover:text-primary-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-2">Schnelle Verfügbarkeitscheck</h3>
              <p className="text-dark-300 mb-4">
                Prüfen Sie kostenlos, ob Glasfaser an Ihrer Adresse verfügbar ist.
              </p>
              <button className="btn-primary flex items-center gap-2 text-sm">
                Jetzt prüfen
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1 }}
              className="aspect-video rounded-2xl overflow-hidden border border-dark-700"
            >
              <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-dark-600 mx-auto mb-2" />
                  <p className="text-dark-500">Karte Platzhalter</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
