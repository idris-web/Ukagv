'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  Send,
  Shovel,
  Home,
  Cable,
  Wrench,
  MapPin,
  Building2,
  Check,
  Plus,
  Minus,
  User,
  Mail,
  Phone,
  FileText
} from 'lucide-react'

interface ServiceItem {
  id: string
  name: string
  icon: React.ReactNode
  unit: string
  description: string
  color: string
}

const SERVICES: ServiceItem[] = [
  {
    id: 'tiefbau',
    name: 'Tiefbau',
    icon: <Shovel size={22} />,
    unit: 'Meter',
    description: 'Kabelverlegung im Erdreich',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'hausanschluss',
    name: 'Hausanschlüsse',
    icon: <Home size={22} />,
    unit: 'Stück',
    description: 'Anschluss zum Gebäude',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'spleissen',
    name: 'Spleißarbeiten',
    icon: <Cable size={22} />,
    unit: 'Verbindungen',
    description: 'Professionelles Faserspleißen',
    color: 'from-violet-400 to-purple-500'
  },
  {
    id: 'montage',
    name: 'Montage',
    icon: <Wrench size={22} />,
    unit: 'Stunden',
    description: 'Vor-Ort Installation',
    color: 'from-amber-400 to-orange-500'
  },
]

export default function PricingSection() {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({})
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      if (prev[id] !== undefined) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: 100 }
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 100) + delta)
    }))
  }

  const setQuantity = (id: string, value: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [id]: Math.max(1, value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const selectedCount = Object.keys(selectedServices).length

  return (
    <section id="kalkulator" className="relative py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fiber-400/10 text-fiber-400 text-sm font-medium mb-6">
            <Calculator size={16} />
            Projekt anfragen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ihr <span className="text-fiber-400">Projektumfang</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            Wählen Sie die benötigten Leistungen für Ihr individuelles Angebot.
          </p>
        </motion.div>

        {/* Services Grid - 2x2 symmetrisch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((service, index) => {
              const isSelected = selectedServices[service.id] !== undefined
              return (
                <motion.button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-dark-800/60 border-fiber-400/50'
                      : 'bg-dark-800/30 border-dark-700/50 hover:border-dark-600'
                  }`}
                >
                  {/* Selection indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-3 right-3 w-5 h-5 rounded-full bg-fiber-400 flex items-center justify-center"
                      >
                        <Check size={12} className="text-dark-950" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon with gradient */}
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${service.color} mb-3`}>
                    {service.icon}
                  </div>

                  <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                  <p className="text-xs text-dark-400">{service.description}</p>

                  {/* Quantity controls */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-3 border-t border-dark-700/50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-xs text-dark-500 mb-2">ca. {service.unit}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(service.id, -10) }}
                            className="w-7 h-7 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-dark-300 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <input
                            type="number"
                            value={selectedServices[service.id]}
                            onChange={(e) => setQuantity(service.id, parseInt(e.target.value) || 1)}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 text-center bg-dark-800 border border-dark-600 rounded-lg py-1.5 text-sm text-white focus:outline-none focus:border-fiber-400 transition-colors"
                          />
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQuantity(service.id, 10) }}
                            className="w-7 h-7 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-dark-300 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Contact Form - zentriert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-dark-800/30 rounded-2xl p-10 border border-emerald-500/30 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"
              >
                <Check size={32} className="text-emerald-400" />
              </motion.div>
              <h4 className="text-xl font-semibold text-white mb-2">Anfrage gesendet!</h4>
              <p className="text-dark-400">
                Vielen Dank. Wir melden uns innerhalb von 24 Stunden.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-dark-800/30 rounded-2xl p-6 md:p-8 border border-dark-700/50">
              {/* Summary of selected services */}
              <AnimatePresence>
                {selectedCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 pb-6 border-b border-dark-700/50"
                  >
                    <p className="text-sm text-dark-400 mb-3">Ausgewählte Leistungen:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedServices).map(([id, qty]) => {
                        const service = SERVICES.find(s => s.id === id)
                        return service ? (
                          <motion.span
                            key={id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`px-3 py-1.5 text-sm bg-gradient-to-r ${service.color} bg-opacity-10 text-white rounded-lg border border-white/10`}
                          >
                            {service.name}: ~{qty} {service.unit}
                          </motion.span>
                        ) : null
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form fields - 2 columns */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-dark-400 mb-1.5">Firma *</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-fiber-400 transition-colors"
                      placeholder="Musterfirma GmbH"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-dark-400 mb-1.5">Ansprechpartner *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-fiber-400 transition-colors"
                      placeholder="Max Mustermann"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-dark-400 mb-1.5">E-Mail *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-fiber-400 transition-colors"
                      placeholder="email@firma.de"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-dark-400 mb-1.5">Telefon</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-fiber-400 transition-colors"
                      placeholder="+49 911 123456"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-dark-400 mb-1.5">Projektstandort</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-fiber-400 transition-colors"
                    placeholder="PLZ oder Stadt"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-dark-400 mb-1.5">Projektbeschreibung</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-3.5 text-dark-500" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-fiber-400 transition-colors resize-none"
                    placeholder="Kurze Beschreibung Ihres Projekts..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || selectedCount === 0}
                whileHover={{ scale: selectedCount > 0 ? 1.01 : 1 }}
                whileTap={{ scale: selectedCount > 0 ? 0.99 : 1 }}
                className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-fiber-400 text-dark-950 hover:bg-fiber-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full"
                    />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {selectedCount === 0 ? 'Bitte Leistungen wählen' : 'Angebot anfordern'}
                  </>
                )}
              </motion.button>

              <p className="text-xs text-dark-500 text-center mt-4">
                Kostenlos & unverbindlich • Antwort innerhalb 24h
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
