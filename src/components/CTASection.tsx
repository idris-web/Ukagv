'use client'

import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import PLZCheck from './PLZCheck'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate success (in real app, this would be an API call)
    if (formData.name && formData.phone) {
      setFormStatus('success')
    } else {
      setFormStatus('error')
    }
  }

  const resetForm = () => {
    setFormStatus('idle')
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background - Clean */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        {/* PLZ Check Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
              Verfügbarkeit
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-2">
              Sind wir in Ihrer Region aktiv?
            </h3>
          </div>
          <div className="max-w-2xl mx-auto">
            <PLZCheck />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="animated-border">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative p-8 md:p-12 rounded-2xl bg-dark-900/80 backdrop-blur-sm text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-green-400">Nachricht gesendet!</h3>
                    <p className="text-dark-300 mb-6">
                      Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                    </p>
                    <button
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Weitere Nachricht senden
                    </button>
                  </motion.div>
                ) : formStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative p-8 md:p-12 rounded-2xl bg-dark-900/80 backdrop-blur-sm text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6"
                    >
                      <AlertCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-red-400">Fehler beim Senden</h3>
                    <p className="text-dark-300 mb-6">
                      Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => setFormStatus('idle')}
                        className="btn-primary"
                      >
                        Erneut versuchen
                      </button>
                      <a href="tel:+4991112345678" className="btn-secondary">
                        Anrufen
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative p-8 rounded-2xl bg-dark-900/80 backdrop-blur-sm space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                          placeholder="Ihr Name"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Telefon *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                          placeholder="+49 911 123456"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">E-Mail</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                        placeholder="ihre@email.de"
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Worum geht es?</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData(f => ({ ...f, subject: e.target.value }))}
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
                        value={formData.message}
                        onChange={(e) => setFormData(f => ({ ...f, message: e.target.value }))}
                        placeholder="Beschreiben Sie kurz Ihr Vorhaben..."
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-700 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                      whileHover={{ scale: formStatus === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: formStatus === 'loading' ? 1 : 0.98 }}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          Nachricht senden
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-dark-400 text-center">
                      * Pflichtfelder. Mit dem Absenden stimmen Sie unseren{' '}
                      <a href="#" className="text-fiber-400 hover:underline">Datenschutzbestimmungen</a> zu.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
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
                { icon: Phone, label: 'Telefon', value: '+49 (0) 911 123 456 78', href: 'tel:+4991112345678' },
                { icon: Mail, label: 'E-Mail', value: 'info@ukagv.de', href: 'mailto:info@ukagv.de' },
                { icon: MapPin, label: 'Adresse', value: 'Glasfaserweg 42, 90403 Nürnberg', href: '#' },
                { icon: Clock, label: 'Erreichbarkeit', value: 'Mo-Fr: 7:00 - 17:00 Uhr', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
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
                <motion.button
                  className="btn-primary text-sm whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rückruf
                </motion.button>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1 }}
              className="aspect-video rounded-2xl overflow-hidden border border-fiber-500/20"
            >
              <div className="w-full h-full bg-dark-800 flex items-center justify-center relative">
                {/* Simulated map background */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #06b6d4 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>
                <div className="text-center relative z-10">
                  <MapPin className="w-12 h-12 text-fiber-400 mx-auto mb-2" />
                  <p className="text-white font-medium">UKAGV GmbH</p>
                  <p className="text-dark-400 text-sm">Glasfaserweg 42</p>
                  <p className="text-dark-400 text-sm">90403 Nürnberg</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
