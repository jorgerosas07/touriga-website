import Image from 'next/image'

export default function Footer({ dictionary }: { dictionary: any }) {
  const ft = dictionary.footer
  const head = 'mb-4 font-[family-name:var(--font-display)] text-xl'
  const link = 'text-[#f3e6cf] hover:text-white underline-offset-4 hover:underline'
  // one card per section of the page, in scroll order: a photograph and the section's own title
  const sections = [
    { href: '#terroir', label: dictionary.nav.terroir, src: '/images/vineyard-terrace.jpg', pos: 'center 80%' },
    { href: '#viticulture', label: dictionary.viticulture.title, src: '/images/vineyard-soil.jpg', pos: '58% center' },
    { href: '#winemaking', label: dictionary.vinificacao.title, src: '/images/winery-interior.jpg', pos: 'center' },
    { href: '#winery', label: dictionary.adega.title, src: '/images/adega.jpg', pos: 'center 40%' },
    { href: '#family', label: dictionary.familia.title, src: '/images/familia-estate.jpg', pos: 'center 40%' },
    { href: '#wines', label: dictionary.wines.title, src: '/images/capsula.jpg', pos: 'center 30%' },
    { href: '#where', label: dictionary.where.title, src: '/images/estate-sun.jpg', pos: 'center' },
    { href: '#contact', label: dictionary.contact.eyebrow, src: '/images/adega-side.jpg', pos: 'center' },
  ]
  return (
    <footer className="closing bg-[var(--brand)] text-[#fbf7f0]">
      <nav aria-label={dictionary.nav.sitemap} className="wrap pt-16">
        <p className={head}>{dictionary.nav.sitemap}</p>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {sections.map((s) => (
            <li key={s.href} className="flex">
              <a href={s.href} className="lift block w-full border border-white/20 p-3">
                <span className="photo block aspect-[4/3]">
                  <Image src={s.src} alt="" fill quality={80} sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" style={{ objectPosition: s.pos }} />
                </span>
                <span className="mt-3 block font-[family-name:var(--font-display)] text-lg leading-tight md:text-xl">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap mt-14 grid gap-12 border-t border-white/20 py-14 md:grid-cols-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start md:col-span-12">
          <Image src="/images/logo-cream.png" alt="J. Rosas, Fine Wines · Grands Vins" width={1000} height={846} className="h-[154px] w-auto shrink-0 self-start sm:h-[173px]" />
          <div>
            <p className={head}>{ft.contact}</p>
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
