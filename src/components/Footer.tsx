export default function Footer({ dictionary }: { dictionary: any }) {
  const n = dictionary.nav
  const col = 'font-heading text-xl text-[var(--color-gold)] mb-4'
  const link = 'link-draw text-sm text-[var(--ink-soft)]'
  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[#0b0b0d]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-3 md:px-12 xl:px-16">
        <div>
          <h4 className={col}>{dictionary.footer.contact}</h4>
          <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
            Quinta da Touriga Chã<br />Vila Nova de Foz Côa<br />Douro Superior, Portugal
          </p>
          <a href="mailto:info@jrosas.pt" className={`${link} mt-4`}>info@jrosas.pt</a>
        </div>
        <div>
          <h4 className={col}>{n.wines}</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="#wines" className={link}>{dictionary.wines.title}</a></li>
            <li><a href="mailto:info@jrosas.pt?subject=Where%20to%20find%20our%20wines" className={link}>{dictionary.footer.where_to_find}</a></li>
            <li><a href="#allocation" className={link}>{n.primary}</a></li>
          </ul>
        </div>
        <div>
          <h4 className={col}>{n.pillars}</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="#terroir" className={link}>{n.terroir}</a></li>
            <li><a href="#family" className={link}>{n.family}</a></li>
            <li><a href="#visit" className={link}>{n.visit}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] border-t border-[var(--line)] px-6 py-6 text-xs text-[var(--ink-mute)] md:px-12 xl:px-16">
        © {new Date().getFullYear()} Quinta da Touriga Chã. Please enjoy responsibly.
      </div>
    </footer>
  )
}
