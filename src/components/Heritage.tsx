'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Heritage({ dictionary }: { dictionary: any }) {
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Elegant fade-in for the text blocks as they scroll into view
    textRefs.current.forEach((text) => {
      if (text) {
        gsap.fromTo(text, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
            }
          }
        )
      }
    })
  }, [])

  return (
    <section className="w-full bg-[var(--background)] text-[var(--foreground)] relative z-10">
      {/* 
        MOBILE STRATEGY (MARCUS'S ARCHITECTURE): 
        Default is a single column (flex-col). 
        At the 'md' breakpoint, it snaps to a CSS grid (grid-cols-2).
      */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:grid md:grid-cols-2 relative">
        
        {/* LEFT COLUMN: The Visual Anchor */}
        {/* 
          On mobile: It's just a large block at the top. 
          On md+: It becomes position: sticky, locking in the viewport.
        */}
        <div className="w-full h-[60vh] md:h-screen md:sticky md:top-0 relative overflow-hidden">
          <Image 
            src="/images/adega.jpg" 
            alt="2004 Architecture Award Winery"
            fill
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Subtle vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
        </div>

        {/* RIGHT COLUMN: The Historical Narrative */}
        {/* This column flows naturally, allowing the text to scroll while the left side is pinned. */}
        <div className="w-full flex flex-col justify-center px-8 py-20 md:px-20 lg:px-32 xl:px-40 gap-32 md:gap-64 bg-[var(--background)]">
          
          {/* Pillar 1: Terroir */}
          <div ref={el => { textRefs.current[0] = el }} className="max-w-xl">
            <h2 className="text-sm font-body uppercase tracking-[0.3em] text-[var(--color-copper)] mb-4">
              Pilar I
            </h2>
            <h3 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
              {dictionary.heritage.terroir_title}
            </h3>
            <p className="text-lg font-body leading-relaxed text-gray-300">
              {dictionary.heritage.terroir_text}
            </p>
          </div>

          {/* Pillar 2: Viticulture */}
          <div ref={el => { textRefs.current[1] = el }} className="max-w-xl">
            <h2 className="text-sm font-body uppercase tracking-[0.3em] text-[var(--color-copper)] mb-4">
              Pilar II
            </h2>
            <h3 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
              {dictionary.heritage.viticulture_title}
            </h3>
            <p className="text-lg font-body leading-relaxed text-gray-300">
              {dictionary.heritage.viticulture_text}
            </p>
          </div>

          {/* Pillar 3: Adega */}
          <div ref={el => { textRefs.current[2] = el }} className="max-w-xl pb-32">
            <h2 className="text-sm font-body uppercase tracking-[0.3em] text-[var(--color-copper)] mb-4">
              Pilar III
            </h2>
            <h3 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
              {dictionary.heritage.adega_title}
            </h3>
            <p className="text-lg font-body leading-relaxed text-gray-300">
              {dictionary.heritage.adega_text}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
