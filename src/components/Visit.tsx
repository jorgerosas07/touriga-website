import PhotoStrip from './PhotoStrip'

const STRIP = [
  { src: '/images/adega-side.jpg', alt: 'terrace' },
  { src: '/images/estate-dusk.jpg', alt: 'dusk' },
  { src: '/images/estate-sun.jpg', alt: 'sun' },
]

export default function Visit({ dictionary }: { dictionary: any }) {
  return (
    <section id="visit" className="bg-[var(--surface)] py-16 md:py-20">
      <div className="wrap">
        <PhotoStrip photos={STRIP.map((p) => ({ ...p, alt: dictionary.alts[p.alt] }))} labels={{ open: dictionary.nav.open, close: dictionary.nav.close, prev: dictionary.nav.prev, next: dictionary.nav.next }} />
      </div>
    </section>
  )
}
