import Chapter from './Chapter'

export default function Familia({ dictionary }: { dictionary: any }) {
  const d = dictionary.familia
  return (
    <Chapter id="family" eyebrow={d.eyebrow} title={d.title} lead={d.subtitle} text={d.text}
      src="/images/familia-estate.jpg" alt="The family estate above the Douro valley" surface />
  )
}
