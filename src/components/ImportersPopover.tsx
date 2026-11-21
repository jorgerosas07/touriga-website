'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { Importer } from '@/lib/importers'

// A place name that opens its importers' contacts on hover, on tap or with the keyboard.
export default function ImportersPopover({ label, importers, title, example }: {
  label: string; importers: Importer[]; title: string; example: string
}) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLSpanElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const out = (e: Event) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', out)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('pointerdown', out); document.removeEventListener('keydown', key) }
  }, [open])

  return (
    <span ref={box} className="inline-block md:relative" onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(true) }} onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false) }}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}
        className="link !font-normal !text-[var(--ink)] min-h-[44px] py-2 text-left md:min-h-0 md:py-0">
        {label}
      </button>
      {open && (
        <div id={id} role="region" aria-label={`${title}: ${label}`}
          className="absolute left-0 top-full z-20 w-full border border-[var(--line)] bg-[var(--bg)] p-5 md:w-[22rem]">
          <p className="mb-4 flex items-center justify-between gap-3 text-sm">
            <span className="label !text-[12px]">{title}</span>
            <span className="muted text-[12px] uppercase tracking-wider">{example}</span>
          </p>
          <ul className="grid gap-5">
            {importers.map((i) => (
              <li key={i.email} className="leading-snug">
                <p className="font-medium">{i.name}</p>
                <p className="muted text-[15px]">{i.city}</p>
                <p className="mt-1 text-[15px]"><a className="link !font-normal" href={`mailto:${i.email}`}>{i.email}</a></p>
                <p className="text-[15px]"><a className="link !font-normal" href={`tel:${i.phone.replace(/\s/g, '')}`}>{i.phone}</a></p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  )
}
