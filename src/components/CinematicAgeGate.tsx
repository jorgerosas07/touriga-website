'use client'

import { useState, useEffect } from 'react'
import { setCookie, getCookie } from 'cookies-next' // We will install this
import { motion, AnimatePresence } from 'framer-motion'

export default function CinematicAgeGate({ dictionary }: { dictionary: any }) {
  const [showGate, setShowGate] = useState(false)
  const [isDissolving, setIsDissolving] = useState(false)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    // CRITICAL UX BYPASS: Check cookie on mount. If present, do not render the gate.
    const isVerified = getCookie('age_verified')
    if (!isVerified) {
      setShowGate(true)
    }
  }, [])

  const handleVerification = () => {
    // Set cookie to prevent future cinematic preamble (Elena's UX rule)
    setCookie('age_verified', 'true', { maxAge: 60 * 60 * 24 * 365 }) // 1 year
    
    // Trigger the cinematic dissolve transition
    setIsDissolving(true)
    setTimeout(() => {
      setShowGate(false)
    }, 3000) // 3 second cinematic dissolve before unmounting
  }

  if (!showGate) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isDissolving ? 0 : 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-deep-violet)] text-[var(--color-gold)]"
      >
        <p className="text-4xl md:text-6xl font-heading mb-8 text-center px-6">
          {dictionary.ageGate.title}
        </p>
        <p className="text-lg md:text-xl font-body mb-12 text-center px-6">
          {dictionary.ageGate.prompt}
        </p>
        
        <div className="flex gap-8">
          <button 
            onClick={handleVerification}
            className="px-8 py-3 border border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-deep-violet)] transition-colors duration-500 font-body uppercase tracking-widest"
          >
            {dictionary.ageGate.yes}
          </button>
          <button 
            onClick={() => setDenied(true)}
            className="px-8 py-3 border border-transparent hover:border-[var(--color-gold)] transition-colors duration-500 font-body uppercase tracking-widest opacity-70"
          >
            {dictionary.ageGate.no}
          </button>
        </div>
        {denied && <p role="alert" className="mt-8 font-body text-sm text-[var(--ink-soft)]">{dictionary.ageGate.error}</p>}
      </motion.div>
    </AnimatePresence>
  )
}
