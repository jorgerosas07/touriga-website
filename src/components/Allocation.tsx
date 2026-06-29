'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FloatingInput({
  id,
  name,
  type = 'text',
  label,
  required = false,
}: {
  id: string
  name: string
  type?: string
  label: string
  required?: boolean
}) {
  const [filled, setFilled] = useState(false)
  const [focused, setFocused] = useState(false)
  const isFloating = filled || focused

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setFilled(e.target.value.trim().length > 0)
        }}
        onChange={(e) => setFilled(e.target.value.trim().length > 0)}
        className={`
          peer w-full bg-transparent border-b pt-5 pb-2 px-0
          text-[#F9F8F6] font-body text-base
          outline-none placeholder-transparent
          transition-colors duration-300
          ${isFloating ? 'border-[var(--color-gold)]' : 'border-[#4A4C4B]'}
        `}
        placeholder={label}
        style={{ borderBottomWidth: 1 }}
      />
      <label
        htmlFor={id}
        className="absolute left-0 pointer-events-none font-body text-sm select-none"
        style={{
          top: isFloating ? '0px' : '20px',
          fontSize: isFloating ? '11px' : '16px',
          color: isFloating ? 'var(--color-gold)' : '#6b6b6b',
          transition: 'top 240ms cubic-bezier(0.25, 0.46, 0.45, 0.94), font-size 240ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 240ms ease',
          letterSpacing: isFloating ? '0.12em' : '0.02em',
          textTransform: isFloating ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({
  id,
  name,
  label,
  required = false,
}: {
  id: string
  name: string
  label: string
  required?: boolean
}) {
  const [filled, setFilled] = useState(false)
  const [focused, setFocused] = useState(false)
  const isFloating = filled || focused

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setFilled(e.target.value.trim().length > 0)
        }}
        onChange={(e) => setFilled(e.target.value.trim().length > 0)}
        className={`
          peer w-full bg-transparent border-b pt-6 pb-2 px-0
          text-[#F9F8F6] font-body text-base resize-none
          outline-none placeholder-transparent
          transition-colors duration-300
          ${isFloating ? 'border-[var(--color-gold)]' : 'border-[#4A4C4B]'}
        `}
        placeholder={label}
        style={{ borderBottomWidth: 1 }}
      />
      <label
        htmlFor={id}
        className="absolute left-0 pointer-events-none font-body text-sm select-none"
        style={{
          top: isFloating ? '0px' : '22px',
          fontSize: isFloating ? '11px' : '16px',
          color: isFloating ? 'var(--color-gold)' : '#6b6b6b',
          transition: 'top 240ms cubic-bezier(0.25, 0.46, 0.45, 0.94), font-size 240ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 240ms ease',
          letterSpacing: isFloating ? '0.12em' : '0.02em',
          textTransform: isFloating ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

export default function Allocation({ dictionary }: { dictionary: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeWine, setActiveWine] = useState<string | null>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
          }
        )
      }
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitState('sending')
    await new Promise<void>((res) => setTimeout(res, 1200))
    setSubmitState('sent')
  }

  const wines = [
    {
      key: 'puro',
      name: dictionary.allocation.puro.name,
      vintage: dictionary.allocation.puro.vintage,
      description: dictionary.allocation.puro.description,
      price: dictionary.allocation.puro.price,
      color: '#D4AF37',
    },
    {
      key: 'tinto',
      name: dictionary.allocation.tinto.name,
      vintage: dictionary.allocation.tinto.vintage,
      description: dictionary.allocation.tinto.description,
      price: dictionary.allocation.tinto.price,
      color: '#5B1D30',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#0e0e10' }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vineyard-terrace.jpg"
          alt="Quinta da Touriga Chã vineyard"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10] via-[#0e0e10]/85 to-[#0e0e10]" />
      </div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24 pt-20 md:pt-32 pb-20 md:pb-40">
        <div ref={headingRef} className="mb-16 md:mb-24">
          <p className="font-body text-xs tracking-[0.3em] text-[var(--color-copper)] uppercase mb-4">
            {dictionary.allocation.title}
          </p>
          <h2 className="font-heading text-4xl md:text-6xl xl:text-7xl leading-none text-[#F9F8F6] max-w-2xl">
            {dictionary.allocation.subtitle}
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {wines.map((wine) => (
            <div
              key={wine.key}
              className="group relative flex flex-col p-10 md:p-14 border border-white/[0.06] bg-[#121212]/40 backdrop-blur-sm hover:border-[var(--color-copper)]/25 transition-all duration-700"
            >
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse 30% 25% at 85% 15%, ${wine.color}12 0%, transparent 60%)`,
                }}
              />

              <div className="flex-1 flex flex-col gap-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-4xl md:text-5xl text-[#F9F8F6] leading-none">
                      {wine.name}
                    </h3>
                    <span className="font-body text-xs tracking-[0.25em] text-[var(--color-copper)] uppercase mt-3 block">
                      {wine.vintage}
                    </span>
                  </div>
                  <span
                    className="font-heading text-xs tracking-[0.15em] text-[var(--color-gold)] opacity-60 mt-2"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {wine.price}
                  </span>
                </div>

                <div className="w-12 h-px bg-[var(--color-copper)]/40" />

                <p className="font-body text-base leading-relaxed text-[#9a9a9a] max-w-md">
                  {wine.description}
                </p>

                <button
                  onClick={() => setActiveWine(wine.key)}
                  className="
                    mt-6 self-start relative overflow-hidden
                    px-0 py-3
                    font-body text-xs tracking-[0.25em] uppercase
                    transition-all duration-500
                    border-b
                  "
                  style={{
                    borderColor: `${wine.color}40`,
                    color: wine.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = wine.color
                    e.currentTarget.style.paddingLeft = '8px'
                    e.currentTarget.style.paddingRight = '8px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${wine.color}40`
                    e.currentTarget.style.paddingLeft = '0px'
                    e.currentTarget.style.paddingRight = '0px'
                  }}
                >
                  {dictionary.allocation.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #0e0e10 0%, transparent 100%)' }}
      />

      <AnimatePresence>
        {activeWine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setActiveWine(null) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/10 p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setActiveWine(null); setSubmitState('idle') }}
                className="absolute top-6 right-6 text-[#6b6b6b] hover:text-[#F9F8F6] transition-colors duration-300"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="1" y1="1" x2="17" y2="17" />
                  <line x1="17" y1="1" x2="1" y2="17" />
                </svg>
              </button>

              {submitState === 'sent' ? (
                <div className="py-12 text-center">
                  <p className="font-heading text-2xl text-[var(--color-gold)] mb-4">
                    {dictionary.allocation.form.success_title}
                  </p>
                  <p className="font-body text-[#6b6b6b]">
                    {dictionary.allocation.form.success_body}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-2xl text-[#F9F8F6] mb-2">
                    {dictionary.allocation.form.title}
                  </h3>
                  <p className="font-body text-sm text-[#6b6b6b] mb-8">
                    {dictionary.allocation.form.subtitle}
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                    <FloatingInput
                      id="alloc-name"
                      name="name"
                      label={dictionary.allocation.form.name}
                      required
                    />
                    <FloatingInput
                      id="alloc-email"
                      name="email"
                      type="email"
                      label={dictionary.allocation.form.email}
                      required
                    />
                    <FloatingTextarea
                      id="alloc-message"
                      name="message"
                      label={dictionary.allocation.form.message}
                      required
                    />

                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="
                        mt-2 self-start relative overflow-hidden
                        px-10 py-4 border border-[var(--color-gold)]
                        font-body text-sm tracking-[0.2em] uppercase
                        text-[var(--color-gold)]
                        transition-all duration-500
                        hover:text-[#0e0e10] hover:bg-[var(--color-gold)]
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      {submitState === 'sending'
                        ? dictionary.allocation.form.sending
                        : dictionary.allocation.form.submit}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
