'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, MessageCircle, Phone, HelpCircle, Send, Headphones } from 'lucide-react'

const faqs = [
  {
    category: 'Allgemein',
    questions: [
      {
        question: 'Was kostet ein Glasfaseranschluss?',
        answer: 'Die Kosten variieren je nach Situation vor Ort. Bei einem Neubau oder wenn bereits Leerrohre vorhanden sind, liegen die Kosten meist zwischen 500 und 1.500 Euro. Bei aufwendigeren Tiefbauarbeiten kann es mehr sein. Wir erstellen Ihnen gerne ein kostenloses, unverbindliches Angebot nach einer Vor-Ort-Besichtigung.'
      },
      {
        question: 'Wie lange dauert die Installation?',
        answer: 'Die reine Hausinstallation dauert in der Regel 1-2 Tage. Der Tiefbau – falls notwendig – kann je nach Länge der Strecke und Bodenbeschaffenheit 2-5 Tage in Anspruch nehmen. Nach Auftragsvergabe können wir Ihnen einen genauen Zeitplan nennen.'
      },
      {
        question: 'Arbeitet UKAGV auch bundesweit?',
        answer: 'Ja, wir sind in ganz Deutschland tätig. Unser Schwerpunkt liegt in Süddeutschland (Bayern, Baden-Württemberg), aber wir haben auch Projekte in anderen Regionen erfolgreich umgesetzt. Sprechen Sie uns einfach an.'
      },
      {
        question: 'Warum sollte ich UKAGV beauftragen?',
        answer: 'Als zertifizierter Telekom Partner und FTTH-Fachbetrieb bringen wir über 15 Jahre Erfahrung mit. Wir bieten alles aus einer Hand: Von der Beratung über Tiefbau und Kabelverlegung bis zur Inbetriebnahme. Unser Team arbeitet zuverlässig, termingerecht und zu fairen Preisen.'
      },
      {
        question: 'Bieten Sie auch Wartung und Support nach der Installation?',
        answer: 'Ja, wir stehen auch nach der Installation für Sie bereit. Bei technischen Fragen oder Problemen können Sie uns jederzeit kontaktieren. Zudem bieten wir Wartungsverträge für Gewerbekunden und größere Liegenschaften an.'
      },
    ]
  },
  {
    category: 'Technik',
    questions: [
      {
        question: 'Was ist der Unterschied zwischen FTTH und FTTB?',
        answer: 'FTTH (Fiber to the Home) bedeutet, dass das Glasfaserkabel direkt bis in Ihre Wohnung oder Ihr Haus verlegt wird. Bei FTTB (Fiber to the Building) endet die Glasfaser im Keller des Gebäudes, die letzten Meter werden über Kupferkabel überbrückt. FTTH bietet die beste Leistung und ist zukunftssicherer.'
      },
      {
        question: 'Welche Geschwindigkeiten sind mit Glasfaser möglich?',
        answer: 'Mit einem Glasfaseranschluss sind Geschwindigkeiten von bis zu 10 Gbit/s möglich – symmetrisch, also sowohl im Download als auch im Upload. Die tatsächlich verfügbare Geschwindigkeit hängt von Ihrem Tarif beim Provider ab. Selbst Basis-Tarife bieten meist 100-250 Mbit/s.'
      },
      {
        question: 'Was passiert bei einem Stromausfall?',
        answer: 'Bei einem Stromausfall funktioniert auch der Glasfaseranschluss nicht, da die aktiven Komponenten (ONT/Router) Strom benötigen. Mit einer USV (unterbrechungsfreie Stromversorgung) können Sie die Verfügbarkeit auch bei Stromausfall sicherstellen – besonders wichtig für Gewerbe und Homeoffice.'
      },
      {
        question: 'Ist Glasfaser besser als Kabel-Internet?',
        answer: 'Ja, Glasfaser bietet entscheidende Vorteile: Symmetrische Geschwindigkeiten (gleich schnell up- und download), geringere Latenz, keine Geschwindigkeitseinbrüche zu Stoßzeiten und deutlich höhere maximale Bandbreiten. Zudem ist Glasfaser unempfindlich gegen elektromagnetische Störungen.'
      },
      {
        question: 'Was bedeutet symmetrische Geschwindigkeit?',
        answer: 'Symmetrische Geschwindigkeit bedeutet, dass Upload und Download gleich schnell sind. Bei DSL ist der Upload meist deutlich langsamer (z.B. 250/40 Mbit/s). Bei Glasfaser haben Sie z.B. 1.000/1.000 Mbit/s – ideal für Videokonferenzen, Cloud-Backup und Smart Home.'
      },
      {
        question: 'Wie störanfällig ist Glasfaser?',
        answer: 'Glasfaserkabel sind sehr robust und störungsunanfällig. Sie sind immun gegen elektromagnetische Störungen, Blitzeinschläge und Übersprechen. Die typische Lebensdauer einer Glasfaserinfrastruktur liegt bei über 30 Jahren.'
      },
    ]
  },
  {
    category: 'Ablauf',
    questions: [
      {
        question: 'Muss ich während der Installation zu Hause sein?',
        answer: 'Ja, bei der Hausinstallation sollte jemand vor Ort sein, um Zugang zu ermöglichen und die Kabelführung im Haus zu besprechen. Für den Tiefbau ist Ihre Anwesenheit in der Regel nicht erforderlich. Wir stimmen alle Termine vorab mit Ihnen ab.'
      },
      {
        question: 'Wie wird der Garten nach den Arbeiten wiederhergestellt?',
        answer: 'Wir legen großen Wert auf eine saubere Wiederherstellung. Nach dem Tiefbau wird der Boden verdichtet, Rasen neu angesät oder Pflaster wieder verlegt. Bei aufwendigeren Oberflächen (Naturstein, Spezialbeläge) stimmen wir das Vorgehen und die Kosten vorher mit Ihnen ab.'
      },
      {
        question: 'Brauche ich einen bestimmten Provider?',
        answer: 'Nein, wir sind unabhängig von Providern. Wir verlegen die Infrastruktur – den Anbieter für Ihren Internettarif wählen Sie selbst. In vielen Fällen arbeiten wir im Auftrag von Netzbetreibern wie der Telekom, die dann auch gleich Tarife anbieten.'
      },
      {
        question: 'Was ist ein Hausübergabepunkt (HÜP)?',
        answer: 'Der Hausübergabepunkt (HÜP) ist die Stelle, an der das Glasfaserkabel in Ihr Gebäude eintritt. Meist befindet er sich im Keller oder Hauswirtschaftsraum. Von dort wird das Signal zum Router bzw. zur Glasfaser-Dose weitergeleitet.'
      },
      {
        question: 'Können Sie auch in Bestandsgebäuden verlegen?',
        answer: 'Ja, wir haben viel Erfahrung mit der Nachrüstung von Bestandsgebäuden. Je nach Bauweise nutzen wir Leerrohre, verlegen in Kabelkanälen oder arbeiten mit minimalinvasiven Verfahren. Bei der Vor-Ort-Besichtigung zeigen wir Ihnen die beste Lösung.'
      },
    ]
  },
  {
    category: 'Kosten & Förderung',
    questions: [
      {
        question: 'Gibt es Förderprogramme für Glasfaser?',
        answer: 'Ja, es gibt verschiedene Förderprogramme auf Bundes- und Landesebene. In vielen Regionen werden Glasfaseranschlüsse mit bis zu 500€ gefördert. Wir informieren Sie gerne über aktuelle Fördermöglichkeiten in Ihrer Region.'
      },
      {
        question: 'Wie kann ich die Kosten reduzieren?',
        answer: 'Kosten lassen sich reduzieren durch: Nutzung vorhandener Leerrohre, gemeinsame Beauftragung mit Nachbarn (Mengenrabatt), Eigenleistung beim Graben auf dem eigenen Grundstück und die Nutzung von Förderprogrammen.'
      },
      {
        question: 'Werden die Kosten auch in Raten angeboten?',
        answer: 'Bei größeren Projekten können wir individuelle Zahlungsvereinbarungen treffen. Sprechen Sie uns einfach an. Einige Netzbetreiber bieten auch die Möglichkeit, die Anschlusskosten über die monatliche Tarifgebühr abzuzahlen.'
      },
      {
        question: 'Was kostet der Hausmeisterservice?',
        answer: 'Die Kosten für unseren Hausmeisterservice richten sich nach Umfang und Art der Leistungen. Wir erstellen Ihnen gerne ein individuelles Angebot – ob für regelmäßige Betreuung oder einzelne Aufträge.'
      },
    ]
  },
]

