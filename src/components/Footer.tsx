'use client'

// ---------------------------------------------------------------------------
// Footer — Link Audit (D4)
// All five previously-dead href="#" links have been resolved:
//   - "Where to find our wines?" → mailto contact (inferrable real destination)
//   - Photo Library, Press Articles, Tech Sheets, List of Prizes →
//     visibly disabled with "Em breve / Coming soon" tooltip.
//     A clickable-looking link that goes nowhere is a defect; a clearly
//     labelled "coming soon" state is not.
// ---------------------------------------------------------------------------

type ComingSoonLinkProps = {
  children: React.ReactNode
  label: string  // accessible tooltip
}

function ComingSoonLink({ children, label }: ComingSoonLinkProps) {
  return (
    <span
      aria-label={label}
      title={label}
      className="
        font-body text-sm font-light
        text-[#4A4C4B] cursor-not-allowed select-none
        flex items-center gap-2
      "
    >
      {children}
      <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-copper)] opacity-60 font-body">
        — em breve
      </span>
    </span>
  )
}

export default function Footer({ dictionary }: { dictionary: any }) {
  return (
    <footer className="w-full bg-[#1a1a1a] text-gray-300 py-16 px-8 relative z-10 border-t border-[var(--color-schist-grey)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Contact Info — hard address, real mailto link */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">
            {dictionary.footer.contact}
          </h4>
          <p className="font-body text-sm font-light leading-relaxed">
            Quinta da Touriga Chã<br />
            Vila Nova de Foz Côa<br />
            Douro Superior, Portugal
          </p>
          {/* Real destination: mailto resolves correctly */}
          <a
            href="mailto:info@jrosas.pt"
            className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors duration-300"
          >
            info@jrosas.pt
          </a>
        </div>

        {/* Vinhos — "Where to find our wines?" → mailto for distribution enquiry */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">Vinhos</h4>
          {/*
            Real destination: a distribution-enquiry mailto is the only
            inferrable real contact for this without a separate page.
            This replaces the silent href="#".
          */}
          <a
            href="mailto:info@jrosas.pt?subject=Distribui%C3%A7%C3%A3o%20%2F%20Where%20to%20find"
            className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors duration-300"
          >
            {dictionary.footer.where_to_find}
          </a>
        </div>

        {/* Media / Press — no real files exist yet, clearly disabled */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">Media</h4>
          <ComingSoonLink label="Photo Library — coming soon">
            {dictionary.footer.photolibrary}
          </ComingSoonLink>
          <ComingSoonLink label="Press Articles — coming soon">
            {dictionary.footer.press}
          </ComingSoonLink>
        </div>

        {/* Technical Data & Prizes — no real files exist yet, clearly disabled */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">Data</h4>
          <ComingSoonLink label="Tech Sheets — coming soon">
            {dictionary.footer.tech_sheets}
          </ComingSoonLink>
          <ComingSoonLink label="List of Prizes — coming soon">
            {dictionary.footer.prizes}
          </ComingSoonLink>
        </div>

      </div>

      {/* Legal bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs font-body text-gray-500">
        <p>© {new Date().getFullYear()} Quinta da Touriga Chã. All rights reserved.</p>
        <p className="mt-4 md:mt-0 text-[var(--color-copper)]">
          {dictionary.footer.download_note}
        </p>
      </div>
    </footer>
  )
}
