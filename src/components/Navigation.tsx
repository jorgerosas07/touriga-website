'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { LOCALES } from '@/lib/i18n'
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

  // the opening and the story of the estate are the home page; the other four items are pages of their own
  const base = `/${lang}`
  const home = pathname === base
  const links = [
    { href: `${base}#quinta`, key: '', label: n.terroir },
    { href: `${base}/family`, key: 'family', label: dictionary.familia.title },
    { href: `${base}/wines`, key: 'wines', label: dictionary.wines.title },
    { href: `${base}/where`, key: 'where', label: n.where },
    { href: `${base}/contact`, key: 'contact', label: dictionary.contact.eyebrow },
  ]
  const here = pathname.slice(base.length + 1).split('/')[0]
  // only the opening has a photograph under the bar; every other page has the solid bar
  const light = !home || solid || open
  const tone = light ? 'text-[var(--ink)]' : 'text-[#fbf7f0] [text-shadow:0_1px_10px_rgba(20,14,9,.65)]'

  return (
    <header className={`nav fixed top-0 left-0 z-40 w-full transition-colors duration-300 ${light ? 'border-b border-[var(--line)] bg-[var(--bg)]' : 'bg-transparent'} ${tone}`}>
      <div className={`wrap flex items-center justify-between transition-[height] duration-300 ${light ? 'h-[var(--nav-h)]' : 'h-[100px] md:h-[148px]'}`}>
        <a href={base} aria-label="Quinta da Touriga-Chã, J. Rosas" className="flex shrink-0 items-center">
          <Image src={light ? '/images/logo-bordeaux.png' : '/images/logo-cream.png'} alt="J. Rosas, Fine Wines · Grands Vins" width={1000} height={846} priority
            className={`w-auto transition-[height,transform] duration-300 ${light ? '' : '[filter:drop-shadow(0_1px_8px_rgba(20,14,9,.6))]'} ${light ? 'h-[72px]' : 'h-[76px] translate-y-[19px] md:h-[116px]'}`} />
        </a>

        <nav aria-label="Primary" className="ml-12 hidden flex-1 items-center whitespace-nowrap xl:flex">
          <div className="flex items-center gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href} aria-current={l.key === here ? 'page' : undefined} className="link !font-normal !text-current">{l.label}</a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1" role="group" aria-label="Language">
            {LOCALES.map((c) => (
              <button key={c} onClick={() => switchLanguage(c)} aria-pressed={lang === c} lang={c}
                className={`min-h-[44px] px-2 text-sm uppercase ${lang === c ? 'underline underline-offset-4' : 'opacity-70 hover:opacity-100'}`}>{c}</button>
            ))}
          </div>
        </nav>

        <button className="min-h-[44px] min-w-[44px] xl:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? n.close : n.menu}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="wrap flex h-[calc(100svh-var(--nav-h))] flex-col bg-[var(--bg)] pt-6 xl:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={l.key === here ? 'page' : undefined} className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-3xl">{l.label}</a>
          ))}
          <div className="mt-6 flex gap-4">
            {LOCALES.map((c) => (
              <button key={c} onClick={() => switchLanguage(c)} aria-pressed={lang === c}
                className={`min-h-[44px] px-2 uppercase ${lang === c ? 'underline underline-offset-4' : 'opacity-70'}`}>{c}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
