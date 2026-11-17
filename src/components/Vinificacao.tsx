import Chapter from './Chapter'

export default function Vinificacao({ dictionary }: { dictionary: any }) {
  const d = dictionary.vinificacao
  return (
    <Chapter id="winemaking" eyebrow={d.eyebrow} title={d.title} lead={d.subtitle} text={d.text}
      src="/images/winery-interior.jpg" alt="Stainless steel fermentation tanks in the winery" surface />
  )
}
