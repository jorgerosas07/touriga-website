import Hero from '@/components/Hero'
import Heritage from '@/components/Heritage'
import WineShowcase from '@/components/WineShowcase'
import Contact from '@/components/Contact'
import enDict from '@/dictionaries/en.json'
import ptDict from '@/dictionaries/pt.json'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  const dictionary = resolvedParams.lang === 'pt' ? ptDict : enDict

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Hero dictionary={dictionary} />
      <Heritage dictionary={dictionary} />
      <WineShowcase dictionary={dictionary} />
      <Contact dictionary={dictionary} />
    </div>
  )
}
