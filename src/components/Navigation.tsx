'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation({ lang, dictionary }: { lang: string; dictionary: any }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const n = dictionary.nav

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const switchLanguage = (to: string) => {
    if (lang !== to) router.push(pathname.replace(`/${lang}`, `/${to}`), { scroll: false })
  }

  const links = [
    { href: '#family', label: n.family },
    { href: '#vineyard', label: n.vineyard },
    { href: '#wines', label: n.wines },
    { href: '#visit', label: n.visit },
  ]
  const light = solid || open
  const tone = light ? 'text-[var(--ink)]' : 'text-[#fbf7f0]'

  return (
    <header className={`fixed top-0 left-0 z-40 w-full transition-colors duration-300 ${light ? 'border-b border-[var(--line)] bg-[var(--bg)]' : 'bg-transparent'} ${tone}`}>
      <div className="wrap flex h-[var(--nav-h)] items-center justify-between">
        <a href="#top" className="font-[family-name:var(--font-display)] text-xl md:text-2xl">Quinta da Touriga Chã</a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link !font-normal !text-current">{l.label}</a>
          ))}
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            {['en', 'pt'].map((c) => (
              <button key={c} onClick={() => switchLanguage(c)} aria-pressed={lang === c} lang={c}
                className={`min-h-[44px] px-2 text-sm uppercase ${lang === c ? 'underline underline-offset-4' : 'opacity-70 hover:opacity-100'}`}>{c}</button>
            ))}
          </div>
          <a href="#allocation" className="btn !min-h-[44px]">{n.enquire}</a>
        </nav>

        <button className="min-h-[44px] min-w-[44px] lg:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? n.close : n.menu}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="wrap flex h-[calc(100svh-var(--nav-h))] flex-col bg-[var(--bg)] pt-6 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-3xl">{l.label}</a>
          ))}
          <div className="mt-6 flex gap-4">
            {['en', 'pt'].map((c) => (
              <button key={c} onClick={() => switchLanguage(c)} aria-pressed={lang === c}
                className={`min-h-[44px] px-2 uppercase ${lang === c ? 'underline underline-offset-4' : 'opacity-70'}`}>{c}</button>
            ))}
          </div>
          <a href="#allocation" onClick={() => setOpen(false)} className="btn mt-6">{n.primary}</a>
        </div>
      )}
    </header>
  )
}