function FAQItem({ question, answer, isOpen, onClick, index }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="overflow-hidden"
    >
      <button
        onClick={onClick}
        className={`w-full p-6 rounded-2xl text-left flex items-start gap-4 transition-all duration-300 ${
          isOpen
            ? 'bg-gradient-to-br from-fiber-500/10 to-primary-500/10 border border-fiber-500/30'
            : 'glass border border-fiber-500/10 hover:border-fiber-500/20'
        }`}
      >
        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-fiber-500 text-white' : 'bg-dark-700 text-dark-400'
        }`}>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold transition-colors ${isOpen ? 'text-fiber-400' : 'text-white'}`}>
            {question}
          </h3>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-dark-300 leading-relaxed">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})
  const [activeCategory, setActiveCategory] = useState('Allgemein')

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Subtle decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fiber-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fiber-500/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-fiber-400 text-sm font-semibold tracking-wider uppercase">
            Häufige Fragen
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Antworten auf Ihre
            <br />
            <span className="gradient-text">wichtigsten Fragen</span>
          </h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-lg">
            Hier finden Sie Antworten auf die häufigsten Fragen rund um Glasfaser und unsere Dienstleistungen.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {faqs.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.category
                  ? 'bg-gradient-to-r from-fiber-500 to-primary-500 text-white shadow-lg shadow-fiber-500/30'
                  : 'glass border border-fiber-500/10 hover:border-fiber-500/30 text-dark-300 hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          {faqs
            .find(cat => cat.category === activeCategory)
            ?.questions.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openItems[`${activeCategory}-${index}`] || false}
                onClick={() => toggleItem(activeCategory, index)}
                index={index}
              />
            ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="relative p-10 md:p-14 rounded-3xl glass border border-fiber-500/20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-fiber-500/5 via-transparent to-primary-500/5" />

            <div className="relative text-center">
              {/* Modern icon with glow */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-fiber-500 to-primary-500 mb-6 shadow-lg shadow-fiber-500/30">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-3xl font-bold mb-4">Noch Fragen?</h3>
              <p className="text-dark-300 mb-8 max-w-lg mx-auto text-lg">
                Ihre Frage wurde nicht beantwortet? Kein Problem! Unser Team hilft Ihnen gerne persönlich weiter.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="#contact"
                  className="btn-primary flex items-center gap-3 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Nachricht senden
                </motion.a>
                <motion.a
                  href="tel:+4991112345678"
                  className="btn-secondary flex items-center gap-3 text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Headphones className="w-5 h-5" />
                  Anrufen
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
