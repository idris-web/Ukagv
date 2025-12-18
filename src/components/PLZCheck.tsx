'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react'
import { useState } from 'react'

// Simulated PLZ areas where UKAGV is active (Süddeutschland)
const activePLZs = [
  // Nürnberg
  '90402', '90403', '90408', '90409', '90411', '90419', '90425', '90427', '90429', '90431', '90439', '90441', '90443', '90449', '90451', '90453', '90455', '90459', '90461', '90469', '90471', '90473', '90475', '90478', '90480', '90482', '90489', '90491',
  // Fürth
  '90762', '90763', '90765', '90766', '90768',
  // Erlangen
  '91052', '91054', '91056', '91058',
  // Schwabach
  '91126',
  // Surrounding areas
  '90513', '90518', '90522', '90530', '90537', '90542', '90547', '90552', '90556', '90559', '90562', '90571', '90574', '90579', '90584', '90587', '90592', '90596', '90599',
]

type CheckStatus = 'idle' | 'loading' | 'available' | 'unavailable'

export default function PLZCheck() {
  const [plz, setPLZ] = useState('')
  const [status, setStatus] = useState<CheckStatus>('idle')
  const [checkedPLZ, setCheckedPLZ] = useState('')

  const checkAvailability = () => {
    if (plz.length !== 5) return

    setStatus('loading')
    setCheckedPLZ(plz)

    // Simulate API call
    setTimeout(() => {
      const isAvailable = activePLZs.includes(plz) ||
        // Süddeutschland: Bayern (8x, 9x), Baden-Württemberg (7x)
        plz.startsWith('7') || plz.startsWith('8') || plz.startsWith('9')
      setStatus(isAvailable ? 'available' : 'unavailable')
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAvailability()
    }
  }

  const reset = () => {
    setStatus('idle')
    setPLZ('')
    setCheckedPLZ('')
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Input Section */}
        <AnimatePresence mode="wait">
          {status === 'idle' || status === 'loading' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="text"
                  value={plz}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                    setPLZ(value)
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="PLZ eingeben (z.B. 90403)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-800 border border-fiber-500/20 focus:border-fiber-500 focus:ring-1 focus:ring-fiber-500 outline-none transition-all text-lg"
                  disabled={status === 'loading'}
                />
              </div>
              <motion.button
                onClick={checkAvailability}
                disabled={plz.length !== 5 || status === 'loading'}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-fiber-500 to-primary-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: plz.length === 5 ? 1.02 : 1 }}
                whileTap={{ scale: plz.length === 5 ? 0.98 : 1 }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Prüfe...
                  </>
                ) : (
                  <>
                    Verfügbarkeit prüfen
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : status === 'available' ? (
            <motion.div
              key="available"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-green-400 mb-1">
                    Ja! Wir sind in Ihrer Region aktiv
                  </h4>
                  <p className="text-dark-300 mb-4">
                    Im PLZ-Gebiet <span className="text-white font-semibold">{checkedPLZ}</span> führen wir regelmäßig Glasfaser-Projekte durch.
                    Kontaktieren Sie uns für ein kostenloses Angebot!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Kostenloses Angebot anfordern
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                    <button
                      onClick={reset}
                      className="px-6 py-3 rounded-xl border border-dark-600 text-dark-300 hover:bg-dark-800 transition-colors"
                    >
                      Andere PLZ prüfen
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unavailable"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0"
                >
                  <XCircle className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-orange-400 mb-1">
                    Noch nicht in Ihrer Region
                  </h4>
                  <p className="text-dark-300 mb-4">
                    Im PLZ-Gebiet <span className="text-white font-semibold">{checkedPLZ}</span> sind wir aktuell nicht standardmäßig tätig.
                    Aber: Größere Projekte realisieren wir auch außerhalb! Kontaktieren Sie uns.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Trotzdem anfragen
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                    <button
                      onClick={reset}
                      className="px-6 py-3 rounded-xl border border-dark-600 text-dark-300 hover:bg-dark-800 transition-colors"
                    >
                      Andere PLZ prüfen
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Text */}
      {status === 'idle' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-dark-400 text-sm mt-4"
        >
          Schwerpunkt: Süddeutschland – Bayern, Baden-Württemberg und darüber hinaus
        </motion.p>
      )}
    </div>
  )
}
