'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// photo-chapters moment (tasteskill): the section holds while each photograph is uncovered from its
// foot over the one before. At rest (reduced motion, a screen under 600px tall) the chapters stand side by side.
const PICS = [
  { src: '/images/vineyard-terrace.jpg', alt: 'Vine rows over dark schist shards in the soil', pos: 'center 92%' },
  { src: '/images/winery-summer.jpg', alt: 'A dry stone wall of schist in summer light', pos: 'center' },
  { src: '/images/adega-floor.jpg', alt: 'Raw schist and concrete inside the winery', pos: 'center' },
]
const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function PhotoChapters({ dictionary }: { dictionary: any }) {
  const t = dictionary.terroir
  const items = [t.soil, t.climate, t.expression].map((it: any, i: number) => ({ ...it, ...PICS[i] }))
  const n = items.length
  const hold = n <= 3 ? 2 : 3
  const ref = useRef<HTMLElement>(null)
  const picRefs = useRef<(HTMLDivElement | null)[]>([])
  const [live, setLive] = useState(false)
  const [on, setOn] = useState(0)

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setLive(!mq.matches && innerHeight >= 600)
    sync()
    addEventListener('resize', sync)
    mq.addEventListener('change', sync)
    return () => { removeEventListener('resize', sync); mq.removeEventListener('change', sync) }
  }, [])

  useEffect(() => {
    if (!live) return
    let raf = 0
    const draw = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = clamp(-r.top / (r.height - innerHeight))
      const seg = 1 / n
      let k = 0
      picRefs.current.forEach((pic, i) => {
        if (!pic) return
        const u = i === 0 ? 1 : clamp((p - (i - 0.25) * seg) / (0.45 * seg))
        const e = easeOut(u)
        pic.style.clipPath = `inset(${((1 - e) * 100).toFixed(2)}% 0 0 0)`
        const img = pic.querySelector('img')
        if (img) img.style.transform = `scale(${(1.06 - 0.06 * e).toFixed(4)})`
        if (u >= 0.5) k = i
      })
      setOn(k)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw) }
    draw()
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [live, n])

  const head = (
    <div className="max-w-2xl">
      <p className="label mb-4">{t.title}</p>
      <h2 className="h2">{t.subtitle}</h2>
    </div>
  )

  if (!live) {
    return (
      <section id="terroir" ref={ref} className="min-h-[100svh] bg-[var(--surface)] py-24">
        <div className="wrap">
          {head}
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {items.map((it: any, i: number) => (
              <li key={i}>
                <div className="photo mb-5 aspect-[4/5]"><Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" style={{ objectPosition: it.pos }} /></div>
                <h3 className="text-2xl leading-tight">{it.title}</h3>
                <p className="muted mt-2">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section id="terroir" ref={ref} className="relative bg-[var(--surface)]" style={{ height: `${(hold + 1) * 100}svh` }}>
      <div className="wrap sticky top-0 grid h-[100svh] grid-rows-[auto_minmax(0,1fr)] gap-6 pt-[calc(var(--nav-h)+24px)] pb-6">
        {head}
        <div className="relative min-h-0 overflow-hidden">
          {items.map((it: any, i: number) => (
            <div key={i} ref={(el) => { picRefs.current[i] = el }} className="absolute inset-0 overflow-hidden" style={{ clipPath: i === 0 ? 'none' : 'inset(100% 0 0 0)' }}>
              <Image src={it.src} alt={it.alt} fill quality={90} sizes="(max-width: 767px) 260vw, 100vw" className="origin-bottom object-cover" style={{ objectPosition: it.pos }} />
            </div>
          ))}
          <div className="absolute bottom-4 left-4 right-4 grid bg-[var(--bg)] p-6 sm:right-auto sm:w-[540px] md:bottom-6 md:left-6 md:p-8">
            <p aria-hidden className="muted mb-3 text-sm tabular-nums">{String(on + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
            <ol className="grid">
              {items.map((it: any, i: number) => (
                <li key={i} className="[grid-area:1/1] transition-all duration-500" style={{ opacity: i === on ? 1 : 0, transform: i === on ? 'none' : 'translateY(8px)' }}>
                  <h3 className="text-2xl leading-tight md:text-[28px]">{it.title}</h3>
                  <p className="muted mt-2 text-[15px] md:text-base">{it.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
