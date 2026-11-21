import Image from 'next/image'

export default function Footer({ dictionary }: { dictionary: any }) {
  const ft = dictionary.footer
  const head = 'mb-4 font-[family-name:var(--font-display)] text-xl'
  const link = 'text-[#f3e6cf] hover:text-white underline-offset-4 hover:underline'
  // every section of the page, in scroll order
  const sitemap = [
    { href: '#terroir', label: dictionary.nav.terroir },
    { href: '#viticulture', label: dictionary.viticulture.title },
    { href: '#winemaking', label: dictionary.vinificacao.title },
    { href: '#winery', label: dictionary.adega.title },
    { href: '#family', label: dictionary.familia.title },
    { href: '#wines', label: dictionary.wines.title },
    { href: '#where', label: dictionary.where.title },
    { href: '#contact', label: dictionary.contact.eyebrow },
  ]
  return (
    <footer className="closing bg-[var(--brand)] text-[#fbf7f0]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start md:col-span-5">
          <Image src="/images/logo-cream.png" alt="J. Rosas, Fine Wines · Grands Vins" width={1000} height={846} className="h-[154px] w-auto shrink-0 self-start sm:h-[173px]" />
          <div>
            <p className={head}>{ft.contact}</p>
            <p className="text-[#f3e6cf]"><span className="brand-name block text-xl text-[#fbf7f0]">Jorge Rosas, Vinhos - Unipessoal Lda</span>Apartado 17<br />Quinta da Touriga, Chã<br />5150-909 Vila Nova De Foz Coa<br />Portugal</p>
            <a className={`${link} mt-3 inline-block`} href="mailto:tourigaporto@gmail.com">tourigaporto@gmail.com</a>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className={head}>{dictionary.wines.title}</p>
          <a className={link} href="#where">{ft.where_to_find}</a>
        </div>
        <nav aria-label={dictionary.nav.sitemap} className="md:col-span-4">
          <p className={head}>{dictionary.nav.sitemap}</p>
          <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6 gap-y-2.5">
            {sitemap.map((s) => (
              <li key={s.href}><a className={link} href={s.href}>{s.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap">
        <p className="border-t border-white/20 py-6 text-sm text-[#f3e6cf]">© {new Date().getFullYear()} Quinta da Touriga-Chã. All rights reserved.</p>
      </div>
    </footer>
  )
}
