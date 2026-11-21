import Image from 'next/image'
import ZoomPhoto from './ZoomPhoto'

export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const w = dictionary.wines
  const a = dictionary.allocation
  const wines = [w.tinto, w.puro]
  return (
    <section id="wines" className="flex min-h-[100svh] items-center pt-[calc(var(--nav-h)+32px)] pb-12">
      {/* tall-small: the tall photograph on the left line, the text and a square detail on the right */}
      <div className="wrap grid gap-10 md:grid-cols-12 md:items-start md:gap-6">
        <a href="#allocation" aria-label={a.cta} className="lift block md:col-span-6">
          <div className="photo aspect-[4/5] w-[70%] md:aspect-auto md:h-[calc((100svh-var(--nav-h)-112px)*0.7)] md:max-h-[574px]">
            <Image src="/images/capsula.jpg" alt="The gold JR seal on the burgundy capsule of a bottle" fill quality={90} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: 'center 30%' }} />
          </div>
        </a>
        <div className="flex flex-col md:col-span-5 md:col-start-8">
          <h2 className="h2">{w.title}</h2>
          <div className="mt-8 grid gap-7">
            {wines.map((x: any, i: number) => (
              <div key={x.name} className="border-t border-[var(--line)] pt-5">
                <h3 className="text-2xl md:text-3xl">{x.name}</h3>
                <p className="mt-2">{x.concept}</p>
                <p className="muted mt-1">{x.tasting}</p>
                {i === 0 && (
                  <ZoomPhoto src="/images/quinta-rotulos.jpg" alt="Three bottles of Quinta da Touriga-Chã lying on their sides, labels facing up" width={2000} height={1333}
                    labels={{ open: dictionary.nav.open, close: dictionary.nav.close }} className="mt-5 w-full max-w-[420px]" />
                )}
              </div>
            ))}
          </div>
          <a href="#allocation" className="link mt-7">{a.cta} <span className="arrow" aria-hidden>→</span></a>
          <ZoomPhoto src="/images/puro-caixa.jpg" alt="Puro, Quinta da Touriga: the bottle and its six-bottle case" width={2400} height={2117}
            labels={{ open: dictionary.nav.open, close: dictionary.nav.close }} className="mt-8 w-56" />
        </div>
      </div>
    </section>
  )
}
