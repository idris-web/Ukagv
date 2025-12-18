'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'

// Häufige Fragen - Regional zugeschnitten
const faqs = [
  {
    q: 'Was kostet ein Glasfaseranschluss in Nürnberg?',
    a: 'Ein Standard-Hausanschluss in der Metropolregion kostet zwischen 500-900€. In geförderten Ausbaugebieten (wie Teilen von Langwasser oder Schwabach) oft sogar kostenlos. Wir erstellen Ihnen gerne ein unverbindliches Angebot mit Festpreis.',
  },
  {
    q: 'Wie lange dauert die Installation?',
    a: 'Bei Einfamilienhäusern: 1-2 Tage Tiefbau + 2-4 Stunden für die Hausinstallation. In der Regel sind Sie innerhalb einer Woche online. Bei größeren Projekten stimmen wir den Zeitplan individuell ab.',
  },
  {
    q: 'Muss der Garten aufgegraben werden?',
    a: 'Nicht unbedingt. Wir nutzen moderne Verfahren wie Micro-Trenching (nur 2cm breiter Schlitz) oder grabenlose Verlegung. Ihr Garten bleibt weitgehend unversehrt – wir hinterlassen die Baustelle sauber.',
  },
  {
    q: 'In welchen Gebieten sind Sie tätig?',
    a: 'Unser Hauptgebiet ist die Metropolregion Nürnberg: Nürnberg, Fürth, Erlangen, Schwabach, Roth, Lauf, Hersbruck und das gesamte Umland. Auf Anfrage sind wir auch in ganz Mittelfranken und Bayern für Sie da.',
  },
  {
    q: 'Was ist der Unterschied zwischen FTTH und FTTB?',
    a: 'FTTH (Fiber to the Home) bedeutet Glasfaser direkt bis in Ihre Wohnung – maximale Geschwindigkeit ohne Verluste. FTTB (Fiber to the Building) führt Glasfaser bis zum Gebäude, die letzten Meter laufen über Kupfer. Ideal für Mehrfamilienhäuser.',
  },
  {
    q: 'Brauche ich einen neuen Router?',
    a: 'In den meisten Fällen ja. Für Glasfaser benötigen Sie ein Glasfaser-Modem (ONT) und einen Router mit Gigabit-Ethernet. Wir beraten Sie gerne und können die passende Hardware gleich mitliefern.',
  },
  {
    q: 'Ist mein Haus für Glasfaser geeignet?',
    a: 'Fast jedes Gebäude kann mit Glasfaser erschlossen werden. Wir prüfen die Gegebenheiten vor Ort kostenlos und finden die optimale Lösung – ob Neubau, Altbau oder denkmalgeschütztes Gebäude.',
  },
  {
    q: 'Welche Geschwindigkeiten sind möglich?',
    a: 'Mit Glasfaser sind aktuell bis zu 10 Gbit/s symmetrisch möglich – das bedeutet gleiche Geschwindigkeit für Upload und Download. Das reicht für Homeoffice, 4K-Streaming, Gaming und Smart Home gleichzeitig.',
  },
]

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">FAQ</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Häufige </span>
            <span className="gradient-text">Fragen</span>
          </h2>
        </motion.div>

        {/* === FAQ ACCORDION === */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Frage-Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                className={`fiber-card w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 ${
                  openIndex === index ? 'border-fiber-500/30' : ''
                }`}
              >
                <span className="font-semibold text-white text-lg">{faq.q}</span>
                <ChevronDown className={`w-6 h-6 text-dark-500 transition-transform shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Antwort (animiert) */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-6 text-dark-300 text-base md:text-lg leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* === CTA === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a href="#contact" className="fiber-link inline-flex items-center gap-2 text-lg font-medium">
            Weitere Fragen? Kontaktieren Sie uns
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
