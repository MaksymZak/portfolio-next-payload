export const themeIds = ['light', 'dark', 'warm', 'contrast'] as const

export type ThemeId = (typeof themeIds)[number]

export const defaultThemeId: ThemeId = 'light'

/**
 * Theme registry. `messageKey` maps to the `Theme.*` keys in the message
 * catalogs so theme labels stay localized in EN/UK.
 */
export const themes: { id: ThemeId; messageKey: ThemeId }[] = themeIds.map((id) => ({
  id,
  messageKey: id,
}))
