'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Founders({ dictionary }: { dictionary: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        )
      }
      if (leftRef.current) {
        gsap.fromTo(leftRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        )
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        )
      }
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.05 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 md:py-0"
      style={{ background: '#0e0e10' }}
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/estate-dusk.jpg"
          alt="Quinta da Touriga Chã"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/90 via-[#0e0e10]/65 to-[#0e0e10]/95" />
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-16 xl:px-24">
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <p className="font-body text-xs tracking-[0.3em] text-[var(--color-gold)] uppercase mb-4">
            {dictionary.founders.eyebrow}
          </p>
          <h2 className="font-heading text-4xl md:text-6xl xl:text-7xl leading-none text-[#F9F8F6]">
            {dictionary.founders.title}
          </h2>
          <div className="w-16 h-px bg-[var(--color-gold)] mt-8 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div ref={leftRef} className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 overflow-hidden border border-white/[0.08]">
              <Image
                src="/images/founder-jarpr.png"
                alt="José António Castro Ramos Pinto Rosas"
                fill
                className="object-cover object-center grayscale"
                sizes="(max-width: 768px) 192px, 224px"
              />
              <div className="absolute inset-0 bg-[#0e0e10]/15" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl text-[#F9F8F6] mb-1">
              {dictionary.founders.jarpr.name}
            </h3>
            <p className="font-body text-sm text-[var(--color-copper)] tracking-[0.15em] uppercase mb-6">
              {dictionary.founders.jarpr.years}
            </p>
            <div className="w-8 h-px bg-[var(--color-copper)]/40 mb-6" />
            <p className="font-body text-base leading-relaxed text-[#9a9a9a] max-w-md">
              {dictionary.founders.jarpr.text}
            </p>
          </div>

          <div ref={rightRef} className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 overflow-hidden border border-white/[0.08]">
              <Image
                src="/images/founder-jorge.jpg"
                alt="Jorge Rosas"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 192px, 224px"
              />
              <div className="absolute inset-0 bg-[#0e0e10]/15" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl text-[#F9F8F6] mb-1">
              {dictionary.founders.jorge.name}
            </h3>
            <p className="font-body text-sm text-[var(--color-gold)] tracking-[0.15em] uppercase mb-6">
              {dictionary.founders.jorge.years}
            </p>
            <div className="w-8 h-px bg-[var(--color-gold)]/40 mb-6" />
            <p className="font-body text-base leading-relaxed text-[#9a9a9a] max-w-md">
              {dictionary.founders.jorge.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
