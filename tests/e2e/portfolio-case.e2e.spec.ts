import { expect, test } from '@playwright/test'

const caseLocales = [
  {
    path: '/en/projects/portfolio-cms',
    title: 'Portfolio CMS',
    sections: [
      'Overview',
      'Goals',
      'Stack',
      'What it demonstrates',
      'Current scope and next steps',
      'Architecture decisions',
      'SDD / Spec Kit workflow',
    ],
  },
  {
    path: '/uk/projects/portfolio-cms',
    title: 'Portfolio CMS',
    sections: ['Огляд', 'Цілі', 'Стек', 'Що це демонструє', 'Поточний scope і наступні кроки', 'Архітектурні рішення', 'SDD / Spec Kit workflow'],
  },
] as const

test.describe('portfolio cms case page', () => {
  for (const localeConfig of caseLocales) {
    test(`renders all required sections for ${localeConfig.path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${localeConfig.path}`)

      await expect(page.getByRole('heading', { level: 1 })).toHaveText(localeConfig.title)

      for (const sectionHeading of localeConfig.sections) {
        await expect(page.getByRole('heading', { name: sectionHeading })).toBeVisible()
      }
    })
  }

  test('keeps only portfolio cms navigable in selected projects', async ({ page }) => {
    await page.goto('http://localhost:3000/en')

    await expect(page.locator('[data-testid="selected-project-card-link"]')).toHaveCount(1)
    await expect(page.locator('a[href="/en/projects/lms"]')).toHaveCount(0)
    await expect(page.locator('a[href="/en/projects/landing-version-system"]')).toHaveCount(0)
  })
})
