import Hero from '@/components/Hero'
import Quinta from '@/components/Quinta'
import AerialBand from '@/components/AerialBand'
import PhotoChapters from '@/components/PhotoChapters'
import Pillars from '@/components/Pillars'
import { getDictionary } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return pageMetadata(lang, 'home')
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <>
      <Hero dictionary={dictionary} />
      <Quinta dictionary={dictionary} />
      <AerialBand dictionary={dictionary} />
      <PhotoChapters dictionary={dictionary} />
      <Pillars dictionary={dictionary} />
    </>
  )
}
