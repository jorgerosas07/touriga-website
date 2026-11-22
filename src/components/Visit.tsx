import PhotoStrip from './PhotoStrip'

const STRIP = [
  { src: '/images/adega-side.jpg', alt: 'The winery terrace among wild shrubs' },
  { src: '/images/estate-dusk.jpg', alt: 'The estate at dusk' },
  { src: '/images/estate-sun.jpg', alt: 'The estate in the sun' },
]

export default function Visit({ dictionary }: { dictionary: any }) {
  return (
    <section id="visit" className="bg-[var(--surface)] py-16 md:py-20">
      <div className="wrap">
        <PhotoStrip photos={STRIP} labels={{ open: dictionary.nav.open, close: dictionary.nav.close, prev: dictionary.nav.prev, next: dictionary.nav.next }} />
      </div>
    </section>
  )
}
