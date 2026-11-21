import Hero from '@/components/Hero'
import Family from '@/components/Family'
import Founders from '@/components/Founders'
import PhotoChapters from '@/components/PhotoChapters'
import Pillars from '@/components/Pillars'
import WineShowcase from '@/components/WineShowcase'
import WhereToFind from '@/components/WhereToFind'
import Visit from '@/components/Visit'
import enDict from '@/dictionaries/en.json'
import ptDict from '@/dictionaries/pt.json'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = lang === 'pt' ? ptDict : enDict

  return (
    <>
      <Hero dictionary={dictionary} />
      <PhotoChapters dictionary={dictionary} />
      <Pillars dictionary={dictionary} />
      <Family dictionary={dictionary} />
      <Founders dictionary={dictionary} />
      <WineShowcase dictionary={dictionary} />
      <WhereToFind dictionary={dictionary} lang={lang} />
      <Visit dictionary={dictionary} />
    </>
  )
}
