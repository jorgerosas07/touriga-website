import Image from 'next/image'

// The story of the estate, right after the opening: the title and the estate photograph in the left column,
// the text in two columns beside them. On a phone: title, text, photograph.
export default function Quinta({ dictionary }: { dictionary: any }) {
  const q = dictionary.quinta
  return (
    <section id="quinta" className="py-16 md:py-20">
      <div className="wrap grid gap-8 md:grid-cols-12 md:gap-x-12 md:gap-y-8">
        <h2 className="h2 md:col-span-4 md:row-start-1">{q.title}</h2>
        <div className="md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-1 md:columns-2 md:gap-x-10">
          {q.paragraphs.map((p: string, i: number) => (
            <p key={i} className={`mb-5 break-inside-avoid text-[16px] leading-[1.65] ${i === 0 ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{p}</p>
          ))}
        </div>
        <div className="photo aspect-[4/5] md:col-span-4 md:row-start-2 md:self-start">
          <Image src="/images/familia-estate.jpg" alt="The estate's vineyard and olive trees above the valley" fill quality={90} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" style={{ objectPosition: 'center 40%' }} />
        </div>
      </div>
    </section>
  )
}
