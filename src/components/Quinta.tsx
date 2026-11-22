import Image from 'next/image'

// The story of the estate, right after the opening: the title on the left, the text in two columns on the right,
// and the estate photograph under it.
export default function Quinta({ dictionary }: { dictionary: any }) {
  const q = dictionary.quinta
  return (
    <section id="quinta" className="py-16 md:py-20">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-12">
          <h2 className="h2 md:col-span-4">{q.title}</h2>
          <div className="md:col-span-8 md:columns-2 md:gap-x-10">
            {q.paragraphs.map((p: string, i: number) => (
              <p key={i} className={`mb-5 break-inside-avoid text-[16px] leading-[1.65] ${i === 0 ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{p}</p>
            ))}
          </div>
        </div>
        <div className="photo mt-10 aspect-[4/3] md:mt-14 md:aspect-[21/9]">
          <Image src="/images/familia-estate.jpg" alt="The estate's vineyard and olive trees above the valley" fill quality={90} sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover" style={{ objectPosition: 'center 42%' }} />
        </div>
      </div>
    </section>
  )
}
