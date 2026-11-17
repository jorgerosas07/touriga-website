'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation({ lang, dictionary }: { lang: string; dictionary: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const n = dictionary.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLanguage = (newLang: string) => {
    if (lang === newLang) return
    router.push(pathname.replace(`/${lang}`, `/${newLang}`), { scroll: false })
  }

  const links = [
    { href: '#terroir', label: n.terroir },
    { href: '#wines', label: n.wines },
    { href: '#family', label: n.family },
    { href: '#visit', label: n.visit },
  ]

  return (
    <header className={`fixed top-0 left-0 z-40 w-full transition-colors duration-300 ${scrolled || open ? 'border-b border-[var(--line)] bg-[#0e0e10]/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-12 xl:px-16">
        <a href="#top" className="font-heading text-lg tracking-[0.14em] text-[var(--color-gold)] uppercase md:text-xl">
          Quinta da Touriga Chã
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-draw text-sm tracking-[0.12em] text-[var(--ink)] uppercase">{l.label}</a>
          ))}
          <div className="flex items-center gap-2 text-sm tracking-[0.16em]" role="group" aria-label="Language">
            {['en', 'pt'].map((c, i) => (
              <span key={c} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-[var(--ink-mute)]">/</span>}
                <button onClick={() => switchLanguage(c)} aria-pressed={lang === c} lang={c}
                  className={`min-h-[44px] px-1 uppercase transition-colors ${lang === c ? 'text-[var(--color-gold)]' : 'text-[var(--ink-mute)] hover:text-[var(--ink)]'}`}>{c}</button>
              </span>
            ))}
          </div>
          <a href="#allocation" className="btn !min-h-[40px] !px-5">{n.enquire}</a>
        </nav>

        <button className="min-h-[44px] min-w-[44px] text-sm tracking-[0.16em] text-[var(--ink)] uppercase md:hidden"
          aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? n.close : n.menu}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="flex h-[calc(100svh-4rem)] flex-col gap-2 bg-[#0e0e10] px-6 pt-8 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="border-b border-[var(--line)] py-4 font-heading text-3xl text-[var(--ink)]">{l.label}</a>
          ))}
          <div className="mt-6 flex gap-6">
            {['en', 'pt'].map((c) => (
              <button key={c} onClick={() => switchLanguage(c)} aria-pressed={lang === c}
                className={`min-h-[44px] text-sm tracking-[0.16em] uppercase ${lang === c ? 'text-[var(--color-gold)]' : 'text-[var(--ink-mute)]'}`}>{c}</button>
            ))}
          </div>
          <a href="#allocation" onClick={() => setOpen(false)} className="btn btn-solid mt-4">{n.primary}</a>
        </div>
      )}
    </header>
  )
}
