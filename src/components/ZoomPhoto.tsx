'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// A small photograph that opens full screen on click (Esc, × or a click outside closes it)
export default function ZoomPhoto({ src, alt, width, height, labels, className = '' }: {
  src: string; alt: string; width: number; height: number
  labels: { open: string; close: string }; className?: string
}) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('keydown', onKey)
    return () => { removeEventListener('keydown', onKey); root.style.overflow = prev; trigger.current?.focus({ preventScroll: true }) }
  }, [open])

  return (
    <>
      <button ref={trigger} type="button" aria-label={`${labels.open}: ${alt}`} onClick={() => setOpen(true)} className={`lift block cursor-zoom-in ${className}`}>
        <span className="photo block">
          <Image src={src} alt={alt} width={width} height={height} quality={90} sizes="240px" className="h-auto w-full" />
        </span>
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)]"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className="flex justify-end px-4 pt-[max(12px,env(safe-area-inset-top))] md:px-8">
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={labels.close}
              className="flex h-12 w-12 items-center justify-center text-3xl text-[var(--ink)] transition-colors hover:bg-black/5 active:scale-95">×</button>
          </div>
          <div className="relative mx-4 mb-6 flex-1 md:mx-20" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
            <Image src={src} alt={alt} fill quality={90} sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
