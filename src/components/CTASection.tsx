'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

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
            <stop offset="30%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#0ca5ea" />
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
          <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Projekt besprechen?
            <br />
            <span className="gradient-text">Wir sind für Sie da.</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Rufen Sie uns an oder schreiben Sie uns eine Nachricht.
            Wir melden uns schnellstmöglich bei Ihnen.
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
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      placeholder="Ihr Name"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon *</label>
                    <input
                      type="tel"
                      placeholder="+49 123 456789"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">E-Mail</label>
                  <input
                    type="email"
                    placeholder="ihre@email.de"
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Worum geht es?</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="glasfaser-privat">Glasfaser Privatanschluss</option>
                    <option value="glasfaser-gewerbe">Glasfaser Gewerbe</option>
                    <option value="tiefbau">Tiefbauarbeiten</option>
                    <option value="hausmeister">Hausmeisterdienste</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ihre Nachricht</label>
                  <textarea
                    rows={4}
                    placeholder="Beschreiben Sie kurz Ihr Vorhaben..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Nachricht senden
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-xs text-dark-400 text-center">
                  * Pflichtfelder. Mit dem Absenden stimmen Sie unseren Datenschutzbestimmungen zu.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: 'Telefon', value: '+49 (0) 123 456 78', href: 'tel:+4912345678' },
                { icon: Mail, label: 'E-Mail', value: 'info@ukagv.de', href: 'mailto:info@ukagv.de' },
                { icon: MapPin, label: 'Adresse', value: 'Musterstraße 123, 12345 Stadt', href: '#' },
                { icon: Clock, label: 'Erreichbarkeit', value: 'Mo-Fr: 7:00 - 17:00 Uhr', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass border border-fiber-500/10 hover:bg-fiber-500/5 hover:border-fiber-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">{item.label}</p>
                    <p className="font-medium group-hover:text-fiber-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-fiber-500/10 to-primary-500/10 border border-fiber-500/20"
            >
              <h3 className="text-xl font-bold mb-3">Schneller Rückruf</h3>
              <p className="text-dark-300 mb-4">
                Sie möchten lieber telefonieren? Hinterlassen Sie Ihre Nummer
                und wir rufen Sie zurück – meist noch am selben Tag.
              </p>
              <div className="flex gap-3">
                <input
                  type="tel"
                  placeholder="Ihre Telefonnummer"
                  className="flex-1 px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors text-sm"
                />
                <button className="btn-primary text-sm whitespace-nowrap">
                  Rückruf
                </button>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1 }}
              className="aspect-video rounded-2xl overflow-hidden border border-fiber-500/20"
            >
              <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-dark-600 mx-auto mb-2" />
                  <p className="text-dark-500 text-sm">Karten-Platzhalter</p>
                  <p className="text-dark-600 text-xs">Google Maps einbinden</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
