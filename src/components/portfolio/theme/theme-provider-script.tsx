import { defaultPortfolioTheme, portfolioThemeStorageKey } from '@/lib/portfolio/theme'

const bootstrapThemeScript = `
  (function() {
    try {
      var storedTheme = window.localStorage.getItem('${portfolioThemeStorageKey}');
      var nextTheme = storedTheme || '${defaultPortfolioTheme}';
      document.documentElement.dataset.theme = nextTheme;
    } catch (error) {
      document.documentElement.dataset.theme = '${defaultPortfolioTheme}';
    }
  })();
`

export function ThemeProviderScript() {
  return <script dangerouslySetInnerHTML={{ __html: bootstrapThemeScript }} />
}
