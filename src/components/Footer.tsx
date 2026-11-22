import Image from 'next/image'
import { REGIONS } from '@/lib/markets'
import { intlLocale } from '@/lib/i18n'

type Item = { href: string; label: string }
type Block = { href: string; title: string; items?: Item[] }

// The site map: every section of the page as a heading, with the layers inside it listed below, each one a link.
export default function Footer({ dictionary, lang }: { dictionary: any; lang: string }) {
  const ft = dictionary.footer
  const b = `/${lang}`
  const t = dictionary.terroir
  const f = dictionary.founders
  const head = 'font-[family-name:var(--font-display)] text-xl hover:underline underline-offset-4'
  const link = 'text-[#f3e6cf] hover:text-white underline-offset-4 hover:underline'
  const names = new Intl.DisplayNames([intlLocale(lang)], { type: 'region' })
  const markets = REGIONS.flatMap((r) => r.codes).map((c) => names.of(c) ?? c).sort((a, b) => a.localeCompare(b, intlLocale(lang)))

  const blocks: Block[] = [
    { href: `${b}#quinta`, title: dictionary.nav.terroir, items: [
      { href: `${b}#terroir-1`, label: t.soil.title }, { href: `${b}#terroir-2`, label: t.climate.title }, { href: `${b}#terroir-3`, label: t.expression.title },
      { href: `${b}#viticulture`, label: dictionary.viticulture.title }, { href: `${b}#winemaking`, label: dictionary.vinificacao.title }, { href: `${b}#winery`, label: dictionary.adega.title },
    ] },
    { href: `${b}/family`, title: dictionary.familia.title, items: [
      { href: `${b}/family#jose-antonio`, label: f.jarpr.name }, { href: `${b}/family#jorge-rosas`, label: f.jorge.name }, { href: `${b}/family#sixth-generation`, label: f.sixth.title },
    ] },
    { href: `${b}/wines`, title: dictionary.wines.title, items: [
      { href: `${b}/wines#wine-tinto`, label: dictionary.wines.tinto.name }, { href: `${b}/wines#wine-puro`, label: dictionary.wines.puro.name },
    ] },
    { href: `${b}/where`, title: dictionary.where.title, items: markets.map((m) => ({ href: `${b}/where`, label: m })) },
    { href: `${b}/contact`, title: dictionary.contact.eyebrow, items: [{ href: `${b}/contact`, label: dictionary.contact.send }] },
  ]
  const multi = blocks.filter((b) => b.items)

  return (
    <footer className="closing bg-[var(--brand)] text-[#fbf7f0]">
      <nav aria-label={dictionary.nav.sitemap} className="wrap grid grid-cols-2 gap-x-6 gap-y-10 pt-16 sm:grid-cols-3 lg:grid-cols-5">
        <div>
          <a href={multi[0].href} className={head}>{multi[0].title}</a>
          <ul className="mt-4 grid gap-2">{multi[0].items!.map((i) => <li key={i.href}><a className={link} href={i.href}>{i.label}</a></li>)}</ul>
        </div>
        {multi.slice(1).map((b) => (
          <div key={b.href}>
            <a href={b.href} className={head}>{b.title}</a>
            <ul className="mt-4 grid gap-2">{b.items!.map((i, k) => <li key={`${i.href}-${k}`}><a className={link} href={i.href}>{i.label}</a></li>)}</ul>
          </div>
        ))}
      </nav>

      <div className="wrap mt-14 border-t border-white/20 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <Image src="/images/logo-cream.png" alt="J. Rosas, Fine Wines · Grands Vins" width={1000} height={846} className="h-[154px] w-auto shrink-0 self-start sm:h-[173px]" />
          <div>
            <p className="mb-4 font-[family-name:var(--font-display)] text-xl">{ft.contact}</p>
            <p className="text-[#f3e6cf]"><span className="brand-name block text-xl text-[#fbf7f0]">Jorge Rosas, Vinhos - Unipessoal Lda</span>Apartado 17<br />Quinta da Touriga, Chã<br />5150-909 Vila Nova De Foz Coa<br />Portugal</p>
            <a className={`${link} mt-3 inline-block`} href="mailto:tourigaporto@gmail.com">tourigaporto@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <p className="border-t border-white/20 py-6 text-sm text-[#f3e6cf]">© {new Date().getFullYear()} Quinta da Touriga-Chã. All rights reserved.</p>
      </div>
    </footer>
  )
}
