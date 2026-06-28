'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation({ lang }: { lang: string }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isTop, setIsTop] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Framer Motion hook to detect scroll direction for hide-on-scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest === 0) {
      setIsTop(true)
      setHidden(false)
    } else if (latest > 50 && latest > (previous ?? 0)) {
      setIsTop(false)
      setHidden(true) // Scrolling down
    } else {
      setIsTop(false)
      setHidden(false) // Scrolling up
    }
  })

  // Soft routing for the Language Switcher (protects WebGL state)
  const switchLanguage = (newLang: string) => {
    if (lang === newLang) return
    // Simple path replacement from /en/foo to /pt/foo
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPath, { scroll: false })
  }

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isTop ? 'bg-transparent py-8' : 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand / Logo Area */}
        <div className="text-[var(--color-gold)] font-heading text-xl md:text-2xl uppercase tracking-widest cursor-pointer">
          Quinta da Touriga Chã
        </div>

        {/* The Inline Typographic Language Switcher */}
        <div className="flex gap-2 text-sm font-body tracking-[0.2em]">
          <button 
            onClick={() => switchLanguage('en')}
            className={`transition-colors duration-300 ${lang === 'en' ? 'text-[var(--color-gold)]' : 'text-gray-400 hover:text-white'}`}
          >
            EN
          </button>
          <span className="text-gray-500">—</span>
          <button 
            onClick={() => switchLanguage('pt')}
            className={`transition-colors duration-300 ${lang === 'pt' ? 'text-[var(--color-gold)]' : 'text-gray-400 hover:text-white'}`}
          >
            PT
          </button>
        </div>

      </div>
    </motion.header>
  )
}
