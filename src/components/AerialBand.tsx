import Image from 'next/image'

// A full-width photograph between the story of the estate and the Terroir chapters.
export default function AerialBand({ dictionary }: { dictionary: any }) {
  return (
    <section aria-label={dictionary.alts.aerial} className="relative aspect-[4/3] w-full md:aspect-[21/9] md:max-h-[82svh]">
      <Image src="/images/adega-aerea.jpg" alt={dictionary.alts.aerial} fill quality={88} sizes="100vw" className="object-cover" style={{ objectPosition: 'center 55%' }} />
    </section>
  )
}
