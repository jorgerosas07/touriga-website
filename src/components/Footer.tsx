'use client'

export default function Footer({ dictionary }: { dictionary: any }) {
  return (
    <footer className="w-full bg-[#1a1a1a] text-gray-300 py-16 px-8 relative z-10 border-t border-[var(--color-schist-grey)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">{dictionary.footer.contact}</h4>
          <p className="font-body text-sm font-light leading-relaxed">
            Quinta da Touriga Chã<br/>
            Vila Nova de Foz Côa<br/>
            Douro Superior, Portugal
          </p>
          <p className="font-body text-sm font-light">info@jrosas.pt</p>
        </div>

        {/* Sales / Location */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">Vinhos</h4>
          <a href="#" className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors">
            {dictionary.footer.where_to_find}
          </a>
        </div>

        {/* Media / Press */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">Media</h4>
          <a href="#" className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors">
            {dictionary.footer.photolibrary}
          </a>
          <a href="#" className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            {dictionary.footer.press} <span className="text-[var(--color-copper)] text-xs">*</span>
          </a>
        </div>

        {/* Technical Data & Prizes */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[var(--color-gold)] font-heading text-2xl mb-2">Data</h4>
          {/* CORE PROTOCOL EXECUTION: target="_blank" to protect WebGL state */}
          <a href="#" className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            {dictionary.footer.tech_sheets} <span className="text-[var(--color-copper)] text-xs">*</span>
          </a>
          <a href="#" className="font-body text-sm font-light hover:text-[var(--color-gold)] transition-colors flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            {dictionary.footer.prizes} <span className="text-[var(--color-copper)] text-xs">*</span>
          </a>
        </div>

      </div>

      {/* CEO's Download Note */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs font-body text-gray-500">
        <p>© {new Date().getFullYear()} Quinta da Touriga Chã. All rights reserved.</p>
        <p className="mt-4 md:mt-0 text-[var(--color-copper)]">
          {dictionary.footer.download_note}
        </p>
      </div>
    </footer>
  )
}
