import Image from 'next/image'

export default function Footer({ dictionary }: { dictionary: any }) {
  const ft = dictionary.footer
  const head = 'mb-4 font-[family-name:var(--font-display)] text-xl'
  const link = 'text-[#f3e6cf] hover:text-white underline-offset-4 hover:underline'
  return (
    <footer className="closing bg-[var(--brand)] text-[#fbf7f0]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start md:col-span-6">
          <Image src="/images/logo-cream.png" alt="J. Rosas, Fine Wines · Grands Vins" width={1000} height={846} className="h-32 w-auto shrink-0 self-start sm:h-36" />
          <div>
            <p className={head}>{ft.contact}</p>
            <p className="text-[#f3e6cf]"><span className="brand-name block text-3xl text-[#fbf7f0]">Quinta da Touriga-Chã</span>Vila Nova de Foz Côa<br />Douro Superior, Portugal</p>
            <a className={`${link} mt-3 inline-block`} href="mailto:info@jrosas.pt">info@jrosas.pt</a>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-7">
          <p className={head}>{dictionary.wines.title}</p>
          <a className={link} href="mailto:info@jrosas.pt">{ft.where_to_find}</a>
        </div>
      </div>
      <div className="wrap">
        <p className="border-t border-white/20 py-6 text-sm text-[#f3e6cf]">© {new Date().getFullYear()} Quinta da Touriga-Chã. All rights reserved.</p>
      </div>
    </footer>
  )
}
