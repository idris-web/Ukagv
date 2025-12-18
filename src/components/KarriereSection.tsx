'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Briefcase, HardHat, Cable, Users, ChevronDown, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'

const jobs = [
  {
    id: 'tiefbau',
    title: 'Tiefbau-Helfer (m/w/d)',
    type: 'Vollzeit',
    icon: HardHat,
    color: 'from-emerald-400 to-teal-500',
    description: 'Zur Verstärkung unseres Teams suchen wir motivierte und engagierte Tiefbauhelfer. Sie unterstützen unsere Fachkräfte bei allen anfallenden Tätigkeiten im Bereich des Tiefbaus.',
    tasks: [
      'Unterstützung bei der Vorbereitung und Einrichtung von Baustellen',
      'Mitwirkung beim Einrichten von Rohrleitungen und Kanalisationssystemen',
      'Be- und Entladen von Baumaschinen und -fahrzeugen',
      'Bedienung von kleinen Baumaschinen und Werkzeugen',
      'Unterstützung bei der Durchführung von Erdarbeiten',
    ],
    requirements: [
      'Erfahrung im Tiefbau von Vorteil',
      'Handwerkliches Geschick und technisches Verständnis',
      'Körperlich belastbar und fit',
      'Teamfähigkeit und Zuverlässigkeit',
      'Führerschein Klasse B von Vorteil',
    ],
    benefits: [
      'Sicherer Arbeitsplatz in einem dynamischen Team',
      'Abwechslungsreiche Tätigkeiten',
      'Möglichkeit zur Weiterentwicklung',
      'Leistungsgerechte Vergütung',
      'Arbeitskleidung wird gestellt',
    ],
  },
  {
    id: 'monteur',
    title: 'Glasfaser-Monteure (m/w/d)',
    type: 'Vollzeit · Bundesweit',
    icon: Cable,
    color: 'from-cyan-400 to-blue-500',
    description: 'Zur Verstärkung unseres Teams suchen wir engagierte Glasfaser-Monteure für den bundesweiten Einsatz. Sie verlegen, montieren und schließen Glasfaserkabel im Innen- und Außenbereich an.',
    tasks: [
      'Verlegen, Montieren und Anschließen von Glasfaserkabeln',
      'Spleißen und Messen von Glasfaserkabeln',
      'Fehlersuche und Behebung von Störungen',
      'Durchführung von Wartungs- und Instandhaltungsarbeiten',
      'Dokumentation von Arbeitsabläufen',
    ],
    requirements: [
      'Ausbildung im Bereich Elektro-/Nachrichtentechnik (wünschenswert)',
      'Erfahrung mit Glasfasertechnik von Vorteil',
      'Hohes Maß an Verantwortungsbewusstsein',
      'Flexibilität und Reisebereitschaft',
      'Führerschein Klasse B',
    ],
    benefits: [
      'Unbefristetes Arbeitsverhältnis in Vollzeit',
      'Leistungsgerechte Vergütung und Sozialleistungen',
      'Gezielte Einarbeitung und Weiterbildung',
      'Moderne Arbeitsmittel und Werkzeuge',
      'Flache Hierarchien',
    ],
  },
  {
    id: 'buero',
    title: 'Bürokraft (m/w/d)',
    type: 'Teil- oder Vollzeit',
    icon: Users,
    color: 'from-violet-400 to-purple-500',
    description: 'Wir suchen eine engagierte und zuverlässige Bürofachkraft für unser Unternehmen. Sie übernehmen die allgemeine Büroorganisation und unterstützen bei administrativen Aufgaben.',
    tasks: [
      'Allgemeine Büroorganisation und -verwaltung',
      'Telefon- und E-Mail-Korrespondenz',
      'Erstellung von Angeboten und Rechnungen',
      'Kundenbetreuung und -beratung',
      'Datenbankpflege und -verwaltung',
    ],
    requirements: [
      'Ausbildung zur Bürokauffrau oder vergleichbar (wünschenswert)',
      'Fundierte MS-Office-Kenntnisse',
      'Gute Deutschkenntnisse in Wort und Schrift',
      'Eigenständige und strukturierte Arbeitsweise',
      'Teamfähigkeit und Kundenorientierung',
    ],
    benefits: [
      'Verantwortungsvolle und abwechslungsreiche Tätigkeit',
      'Angenehmes Arbeitsumfeld',
      'Leistungsgerechte Vergütung',
      'Fortbildungsmöglichkeiten',
      'Motiviertes Team',
    ],
  },
]

export default function KarriereSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openJob, setOpenJob] = useState<string | null>(null)

  return (
    <section id="karriere" className="py-24 relative">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">

        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="fiber-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <Briefcase className="w-5 h-5 text-fiber-400" />
            <span className="text-base font-medium text-fiber-400">Wir stellen ein!</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Karriere bei </span>
            <span className="gradient-text">Uka-GV</span>
          </h2>

          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der Glasfasertechnik aktiv mit.
          </p>
        </motion.div>

        {/* === JOB LISTINGS === */}
        <div className="space-y-4">
          {jobs.map((job, index) => {
            const Icon = job.icon
            const isOpen = openJob === job.id

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Job Header - Clickable */}
                <button
                  onClick={() => setOpenJob(isOpen ? null : job.id)}
                  aria-expanded={isOpen}
                  aria-controls={`job-details-${job.id}`}
                  id={`job-header-${job.id}`}
                  className={`w-full fiber-card p-5 sm:p-6 text-left flex items-center gap-4 sm:gap-5 transition-all ${
                    isOpen ? 'border-fiber-500/30' : ''
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg sm:text-xl mb-1">{job.title}</h3>
                    <p className="text-dark-400 text-xs sm:text-sm">{job.type}</p>
                  </div>

                  <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-dark-500 transition-transform shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Job Details - Expandable */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      id={`job-details-${job.id}`}
                      role="region"
                      aria-labelledby={`job-header-${job.id}`}
                    >
                      <div className="p-5 sm:p-6 md:p-8 bg-dark-800/30 border border-t-0 border-dark-700/50 rounded-b-2xl -mt-2">
                        <p className="text-dark-300 text-lg mb-6">{job.description}</p>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                          {/* Aufgaben */}
                          <div>
                            <h4 className="font-semibold text-white mb-3">Ihre Aufgaben</h4>
                            <ul className="space-y-2">
                              {job.tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                                  <CheckCircle2 className="w-4 h-4 text-fiber-400 mt-0.5 shrink-0" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Anforderungen */}
                          <div>
                            <h4 className="font-semibold text-white mb-3">Ihr Profil</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h4 className="font-semibold text-white mb-3">Wir bieten</h4>
                            <ul className="space-y-2">
                              {job.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-dark-700/50">
                          <a
                            href="mailto:bewerbung@uka-gv.de"
                            className="btn-primary flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Jetzt bewerben
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <span className="text-sm text-dark-500">
                            Bewerbung an: bewerbung@uka-gv.de
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* === KONTAKT INFO === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-dark-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <span>bewerbung@uka-gv.de</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-center sm:text-left">Georg-Strobel-Straße 65, 90489 Nürnberg</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
