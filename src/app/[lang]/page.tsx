import Hero from '@/components/Hero'
import Family from '@/components/Family'
import Founders from '@/components/Founders'
import PhotoChapters from '@/components/PhotoChapters'
import Pillars from '@/components/Pillars'
import WineShowcase from '@/components/WineShowcase'
import WhereToFind from '@/components/WhereToFind'
import Visit from '@/components/Visit'
import { getDictionary } from '@/lib/i18n'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

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
