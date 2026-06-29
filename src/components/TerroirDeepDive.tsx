'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getDynamicTextColor } from '@/lib/contrast-engine'

gsap.registerPlugin(ScrollTrigger)

export default function TerroirDeepDive({ dictionary }: { dictionary: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

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

      imageRefs.current.forEach((img, i) => {
        if (!img) return
        gsap.fromTo(img,
          { y: 0 },
          {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: panelRefs.current[i],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            }
          }
        )
      })

      panelRefs.current.forEach((panel) => {
        if (!panel) return
        const content = panel.querySelector('.terroir-content')
        if (!content) return

        gsap.fromTo(content,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 70%',
              end: 'top 30%',
              scrub: false,
            }
          }
        )

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const color = getDynamicTextColor(self.progress)
            if (sectionRef.current) {
              sectionRef.current.style.setProperty('--terroir-text', color)
            }
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#0e0e10', '--terroir-text': '#F9F8F6' } as React.CSSProperties}
    >
      <div className="relative z-30 w-full max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24 pt-20 md:pt-32 pb-12 md:pb-16">
        <p className="font-body text-xs tracking-[0.3em] text-[var(--color-copper)] uppercase mb-4">
          {dictionary.terroir.title}
        </p>
        <h2 className="font-heading text-4xl md:text-6xl xl:text-7xl leading-none text-[#F9F8F6] max-w-2xl">
          {dictionary.terroir.subtitle}
        </h2>
      </div>

      {/* Panel 1 — The Soil */}
      <div
        ref={el => { panelRefs.current[0] = el }}
        className="relative w-full min-h-screen flex items-center overflow-hidden"
      >
        <div
          ref={el => { imageRefs.current[0] = el }}
          className="absolute top-0 left-0 w-full h-[120%]"
        >
          <Image
            src="/images/vineyard-soil.jpg"
            alt="Douro Superior vineyard — schist soil"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e10]/95 via-[#0e0e10]/60 to-[#0e0e10]/30" />
        </div>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24 py-16">
          <div className="terroir-content max-w-xl">
            <h3
              className="font-heading text-4xl md:text-6xl mb-8"
              style={{ color: 'var(--terroir-text)' }}
            >
              {dictionary.terroir.soil.title}
            </h3>
            <div className="w-16 h-px bg-[var(--color-copper)] mb-8" />
            <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--terroir-text)', opacity: 0.85 }}>
              {dictionary.terroir.soil.text}
            </p>
          </div>
        </div>
      </div>

      {/* Panel 2 — The Climate */}
      <div
        ref={el => { panelRefs.current[1] = el }}
        className="relative w-full min-h-screen flex items-center overflow-hidden"
      >
        <div
          ref={el => { imageRefs.current[1] = el }}
          className="absolute top-0 left-0 w-full h-[120%]"
        >
          <Image
            src="/images/winery-summer.jpg"
            alt="Quinta da Touriga Chã — summer light, Douro Superior"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0e0e10]/95 via-[#0e0e10]/60 to-[#0e0e10]/30" />
        </div>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24 py-16 md:flex md:justify-end">
          <div className="terroir-content max-w-xl md:text-right">
            <h3
              className="font-heading text-4xl md:text-6xl mb-8"
              style={{ color: 'var(--terroir-text)' }}
            >
              {dictionary.terroir.climate.title}
            </h3>
            <div className="w-16 h-px bg-[var(--color-gold)] mb-8 md:ml-auto" />
            <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--terroir-text)', opacity: 0.85 }}>
              {dictionary.terroir.climate.text}
            </p>
          </div>
        </div>
      </div>

      {/* Panel 3 — The Expression */}
      <div
        ref={el => { panelRefs.current[2] = el }}
        className="relative w-full min-h-screen flex items-center overflow-hidden"
      >
        <div
          ref={el => { imageRefs.current[2] = el }}
          className="absolute top-0 left-0 w-full h-[120%]"
        >
          <Image
            src="/images/adega-floor.jpg"
            alt="Quinta da Touriga Chã winery — raw schist and concrete"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/90 via-[#0e0e10]/65 to-[#0e0e10]/95" />
        </div>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24 py-16 flex flex-col items-center text-center">
          <div className="terroir-content max-w-2xl">
            <h3
              className="font-heading text-4xl md:text-6xl mb-8"
              style={{ color: 'var(--terroir-text)' }}
            >
              {dictionary.terroir.expression.title}
            </h3>
            <div className="w-16 h-px bg-[var(--color-burgundy)] mb-8 mx-auto" />
            <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--terroir-text)', opacity: 0.85 }}>
              {dictionary.terroir.expression.text}
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-30"
        style={{ background: 'linear-gradient(to top, #0e0e10 0%, transparent 100%)' }}
      />
    </section>
  )
}
