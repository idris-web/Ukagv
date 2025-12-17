'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Was kostet ein Glasfaseranschluss?',
    a: 'Je nach Situation zwischen 500 und 1.500 Euro. Wir erstellen Ihnen ein kostenloses Angebot.',
  },
  {
    q: 'Wie lange dauert die Installation?',
    a: 'Die Hausinstallation dauert 1-2 Tage. Der Tiefbau je nach Strecke 2-5 Tage.',
  },
  {
    q: 'Arbeiten Sie auch bundesweit?',
    a: 'Ja, mit Schwerpunkt Süddeutschland. Sprechen Sie uns an.',
  },
  {
    q: 'Was ist der Unterschied FTTH vs FTTB?',
    a: 'FTTH: Glasfaser bis in die Wohnung. FTTB: Glasfaser bis zum Gebäude. FTTH ist zukunftssicherer.',
  },
]

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 relative">
      <div className="relative z-10 max-w-2xl mx-auto px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Häufige Fragen
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full p-4 rounded-xl bg-dark-900/50 border border-dark-800 text-left flex items-center justify-between gap-4 hover:border-dark-700 transition-colors"
              >
                <span className="font-medium text-white text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-dark-500 transition-transform ${open === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 text-dark-400 text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
