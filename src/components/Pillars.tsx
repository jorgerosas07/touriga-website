import Image from 'next/image'

// One pillar per screen: the photograph gets half the width, so it is served sharp (not a narrow third-column crop)
export default function Pillars({ dictionary }: { dictionary: any }) {
  const items = [
    { ...dictionary.viticulture, id: 'viticulture', src: '/images/viticulture-vines.jpg', alt: 'The vineyard and winery from above at sunset', pos: 'center 45%' },
    { ...dictionary.vinificacao, id: 'winemaking', src: '/images/winery-interior.jpg', alt: 'Stainless steel tanks in the fermentation hall', pos: 'center' },
    { ...dictionary.adega, id: 'winery', src: '/images/adega.jpg', alt: 'The winery, schist walls set into the slope', pos: 'center 40%' },
  ]
  return (
    <div id="pillars">
      {items.map((it, i) => (
        <section key={it.id} id={it.id} className={i % 2 === 1 ? 'bg-[var(--surface)]' : ''}>
          <div className="wrap grid min-h-[100svh] items-center gap-10 py-20 md:grid-cols-2 md:gap-16">
            <div className={`photo aspect-[4/5] max-h-[78svh] w-full md:aspect-auto md:h-[74svh] ${i % 2 === 0 ? '' : 'md:order-2'}`}>
              <Image src={it.src} alt={it.alt} fill quality={90} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: it.pos }} />
            </div>
            <div className="max-w-xl">
              <p className="label mb-5">{it.eyebrow}</p>
              <h2 className="h2">{it.title}</h2>
              <p className="lead mt-7">{it.subtitle}</p>
              <p className="muted mt-5">{it.text}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
