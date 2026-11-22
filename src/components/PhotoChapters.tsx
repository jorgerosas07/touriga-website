'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// photo-chapters moment (tasteskill): the section holds while each photograph is uncovered from its
// foot over the one before. At rest (reduced motion, a screen under 600px tall) the chapters stand side by side.
const PICS = [
  { src: '/images/vineyard-terrace.jpg', alt: 'soil', pos: 'center 92%' },
  { src: '/images/clima-por-do-sol.jpg', alt: 'sunset', pos: '62% center' },
  { src: '/images/adega-floor.jpg', alt: 'floor', pos: 'center' },
]
const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function PhotoChapters({ dictionary }: { dictionary: any }) {
  const t = dictionary.terroir
  const items = [t.soil, t.climate, t.expression].map((it: any, i: number) => ({ ...it, ...PICS[i], alt: dictionary.alts[PICS[i].alt] }))
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

  // #terroir-1 .. #terroir-3 (footer links) land on that chapter of the held scroll
  useEffect(() => {
    const go = () => {
      const m = location.hash.match(/^#terroir-(\d)$/)
      const el = ref.current
      if (!m || !el) return
      const i = Math.min(n, Math.max(1, +m[1])) - 1
      const p = !live ? 0 : i === 0 ? 0.02 : Math.min(0.98, (i + 0.1) / n)
      scrollTo({ top: el.getBoundingClientRect().top + scrollY + p * (el.offsetHeight - (live ? innerHeight : 0)) })
    }
    go()
    addEventListener('hashchange', go)
    return () => removeEventListener('hashchange', go)
  }, [live, n])

  const head = (
    <div>
      <p className="label mb-2 md:mb-4">{t.title}</p>
      <h2 className="h2 chapters-h2">{t.subtitle}</h2>
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
                <p className="muted mt-2 whitespace-pre-line">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section id="terroir" ref={ref} className="relative scroll-mt-[calc(var(--nav-h)*-1)] bg-[var(--surface)]" style={{ height: `${(hold + 1) * 100}svh` }}>
      {/* held section: on a phone the photograph sits above its text; from 768px the text column is left and one tall photograph right */}
      <div className="wrap sticky top-0 grid h-[100svh] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 pt-[calc(var(--nav-h)+12px)] pb-4 md:grid-cols-12 md:grid-rows-[auto_minmax(0,1fr)] md:gap-x-12 md:gap-y-6 md:pt-[calc(var(--nav-h)+40px)] md:pb-10">
        <div className="md:col-span-5 md:row-start-1">{head}</div>

        <div className="relative min-h-0 overflow-hidden md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1">
          {items.map((it: any, i: number) => (
            <div key={i} ref={(el) => { picRefs.current[i] = el }} className="absolute inset-0 overflow-hidden" style={{ clipPath: i === 0 ? 'none' : 'inset(100% 0 0 0)' }}>
              <Image src={it.src} alt={it.alt} fill quality={90} sizes="(max-width: 767px) 260vw, 60vw" className="origin-bottom object-cover" style={{ objectPosition: it.pos }} />
            </div>
          ))}
        </div>

        <div className="md:col-span-5 md:row-start-2 md:self-start">
          <div className="mb-3 flex items-center gap-2 md:mb-6" aria-hidden>
            {items.map((_: any, i: number) => (
              <span key={i} className="h-[2px] flex-1 transition-colors duration-500 md:max-w-16" style={{ background: i <= on ? 'var(--accent)' : 'var(--line)' }} />
            ))}
            <span className="muted ml-2 text-sm tabular-nums">{String(on + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          </div>
          <ol className="grid">
            {items.map((it: any, i: number) => (
              <li key={i} className="[grid-area:1/1] transition-all duration-500" style={{ opacity: i === on ? 1 : 0, transform: i === on ? 'none' : 'translateY(10px)' }}>
                <h3 className="chapter-h3 text-2xl leading-tight md:text-4xl">{it.title}</h3>
                <p className="chapter-text mt-2 text-[14px] leading-snug text-[var(--muted)] md:mt-4 md:text-[17px] md:leading-relaxed whitespace-pre-line">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
