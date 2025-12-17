'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Shield, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const acceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  const rejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-dark-900/95 backdrop-blur-xl border border-fiber-500/20 rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={rejectAll}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <X className="w-5 h-5 text-dark-400" />
              </button>

              {!showSettings ? (
                // Main View
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon & Text */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fiber-500 to-primary-500 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Cookie-Einstellungen</h3>
                      <p className="text-dark-300 text-sm leading-relaxed">
                        Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                        Sie können Ihre Einstellungen jederzeit anpassen.{' '}
                        <a href="#" className="text-fiber-400 hover:underline">Datenschutzerklärung</a>
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-5 py-3 rounded-xl border border-fiber-500/20 text-dark-300 hover:bg-dark-800 transition-colors text-sm font-medium"
                    >
                      Einstellungen
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-5 py-3 rounded-xl border border-fiber-500/20 text-dark-300 hover:bg-dark-800 transition-colors text-sm font-medium"
                    >
                      Nur Notwendige
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-fiber-500 to-primary-500 text-white font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      Alle akzeptieren
                    </button>
                  </div>
                </div>
              ) : (
                // Settings View
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
                    >
                      <Settings className="w-5 h-5 text-fiber-400" />
                    </button>
                    <h3 className="text-lg font-bold">Cookie-Einstellungen anpassen</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-fiber-400" />
                        <div>
                          <p className="font-medium">Notwendige Cookies</p>
                          <p className="text-sm text-dark-400">Erforderlich für die Grundfunktionen der Website</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-fiber-500/20 text-fiber-400 text-xs font-medium">
                        Immer aktiv
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Analyse-Cookies</p>
                          <p className="text-sm text-dark-400">Helfen uns, die Website zu verbessern</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-fiber-500' : 'bg-dark-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white"
                          animate={{ left: preferences.analytics ? '26px' : '4px' }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">Marketing-Cookies</p>
                          <p className="text-sm text-dark-400">Für personalisierte Werbung</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-fiber-500' : 'bg-dark-600'
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white"
                          animate={{ left: preferences.marketing ? '26px' : '4px' }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={acceptSelected}
                      className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-fiber-500 to-primary-500 text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Auswahl speichern
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
