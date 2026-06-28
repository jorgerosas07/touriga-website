'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Hero({ dictionary }: { dictionary: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // 1. Slow Pan "Ken Burns" Effect on Image
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, 
        { scale: 1.05 },
        { scale: 1, duration: 15, ease: "power1.inOut" }
      )
    }

    // 2. Decoupled Text Reveal (Triggers immediately after Age Gate)
    const tl = gsap.timeline({ delay: 0.5 })
    
    if (titleRef.current && subRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      ).fromTo(subRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      )
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image strictly routed through Next.js <Image> as requested */}
      <div className="absolute top-0 left-0 w-screen h-screen z-[-1]">
        <Image 
          ref={imageRef}
          src="/images/hero-bg.jpg" 
          alt="Vinha da Eira e Vale da Vila"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90"></div>
      </div>

      {/* Hero Content positioned dynamically */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Headline from Excel */}
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-heading text-[#F9F8F6] tracking-wider mb-6 drop-shadow-lg uppercase">
          {dictionary.hero.headline}
        </h1>
        
        {/* Sub-points from Excel */}
        <div ref={subRef} className="flex flex-col gap-4 text-lg md:text-xl font-body text-[#F9F8F6]/90 font-light">
          <p>{dictionary.hero.subheadline}</p>
          <p>{dictionary.hero.douro}</p>
          <p>{dictionary.hero.heritage}</p>
        </div>
      </div>
    </section>
  )
}
