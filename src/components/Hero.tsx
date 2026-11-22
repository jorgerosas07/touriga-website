import Image from 'next/image'

export default function Hero({ dictionary }: { dictionary: any }) {
  const { hero } = dictionary
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#2b241e] text-[#fbf7f0]">
      <Image src="/images/hero-bg.jpg" alt={dictionary.alts.hero} fill priority quality={90} sizes="(max-width: 767px) 330vw, 100vw" className="object-cover object-center brightness-[1.18] saturate-[1.06]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(32,26,21,.5)_0,rgba(32,26,21,.14)_200px,rgba(32,26,21,0)_36%,rgba(32,26,21,.34)_62%,rgba(32,26,21,.7)_100%)]" />
      <div className="wrap relative z-10 pb-14 md:pb-20">
        <div data-enter className="max-w-3xl [text-shadow:0_1px_16px_rgba(20,14,9,.6)]">
          <h1 className="text-[44px] leading-[1.04] md:text-7xl">{hero.headline}</h1>
          <p className="lead mt-6 text-[#f4ece0]">{hero.douro}</p>
        </div>
      </div>
    </section>
  )
}
