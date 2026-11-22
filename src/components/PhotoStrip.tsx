'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Photo = { src: string; alt: string }

// The estate photographs in the visit section: each opens full screen, with arrows, keys and swipe
export default function PhotoStrip({ photos, labels }: { photos: Photo[]; labels: { open: string; close: string; prev: string; next: string } }) {
  const [open, setOpen] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const touchX = useRef<number | null>(null)
  const n = photos.length

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n])
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (open === null) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    addEventListener('keydown', onKey)
    return () => { removeEventListener('keydown', onKey); root.style.overflow = prev }
  }, [open, close, go])

  // Give focus back to the photograph that opened the viewer
  useEffect(() => { if (open === null) lastTrigger.current?.focus({ preventScroll: true }) }, [open])

  const ctl = 'flex h-12 w-12 items-center justify-center text-2xl text-[#fbf7f0] transition-colors hover:bg-white/15 active:scale-95'

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              aria-label={`${labels.open}: ${p.alt}`}
              onClick={(e) => { lastTrigger.current = e.currentTarget; setOpen(i) }}
              className="lift block w-full cursor-zoom-in"
            >
              <span className="photo block aspect-[4/3]">
                <Image src={p.src} alt={p.alt} fill quality={90} sizes="(min-width: 768px) 30vw, 60vw" className="object-cover" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          className="fixed inset-0 z-50 flex flex-col bg-[#1b1612]/95"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          <div className="flex items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] text-[#f3e6cf] md:px-8">
            <p className="text-sm tabular-nums" aria-hidden>{open + 1} / {n}</p>
            <button ref={closeRef} type="button" onClick={close} className={ctl} aria-label={labels.close}>×</button>
          </div>
          <div className="relative mx-4 my-4 flex-1 md:mx-24" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
            <Image key={photos[open].src} src={photos[open].src} alt={photos[open].alt} fill quality={90} sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-center gap-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <button type="button" onClick={() => go(-1)} className={ctl} aria-label={labels.prev}>←</button>
            <button type="button" onClick={() => go(1)} className={ctl} aria-label={labels.next}>→</button>
          </div>
        </div>
      )}
    </>
  )
}
