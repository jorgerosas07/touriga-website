import Hero from '@/components/Hero'
import Quinta from '@/components/Quinta'
import AerialBand from '@/components/AerialBand'
import PhotoChapters from '@/components/PhotoChapters'
import Pillars from '@/components/Pillars'
import { getDictionary, alternates } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return { alternates: alternates(lang, '') }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <>
      <Hero dictionary={dictionary} />
      <Quinta dictionary={dictionary} />
      <AerialBand />
      <PhotoChapters dictionary={dictionary} />
      <Pillars dictionary={dictionary} />
    </>
  )
}
