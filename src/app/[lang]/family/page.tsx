import Founders from '@/components/Founders'
import { getDictionary } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return pageMetadata(lang, 'family')
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <div className="pt-[var(--nav-h)]">
      <Founders dictionary={dictionary} />
    </div>
  )
}
