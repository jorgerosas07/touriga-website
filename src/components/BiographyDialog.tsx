'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Bio = { link: string; title: string; years: string; paragraphs: string[] }

// A link that opens a full biography in a page of its own: portrait on the left, the text on the right.
export default function BiographyDialog({ bio, portrait, portraitAlt, closeLabel }: {
  bio: Bio; portrait: string; portraitAlt: string; closeLabel: string
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
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className="link mt-5 min-h-[44px] items-center md:min-h-0">
        {bio.link} <span className="arrow" aria-hidden>→</span>
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={bio.title} className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg)]">
          <div className="sticky top-0 z-10 flex justify-end bg-[var(--bg)] px-4 pt-[max(12px,env(safe-area-inset-top))] pb-1 md:px-8">
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={closeLabel}
              className="flex h-12 w-12 items-center justify-center text-3xl text-[var(--ink)] transition-colors hover:bg-black/5 active:scale-95">×</button>
          </div>

          <div className="wrap grid gap-10 pb-20 pt-2 md:grid-cols-12 md:gap-12 md:pt-6">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <div className="photo aspect-[4/5] max-w-[320px]">
                  <Image src={portrait} alt={portraitAlt} fill sizes="320px" className="object-cover grayscale" style={{ objectPosition: 'center 25%' }} />
                </div>
                <h2 className="mt-6 text-3xl leading-tight md:text-4xl">{bio.title}</h2>
                <p className="label mt-3">{bio.years}</p>
              </div>
            </div>

            <div className="max-w-2xl md:col-span-8">
              {bio.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-xl leading-relaxed md:text-2xl md:leading-snug' : 'mt-6 text-[17px] leading-relaxed text-[var(--muted)]'}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
