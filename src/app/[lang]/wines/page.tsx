import WineShowcase from '@/components/WineShowcase'
import JsonLd from '@/components/JsonLd'
import { winesSchema } from '@/lib/schema'
import { getDictionary } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return pageMetadata(lang, 'wines')
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <div className="pt-[var(--nav-h)]">
      <JsonLd data={winesSchema([
        { name: dictionary.wines.tinto.name, description: `${dictionary.wines.tinto.concept} ${dictionary.wines.tinto.tasting}`, image: '/images/quinta-rotulos.jpg' },
        { name: dictionary.wines.puro.name, description: `${dictionary.wines.puro.concept} ${dictionary.wines.puro.tasting}`, image: '/images/puro-caixa.jpg' },
      ])} />
      <WineShowcase dictionary={dictionary} />
    </div>
  )
}
