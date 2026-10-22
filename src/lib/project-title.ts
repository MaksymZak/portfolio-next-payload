/**
 * Project titles are a single shared field. Cyrillic names in the uppercase
 * mono card read as Latin lookalikes, so the English page uses a Latin title.
 */
const englishTitles: Record<string, string> = {
  vartovi: 'Vartovi',
}

export function projectDisplayTitle(slug: string, title: string, locale: string) {
  if (locale === 'en') return englishTitles[slug] ?? title
  return title
}
