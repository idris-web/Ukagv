'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Shovel,
  Home,
  Cable,
  Wrench,
  MapPin,
  Building2,
  Check,
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  X,
  Shield,
  FileSpreadsheet,
  File,
  AlertCircle,
  Briefcase
} from 'lucide-react'

interface ServiceItem {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

// Glasfaser komplett - NE3 Services
const SERVICES: ServiceItem[] = [
  {
    id: 'tiefbau',
    name: 'Tiefbau & Verlegung',
    icon: <Shovel size={22} />,
    description: 'NE3/NE4 Infrastruktur, Micro-Trenching',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'hausanschluss',
    name: 'Hausanschlüsse',
    icon: <Home size={22} />,
    description: 'FTTH & FTTB Komplettlösungen',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'montage',
    name: 'LWL-Montage',
    icon: <Wrench size={22} />,
    description: 'Muffen, Verteiler, ODF',
    color: 'from-violet-400 to-purple-500'
  },
  {
    id: 'spleissen',
    name: 'Spleißen & Messtechnik',
    icon: <Cable size={22} />,
    description: 'OTDR-Messungen, Dokumentation',
    color: 'from-amber-400 to-orange-500'
  },
]

// Accepted file types
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/msword': ['.doc'],
  // GAEB formats
  'application/octet-stream': ['.x83', '.x84', '.d83', '.d84'],
}

const ACCEPTED_EXTENSIONS = ['.pdf', '.xlsx', '.xls', '.docx', '.doc', '.x83', '.x84', '.d83', '.d84']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface UploadedFile {
  file: File
  id: string
  status: 'uploading' | 'success' | 'error'
  error?: string
}

export default function PricingSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      return `Dateityp nicht erlaubt: ${extension}`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `Datei zu groß (max. 10MB)`
    }
    return null
  }

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files)

    fileArray.forEach(file => {
      const error = validateFile(file)
      const newFile: UploadedFile = {
        file,
        id: `${file.name}-${Date.now()}`,
        status: error ? 'error' : 'success',
        error: error || undefined
      }

      setUploadedFiles(prev => [...prev, newFile])
    })
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    if (ext === 'pdf') return <FileText size={16} className="text-red-400" />
    if (['xlsx', 'xls'].includes(ext || '')) return <FileSpreadsheet size={16} className="text-green-400" />
    if (['docx', 'doc'].includes(ext || '')) return <FileText size={16} className="text-blue-400" />
    return <File size={16} className="text-amber-400" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const validFiles = uploadedFiles.filter(f => f.status === 'success')

  return (
    <section id="anfrage" className="relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fiber-400/10 text-fiber-400 text-sm font-medium mb-6">
            <Briefcase size={16} />
            Für Auftraggeber
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projekt <span className="text-fiber-400">anfragen</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Glasfaser komplett – von der Planung bis zur Abnahme. Laden Sie Ihr Leistungsverzeichnis hoch für ein individuelles Angebot.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <p className="text-sm text-dark-400 mb-4">Gewünschte Leistungen auswählen:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((service, index) => {
              const isSelected = selectedServices.includes(service.id)
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

                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${service.color} mb-3`}>
                    {service.icon}
                  </div>

                  <h4 className="font-semibold text-white mb-1 text-sm">{service.name}</h4>
                  <p className="text-xs text-dark-400">{service.description}</p>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Form - volle Breite wie Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                Vielen Dank. Wir prüfen Ihre Unterlagen und melden uns innerhalb von 24 Stunden.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-dark-800/30 rounded-2xl p-6 md:p-8 border border-dark-700/50">
              {/* Selected services summary */}
              <AnimatePresence>
                {selectedServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 pb-6 border-b border-dark-700/50"
                  >
                    <p className="text-sm text-dark-400 mb-3">Ausgewählte Leistungen:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map(id => {
                        const service = SERVICES.find(s => s.id === id)
                        return service ? (
                          <span
                            key={id}
                            className={`px-3 py-1.5 text-sm bg-gradient-to-r ${service.color} bg-opacity-10 text-white rounded-lg border border-white/10`}
                          >
                            {service.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form fields */}
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
                      placeholder="+49 123 456789"
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
                    placeholder="Kurze Beschreibung Ihres Projekts (optional wenn LV hochgeladen)..."
                  />
                </div>
              </div>

              {/* File Upload Area - Leistungsverzeichnis */}
              <div className="mb-6">
                <label className="block text-sm text-dark-400 mb-2">
                  Leistungsverzeichnis hochladen (optional)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'border-fiber-400 bg-fiber-400/10'
                      : 'border-dark-600 hover:border-dark-500 bg-dark-900/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED_EXTENSIONS.join(',')}
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    className="hidden"
                  />

                  <Upload size={32} className={`mx-auto mb-3 ${isDragging ? 'text-fiber-400' : 'text-dark-500'}`} />
                  <p className="text-white font-medium mb-1">
                    {isDragging ? 'Dateien hier ablegen' : 'Dateien hierher ziehen'}
                  </p>
                  <p className="text-sm text-dark-500 mb-3">
                    oder klicken zum Auswählen
                  </p>
                  <p className="text-xs text-dark-600">
                    PDF, Excel, Word, GAEB (X83, D83) • Max. 10MB
                  </p>
                </div>

                {/* Virus scan notice */}
                <div className="flex items-center gap-2 mt-3 text-xs text-dark-500">
                  <Shield size={14} className="text-emerald-500" />
                  <span>Automatischer Virenscan nach Upload</span>
                </div>

                {/* Uploaded files list */}
                <AnimatePresence>
                  {uploadedFiles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2"
                    >
                      {uploadedFiles.map(item => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            item.status === 'error'
                              ? 'bg-red-500/10 border border-red-500/30'
                              : 'bg-dark-800/50 border border-dark-700/50'
                          }`}
                        >
                          {getFileIcon(item.file.name)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{item.file.name}</p>
                            {item.error ? (
                              <p className="text-xs text-red-400 flex items-center gap-1">
                                <AlertCircle size={12} />
                                {item.error}
                              </p>
                            ) : (
                              <p className="text-xs text-dark-500">
                                {(item.file.size / 1024).toFixed(0)} KB
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(item.id)}
                            className="p-1.5 rounded-lg hover:bg-dark-700 transition-colors"
                          >
                            <X size={14} className="text-dark-400" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
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
                    Anfrage senden
                    {validFiles.length > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-dark-950/20 rounded-full text-xs">
                        {validFiles.length} {validFiles.length === 1 ? 'Datei' : 'Dateien'}
                      </span>
                    )}
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
