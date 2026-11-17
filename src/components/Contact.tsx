'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'


// ---------------------------------------------------------------------------
// Branded static SVG map of the Douro Superior / Vila Nova de Foz Côa region.
// No external API, no paid dependency. Drawn against brand palette.
// ---------------------------------------------------------------------------
function DouroMap() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Douro Superior region map showing Vila Nova de Foz Côa"
        className="w-full h-full"
        style={{ maxHeight: 400 }}
      >
        {/* Background — schist dark */}
        <rect width="500" height="320" fill="#0e0e10" />

        {/* Terrain contour shapes — abstract Douro valley silhouette */}
        <path
          d="M0,220 Q80,180 150,200 Q220,215 280,190 Q340,165 400,185 Q450,200 500,175 L500,320 L0,320 Z"
          fill="#1a1a1d"
        />
        <path
          d="M0,250 Q60,230 130,245 Q200,258 270,235 Q330,215 390,230 Q445,240 500,220 L500,320 L0,320 Z"
          fill="#202025"
        />

        {/* Douro river — sinuous gold/copper line */}
        <path
          d="M10,165 Q60,155 110,170 Q160,185 220,162 Q270,142 320,158 Q370,172 420,148 Q460,130 495,140"
          fill="none"
          stroke="#B8860B"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Tributary — Côa river */}
        <path
          d="M310,10 Q305,50 315,90 Q322,130 320,158"
          fill="none"
          stroke="#B8860B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Region outline — Douro Superior border, subtle */}
        <path
          d="M80,40 Q160,20 260,30 Q360,38 430,80 Q470,120 450,180 Q420,230 350,240 Q260,255 190,235 Q120,218 90,175 Q60,130 80,40 Z"
          fill="none"
          stroke="#4A4C4B"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.5"
        />

        {/* Vineyard plot markers — schist texture dots */}
        {[
          [295, 148], [285, 162], [305, 165], [275, 155], [310, 145],
          [290, 170], [300, 175], [320, 160], [280, 145],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#4A4C4B" opacity="0.6" />
        ))}

        {/* Quinta marker — gold dot with pulse ring */}
        <circle cx="310" cy="158" r="10" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.35" />
        <circle cx="310" cy="158" r="5.5" fill="#D4AF37" />

        {/* Vila Nova de Foz Côa label */}
        <text
          x="330"
          y="150"
          fill="#D4AF37"
          fontSize="9"
          fontFamily="'Playfair Display', serif"
          fontStyle="italic"
        >
          Vila Nova de Foz Côa
        </text>

        {/* Quinta label */}
        <text
          x="318"
          y="173"
          fill="#F9F8F6"
          fontSize="7"
          fontFamily="'Outfit', sans-serif"
          opacity="0.8"
        >
          Quinta da Touriga Chã
        </text>

        {/* Douro river label */}
        <text
          x="140"
          y="155"
          fill="#B8860B"
          fontSize="8"
          fontFamily="'Outfit', sans-serif"
          fontStyle="italic"
          opacity="0.7"
        >
          Rio Douro
        </text>

        {/* Region label */}
        <text
          x="200"
          y="90"
          fill="#4A4C4B"
          fontSize="10"
          fontFamily="'Playfair Display', serif"
          letterSpacing="2"
          textAnchor="middle"
          opacity="0.7"
        >
          DOURO SUPERIOR
        </text>

        {/* Compass rose — minimal */}
        <text x="460" y="48" fill="#4A4C4B" fontSize="9" fontFamily="sans-serif" textAnchor="middle" opacity="0.5">N</text>
        <line x1="460" y1="52" x2="460" y2="66" stroke="#4A4C4B" strokeWidth="1" opacity="0.5" />
        <polygon points="460,52 457,62 460,59 463,62" fill="#4A4C4B" opacity="0.5" />

        {/* Decorative frame */}
        <rect x="3" y="3" width="494" height="314" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" rx="2" />
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Floating label input — label floats above on focus or when filled.
// Matches GSAP motion language via CSS transitions tuned to ease-out.
// ---------------------------------------------------------------------------
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
          color: isFloating ? 'var(--color-gold)' : '#a8a39a',
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
          color: isFloating ? 'var(--color-gold)' : '#a8a39a',
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

