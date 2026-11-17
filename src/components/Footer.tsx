export default function Footer({ dictionary }: { dictionary: any }) {
  const n = dictionary.nav
  const head = 'mb-4 text-xl'
  const link = 'relative text-[#f3e6cf] hover:text-white'
  return (
    <footer className="bg-[var(--brand)] text-[#fbf7f0]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-[family-name:var(--font-display)] text-3xl">Quinta da Touriga Chã</p>
          <p className="mt-3 max-w-sm text-[#f3e6cf]">Vila Nova de Foz Côa, Douro Superior</p>
        </div>
        <div className="md:col-span-3">
          <h2 className={head}>{dictionary.footer.contact}</h2>
          <ul className="grid gap-3">
            <li><a className={link} href="mailto:info@jrosas.pt">info@jrosas.pt</a></li>
            <li><a className={link} href="mailto:info@jrosas.pt?subject=Where%20to%20find%20your%20wines">{dictionary.footer.where_to_find}</a></li>
          </ul>
        </div>
        <div className="md:col-span-3 md:col-start-10">
          <h2 className={head}>{n.pillars}</h2>
          <ul className="grid gap-3">
            <li><a className={link} href="#family">{n.family}</a></li>
            <li><a className={link} href="#vineyard">{n.vineyard}</a></li>
            <li><a className={link} href="#wines">{n.wines}</a></li>
            <li><a className={link} href="#visit">{n.visit}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap border-t border-white/20 py-6 text-sm text-[#f3e6cf]">
        © {new Date().getFullYear()} Quinta da Touriga Chã · J. Rosas. Please enjoy responsibly.
      </div>
    </footer>
  )
}
