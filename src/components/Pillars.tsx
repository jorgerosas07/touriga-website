import Image from 'next/image'

// One pillar per screen: the photograph gets half the width, so it is served sharp (not a narrow third-column crop)
export default function Pillars({ dictionary }: { dictionary: any }) {
  const items = [
    { ...dictionary.viticulture, id: 'viticulture', src: '/images/vineyard-soil.jpg', alt: 'Young vine leaves and tendrils in the sun', pos: '58% center' },
    { ...dictionary.vinificacao, id: 'winemaking', src: '/images/winery-interior.jpg', alt: 'Stainless steel tanks in the fermentation hall', pos: 'center' },
    { ...dictionary.adega, id: 'winery', src: '/images/adega.jpg', alt: 'The winery, schist walls set into the slope', pos: 'center 40%' },
  ]
  return (
    <>
      {items.map((it, i) => (
        <section key={it.id} id={it.id} className={i % 2 === 1 ? 'bg-[var(--surface)]' : ''}>
          <div className="wrap grid min-h-[100svh] items-center gap-10 py-20 md:grid-cols-2 md:gap-16">
            <div className={`photo aspect-[4/5] max-h-[78svh] w-full md:aspect-auto md:h-[74svh] ${i % 2 === 0 ? '' : 'md:order-2'}`}>
              <Image src={it.src} alt={it.alt} fill quality={90} sizes="(min-width: 768px) 75vw, 170vw" className="object-cover" style={{ objectPosition: it.pos }} />
            </div>
            <div className="max-w-xl">
              <h2 className="h2">{it.title}</h2>
              <p className="lead mt-7">{it.subtitle}</p>
              <p className="muted mt-5">{it.text}</p>
              {it.facts && (
                <dl className="mt-8 grid border-t border-[var(--line)] text-[15px]">
                  {it.facts.map((f: { label: string; value: string }) => (
                    <div key={f.label} className="grid gap-x-6 border-b border-[var(--line)] py-3 sm:grid-cols-[11rem_1fr]">
                      <dt className="muted">{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