// ---------------------------------------------------------------------------
// Main Section 5 — Visit Us & Contact
// ---------------------------------------------------------------------------
export default function Contact({ dictionary }: { dictionary: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitState('sending')
    // Stub: replace with real API endpoint (e.g. Resend, Formspree, etc.)
    await new Promise<void>((res) => setTimeout(res, 1200))
    setSubmitState('sent')
  }

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="relative w-full bg-[#0e0e10] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/adega-side.jpg"
          alt="Quinta da Touriga Chã"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/95 via-[#0e0e10]/92 to-[#0e0e10]/95" />
      </div>

      {/* Subtle gradient top-edge bleed from Wine Showcase */}
      <div
        className="absolute top-0 left-0 w-full h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #590D14 0%, transparent 100%)' }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 xl:px-24 py-24 md:py-40">

        {/* Section heading */}
        <div ref={headingRef} className="mb-20 md:mb-28">
          <p className="font-body text-xs tracking-[0.3em] text-[var(--color-copper)] uppercase mb-4">
            {dictionary.contact.eyebrow}
          </p>
          <h2 className="font-heading text-5xl md:text-7xl xl:text-8xl leading-none text-[#F9F8F6]">
            {dictionary.contact.title}
          </h2>
          <p className="mt-6 font-body text-lg text-[#a8a39a] max-w-xl leading-relaxed">
            {dictionary.contact.subtitle}
          </p>
        </div>

        {/* Two-column grid: form left, map right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">

          {/* LEFT — Contact form */}
          <div ref={formRef}>
            {submitState === 'sent' ? (
              <div className="py-16 text-center">
                <p className="font-heading text-3xl text-[var(--color-gold)] mb-4">
                  {dictionary.contact.success_title}
                </p>
                <p className="font-body text-[#F9F8F6] opacity-70">
                  {dictionary.contact.success_body}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
                <FloatingInput
                  id="contact-name"
                  name="name"
                  label={dictionary.contact.name}
                  required
                />
                <FloatingInput
                  id="contact-email"
                  name="email"
                  type="email"
                  label={dictionary.contact.email}
                  required
                />
                <FloatingTextarea
                  id="contact-message"
                  name="message"
                  label={dictionary.contact.message}
                  required
                />

                <button
                  type="submit"
                  disabled={submitState === 'sending'}
                  className="
                    mt-4 self-start relative overflow-hidden
                    px-10 py-4 border border-[var(--color-gold)]
                    font-body text-sm tracking-[0.2em] uppercase
                    text-[var(--color-gold)]
                    transition-all duration-500
                    hover:text-[#0e0e10] hover:bg-[var(--color-gold)]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  style={{ letterSpacing: '0.2em' }}
                >
                  {submitState === 'sending'
                    ? dictionary.contact.sending
                    : dictionary.contact.send}
                </button>
              </form>
            )}

            {/* Estate coordinates */}
            <div className="mt-16 pt-10 border-t border-[#2a2a2d] flex flex-col gap-2">
              <p className="font-heading text-lg text-[var(--color-gold)]">Quinta da Touriga Chã</p>
              <p className="font-body text-sm text-[#a8a39a] leading-relaxed">
                Vila Nova de Foz Côa<br />
                Douro Superior, Portugal
              </p>
              <a
                href="mailto:info@jrosas.pt"
                className="font-body text-sm text-[#F9F8F6] hover:text-[var(--color-gold)] transition-colors duration-300 mt-1"
              >
                info@jrosas.pt
              </a>
            </div>
          </div>

          {/* RIGHT — Branded map */}
          <div
            ref={mapRef}
            className="w-full h-[300px] md:h-[420px] lg:h-full min-h-[320px] rounded-sm overflow-hidden border border-[#2a2a2d]"
            style={{ background: '#0e0e10' }}
          >
            <DouroMap />
          </div>

        </div>
      </div>
    </section>
  )
}
