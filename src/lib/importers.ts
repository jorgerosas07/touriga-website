// EXAMPLE DATA ONLY: placeholders until the client sends the real importers (names, cities, emails, phones).
export type Importer = { name: string; city: string; email: string; phone: string }

const example = (n: number, city: string, dial: string): Importer => ({
  name: `Example Importer ${n}`, city, email: `importer${n}@example.com`, phone: `${dial} 000 000 ${String(n).padStart(4, '0')}`,
})

// keyed by market: a country code, or a Canadian province (CA-ON, CA-QC)
export const IMPORTERS: Record<string, Importer[]> = {
  'CA-ON': [example(1, 'Toronto', '+1'), example(2, 'Ottawa', '+1')],
  'CA-QC': [example(3, 'Montréal', '+1'), example(4, 'Québec', '+1')],
  BR: [example(5, 'São Paulo', '+55'), example(6, 'Rio de Janeiro', '+55')],
  LU: [example(7, 'Luxembourg', '+352')],
  PT: [example(8, 'Lisboa', '+351'), example(9, 'Porto', '+351')],
  SE: [example(10, 'Stockholm', '+46'), example(11, 'Göteborg', '+46')],
  GB: [example(12, 'London', '+44'), example(13, 'Edinburgh', '+44')],
  MO: [example(14, 'Macau', '+853')],
}
