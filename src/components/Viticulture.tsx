'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Viticulture({ dictionary }: { dictionary: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
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
      className="relative w-screen h-screen flex items-center overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/viticulture-vines.jpg"
          alt="Quinta da Touriga Chã — vineyard cultivation, Douro Superior"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e10]/90 via-[#0e0e10]/50 to-[#0e0e10]/30" />
      </div>

      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24"
      >
        <div className="max-w-xl">
          <p className="font-body text-xs tracking-[0.3em] text-[var(--color-copper)] uppercase mb-6">
            {dictionary.viticulture.eyebrow}
          </p>
          <h2 className="font-heading text-4xl md:text-6xl xl:text-7xl leading-none text-[#F9F8F6] mb-10">
            {dictionary.viticulture.title}
          </h2>
          <div className="w-16 h-px bg-[var(--color-copper)] mb-8" />
          <p className="font-body text-lg md:text-xl leading-relaxed text-[#d0d0d0] mb-6">
            {dictionary.viticulture.subtitle}
          </p>
          <p className="font-body text-base leading-relaxed text-[#9a9a9a]">
            {dictionary.viticulture.text}
          </p>
        </div>
      </div>
    </section>
  )
}
