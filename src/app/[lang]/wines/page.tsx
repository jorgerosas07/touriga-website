import WineShowcase from '@/components/WineShowcase'
import { getDictionary, alternates } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return { alternates: alternates(lang, '/wines') }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <div className="pt-[var(--nav-h)]">
      <WineShowcase dictionary={dictionary} />
    </div>
  )
}
